"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { links as initialLinks } from "@/lib/mock-data";
import type { LinkItem } from "@/lib/types";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  folderId: string;
};

type LinkContextValue = {
  links: LinkItem[];
  addLink: (input: NewLinkInput) => LinkItem;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = useCallback((input: NewLinkInput) => {
    const newLink: LinkItem = {
      id: crypto.randomUUID(),
      url: input.url,
      title: input.title,
      description: input.description,
      thumbnail: input.thumbnail ?? undefined,
      folderId: input.folderId,
    };

    setLinks((prev) => [newLink, ...prev]);
    return newLink;
  }, []);

  return (
    <LinkContext.Provider value={{ links, addLink }}>
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
