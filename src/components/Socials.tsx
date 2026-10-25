import type { ReactNode } from "react";

import { SOCIAL_LINKS, type SocialName } from "../lib/site";

const icons: Record<SocialName, ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  GitHub: (
    <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  Facebook: <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z" />,
};

// Mostra só as redes que têm link preenchido em src/lib/site.ts
export function Socials() {
  const active = (Object.keys(SOCIAL_LINKS) as SocialName[]).filter((n) => SOCIAL_LINKS[n]);
  if (active.length === 0) return null;

  return (
    <ul className="flex gap-3">
      {active.map((name) => (
        <li key={name}>
          <a
            href={SOCIAL_LINKS[name]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="grid h-11 w-11 place-items-center rounded-full border border-input text-muted-foreground transition hover:border-cyan hover:text-cyan"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {icons[name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
