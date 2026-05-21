"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useCurrentUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return origin ? `${origin}${pathname}?${searchParams.toString()}` : "";
}
