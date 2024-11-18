// ClientLayout.tsx
'use client';

import { useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("no-touch"); 

    return () => {
      html.classList.remove("no-touch");
    };
  }, []);

  return <>{children}</>;
}