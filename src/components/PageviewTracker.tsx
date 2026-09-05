"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

export default function PageviewTracker() {
  useEffect(() => {
    track("pageview");
  }, []);
  return null;
}
