import { NextRequest, NextResponse } from "next/server";

type LinkPreview = {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
};

const FETCH_TIMEOUT_MS = 8000;
const MAX_BODY_BYTES = 500_000;

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

function isDisallowedHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");

  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host === "0.0.0.0") return true;

  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [a, b] = ipv4Match.slice(1, 3).map(Number);
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    return false;
  }

  if (host === "::1") return true;
  if (host.startsWith("fc") || host.startsWith("fd")) return true;
  if (host.startsWith("fe80")) return true;

  return false;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function parseMetaTags(html: string): Map<string, string> {
  const map = new Map<string, string>();
  const metaTagRegex = /<meta\b[^>]*>/gi;
  const attrRegex = /([\w:-]+)\s*=\s*"([^"]*)"|([\w:-]+)\s*=\s*'([^']*)'/g;

  const tags = html.match(metaTagRegex) ?? [];
  for (const tag of tags) {
    const attrs: Record<string, string> = {};
    let attrMatch: RegExpExecArray | null;
    attrRegex.lastIndex = 0;
    while ((attrMatch = attrRegex.exec(tag))) {
      const name = (attrMatch[1] ?? attrMatch[3])?.toLowerCase();
      const value = attrMatch[2] ?? attrMatch[4] ?? "";
      if (name) attrs[name] = value;
    }

    const key = (attrs.property ?? attrs.name)?.toLowerCase();
    if (key && attrs.content !== undefined && !map.has(key)) {
      map.set(key, decodeHtmlEntities(attrs.content));
    }
  }

  return map;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : null;
}

async function readBodyWithLimit(
  response: Response,
  maxBytes: number
): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return await response.text();

  const decoder = new TextDecoder();
  let received = 0;
  let result = "";

  while (received < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    result += decoder.decode(value, { stream: true });
  }

  reader.cancel().catch(() => {});
  return result;
}

function formatDisplayUrl(url: URL): string {
  const path = url.pathname === "/" ? "" : url.pathname;
  return `${url.hostname}${path}`;
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json(
      { error: "url 쿼리 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(normalizeUrl(rawUrl));
  } catch {
    return NextResponse.json(
      { error: "올바른 URL이 아닙니다." },
      { status: 400 }
    );
  }

  if (
    !["http:", "https:"].includes(parsedUrl.protocol) ||
    isDisallowedHostname(parsedUrl.hostname)
  ) {
    return NextResponse.json(
      { error: "허용되지 않는 URL입니다." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(parsedUrl.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://onebite.link)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      throw new Error(`요청 실패 (status: ${response.status})`);
    }

    const html = await readBodyWithLimit(response, MAX_BODY_BYTES);
    const meta = parseMetaTags(html);

    const title =
      meta.get("og:title") ??
      meta.get("twitter:title") ??
      extractTitleTag(html) ??
      parsedUrl.hostname;

    const description =
      meta.get("og:description") ??
      meta.get("twitter:description") ??
      meta.get("description") ??
      "";

    const rawThumbnail =
      meta.get("og:image") ?? meta.get("twitter:image") ?? null;
    const finalUrl = response.url || parsedUrl.toString();
    const thumbnail = rawThumbnail
      ? new URL(rawThumbnail, finalUrl).toString()
      : null;

    const preview: LinkPreview = {
      url: formatDisplayUrl(parsedUrl),
      title,
      description,
      thumbnail,
    };

    return NextResponse.json(preview);
  } catch (error) {
    const isAbort = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        error: isAbort
          ? "링크를 불러오는 데 시간이 너무 오래 걸렸습니다."
          : "오픈 그래프 정보를 가져오지 못했습니다.",
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
