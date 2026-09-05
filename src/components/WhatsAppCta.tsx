"use client";

import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/track";

export default function WhatsAppCta({
  message,
  target = "hero",
  className,
  children,
}: {
  message: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", target)}
      className={className}
    >
      {children}
    </a>
  );
}
