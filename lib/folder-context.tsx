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
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  isLoadingFolders: boolean;
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setFolders(
            data.map((row) => ({
              id: String(row.id),
              name: row.name,
            }))
          );
        }
        setIsLoadingFolders(false);
      });
  }, []);

  const addFolder = useCallback(async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || isAddingRef.current) return;

    isAddingRef.current = true;
    setIsAddingFolder(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name: trimmed })
        .select("id, name")
        .single();

      if (error || !data) return;

      setFolders((prev) => [
        ...prev,
        { id: String(data.id), name: data.name },
      ]);
    } finally {
      isAddingRef.current = false;
      setIsAddingFolder(false);
    }
  }, []);

  const removeFolder = useCallback(async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("folders").delete().eq("id", id);

    if (error) return;

    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }, []);

  const renameFolder = useCallback(async (id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id);

    if (error) return;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder
      )
    );
  }, []);

  return (
    <FolderContext.Provider
      value={{
        folders,
        isLoadingFolders,
        isAddingFolder,
        addFolder,
        removeFolder,
        renameFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
