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

type UpdateLinkInput = {
  folderId: string;
  title: string;
  description: string;
};

type LinkContextValue = {
  links: LinkItem[];
  addLink: (input: NewLinkInput) => LinkItem;
  removeLink: (id: string) => void;
  updateLink: (id: string, input: UpdateLinkInput) => void;
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

  const removeLink = useCallback((id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }, []);

  const updateLink = useCallback((id: string, input: UpdateLinkInput) => {
    const title = input.title.trim();
    if (!title || !input.folderId) return;

    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? {
              ...link,
              folderId: input.folderId,
              title,
              description: input.description.trim(),
            }
          : link
      )
    );
  }, []);

  return (
    <LinkContext.Provider
      value={{ links, addLink, removeLink, updateLink }}
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
