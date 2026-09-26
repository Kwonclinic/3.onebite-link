import type { Folder, LinkItem } from "@/lib/types";

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "reading", name: "읽을거리" },
  { id: "etc", name: "기타" },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "nextjs.org/docs",
    description: "Next.js 공식 문서, App Router와 최신 기능을 확인할 수 있어요.",
    folderId: "dev",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "tailwindcss.com",
    description: "유틸리티 클래스로 빠르게 스타일링할 수 있는 CSS 프레임워크.",
    folderId: "dev",
  },
  {
    id: "3",
    title: "MDN Web Docs",
    url: "developer.mozilla.org",
    description: "웹 표준과 브라우저 API에 대한 신뢰할 수 있는 레퍼런스.",
    folderId: "dev",
  },
  {
    id: "4",
    title: "TypeScript Handbook",
    url: "typescriptlang.org/docs",
    description: "타입스크립트 문법과 활용법을 정리한 공식 핸드북.",
    folderId: "dev",
  },
  {
    id: "5",
    title: "Notion Design",
    url: "notion.so",
    description: "심플하고 따뜻한 느낌의 프로덕트 디자인 레퍼런스.",
    folderId: "design",
  },
  {
    id: "6",
    title: "Dribbble",
    url: "dribbble.com",
    description: "다양한 UI 디자인 영감을 얻을 수 있는 쇼케이스 사이트.",
    folderId: "design",
  },
  {
    id: "7",
    title: "Stratechery",
    url: "stratechery.com",
    description: "테크 산업 전략에 대한 깊이 있는 분석 아티클.",
    folderId: "reading",
  },
  {
    id: "8",
    title: "Hacker News",
    url: "news.ycombinator.com",
    description: "개발자들이 모여 최신 기술 소식을 나누는 커뮤니티.",
    folderId: "reading",
  },
  {
    id: "9",
    title: "The Pragmatic Engineer",
    url: "newsletter.pragmaticengineer.com",
    description: "실무 엔지니어링과 커리어에 대한 뉴스레터.",
    folderId: "reading",
  },
  {
    id: "10",
    title: "한입 링크 소개",
    url: "onebite.link/about",
    description: "한입 링크 서비스 소개 페이지.",
    folderId: "etc",
  },
];

export function getFolderById(folderId: string): Folder | undefined {
  return folders.find((folder) => folder.id === folderId);
}
