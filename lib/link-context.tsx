"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { LinkItem } from "@/lib/types";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  folderId: string;
};

type UpdateLinkInput = {
  folderId: string;
  title: string;
  description: string;
};

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    thumbnail: row.thumbnail_url ?? undefined,
    folderId: row.folder_id != null ? String(row.folder_id) : "",
  };
}

type LinkContextValue = {
  links: LinkItem[];
  isAddingLink: boolean;
  addLink: (input: NewLinkInput) => Promise<LinkItem | null>;
  removeLink: (id: string) => Promise<void>;
  updateLink: (id: string, input: UpdateLinkInput) => Promise<void>;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data) return;
        setLinks(data.map(toLinkItem));
      });
  }, []);

  const addLink = useCallback(async (input: NewLinkInput) => {
    if (isAddingRef.current) return null;

    isAddingRef.current = true;
    setIsAddingLink(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .insert({
          url: input.url,
          title: input.title,
          description: input.description,
          thumbnail_url: input.thumbnail ?? null,
          folder_id: input.folderId ? Number(input.folderId) : null,
        })
        .select("id, url, title, description, thumbnail_url, folder_id")
        .single();

      if (error || !data) return null;

      const newLink = toLinkItem(data);
      setLinks((prev) => [newLink, ...prev]);
      return newLink;
    } finally {
      isAddingRef.current = false;
      setIsAddingLink(false);
    }
  }, []);

  const removeLink = useCallback(async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("links").delete().eq("id", id);

    if (error) return;

    setLinks((prev) => prev.filter((link) => link.id !== id));
  }, []);

  const updateLink = useCallback(async (id: string, input: UpdateLinkInput) => {
    const title = input.title.trim();
    if (!title || !input.folderId) return;

    const description = input.description.trim();
    const supabase = createClient();
    const { error } = await supabase
      .from("links")
      .update({
        folder_id: Number(input.folderId),
        title,
        description,
      })
      .eq("id", id);

    if (error) return;

    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? { ...link, folderId: input.folderId, title, description }
          : link
      )
    );
  }, []);

  return (
    <LinkContext.Provider
      value={{ links, isAddingLink, addLink, removeLink, updateLink }}
    >
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}
