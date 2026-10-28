import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { faqs } from "../lib/content";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-signal">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado do nosso lado. Tente atualizar ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-signal"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-ghost">
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VERIWEB | Software House: sites, apps, SaaS, ERP e IA" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "VERIWEB" },
      { property: "og:locale", content: "pt_BR" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              name: "VERIWEB",
              alternateName: "VERIWEB Software House",
              url: "https://www.veriweb.com.br/",
              slogan: "Seu negócio mais forte no virtual",
              description:
                "Estúdio virtual e software house 100% online: sites, aplicativos, software personalizado, SaaS, ERP, agentes de IA e automação.",
              email: "veri@veriweb.com.br",
              telephone: "+55 11 98577-4518",
              areaServed: "BR",
              sameAs: [
                "https://www.instagram.com/veri.web/",
                "https://www.linkedin.com/company/veri-web/",
                "https://www.facebook.com/webveri/",
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map(([name, text]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: {
                  "@type": "Answer",
                  text,
                },
              })),
            },
          ],
        },
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@700;900&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "canonical", href: "https://www.veriweb.com.br/" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Obrigatório: as rotas filhas aparecem aqui. Sem o <Outlet />, nenhuma página renderiza.
  return <Outlet />;
}
