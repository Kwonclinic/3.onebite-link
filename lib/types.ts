export type Folder = {
  id: string;
  name: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};
