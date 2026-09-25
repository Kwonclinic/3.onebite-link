"use client";

import LinkGrid from "@/components/LinkGrid";
import { useLinks } from "@/lib/link-context";

export default function Home() {
  const { links } = useLinks();
  return <LinkGrid links={links} />;
}
