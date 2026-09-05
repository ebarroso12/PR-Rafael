type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  icon?: "cross" | "compass" | "book";
};

/**
 * Renders the real photo when one has been uploaded through the admin
 * panel (Painel > Imagens). Until then it shows a tasteful, on-brand
 * placeholder instead of a fabricated stock photo standing in for a real
 * person - swapping in the real portraits is literally what the image
 * manager is for.
 */
export default function PhotoPanel({ src, alt, className = "", icon = "cross" }: Props) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-ink-soft via-ink to-black ${className}`}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(198,154,78,0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(198,154,78,0.12), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 border border-gold/20 m-4" />
      <Icon name={icon} className="relative h-10 w-10 text-gold/70 sm:h-14 sm:w-14" />
    </div>
  );
}

function Icon({ name, className }: { name: Props["icon"]; className?: string }) {
  if (name === "compass") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
        <circle cx="24" cy="24" r="18" />
        <path d="M31 17l-5.5 11.5L14 34l5.5-11.5L31 17z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "book") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
        <path d="M24 12c-3-2-8-3-14-3v27c6 0 11 1 14 3 3-2 8-3 14-3V9c-6 0-11 1-14 3z" strokeLinejoin="round" />
        <path d="M24 12v27" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
      <path d="M24 6v36M12 16h24" strokeLinecap="round" />
    </svg>
  );
}
