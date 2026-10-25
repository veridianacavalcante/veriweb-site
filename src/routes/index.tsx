import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, Menu, X } from "lucide-react";

import { ContactForm } from "../components/ContactForm";
import { Logo } from "../components/Logo";
import { Socials } from "../components/Socials";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { faqs, nav, services, steps } from "../lib/content";
import { EMAIL, phoneLabel, waLink } from "../lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VERIWEB · Sites, apps, SaaS, ERP e automação sob medida" },
      {
        name: "description",
        content:
          "Estúdio digital 100% online: sites, aplicativos, software personalizado, SaaS, ERP e agentes de IA com entrega rápida.",
      },
      { property: "og:title", content: "VERIWEB · Seu negócio mais forte no virtual" },
      {
        property: "og:description",
        content: "Soluções digitais sob medida: sites, apps, SaaS, ERP, automação e agentes de IA.",
      },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

// Faz as seções aparecerem suavemente quando entram na tela
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="reveal mx-auto mb-10 max-w-2xl text-center">
      <h2 className="font-display text-2xl font-bold leading-8 text-cyan md:text-[32px] md:leading-10">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-[17px] leading-7 text-muted-foreground md:text-[19px] md:leading-[30px]">
          {sub}
        </p>
      )}
    </div>
  );
}

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);
  const cta = waLink("Olá, VERIWEB! Gostaria de solicitar um orçamento gratuito.");

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 btn-signal"
      >
        Pular para o conteúdo
      </a>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between px-6 py-4">
          <Logo />
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[15px] text-muted-foreground">
              {nav.map(([label, id]) => (
                <li key={id}>
                  <a href={`#${id}`} className="transition hover:text-foreground">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* max-md:hidden vence o display do btn-signal; o "hidden" simples poderia perder a disputa */}
          <a
            href={cta}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-signal !py-2.5 max-lg:hidden"
          >
            Fale conosco
          </a>
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav aria-label="Menu móvel" className="border-t border-border px-6 pb-6 lg:hidden">
            <ul className="flex flex-col gap-4 pt-4">
              {nav.map(([label, id]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={() => setOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-signal w-full"
                >
                  Fale conosco
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="conteudo">
        {/* Início */}
        <section id="inicio" className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16">
          <div
            className="bg-node-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-1/3 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-gradient-pulse opacity-25 blur-[120px]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1200px] px-6">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="reveal mb-6 inline-flex items-center rounded-full border border-input px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-cyan">
                  AGÊNCIA DIGITAL
                </p>
                <h1 className="reveal max-w-2xl font-display text-[28px] font-black leading-[36px] sm:text-[34px] sm:leading-[42px] md:text-5xl md:leading-[56px] lg:text-6xl lg:leading-[68px]">
                  Soluções digitais <span className="text-gradient-web">personalizadas</span> para o
                  seu negócio
                </h1>
                <p className="reveal mt-6 max-w-xl text-[17px] leading-7 text-muted-foreground md:text-[19px] md:leading-[30px]">
                  Sites, aplicativos, software personalizado, SaaS, ERP, agentes de IA e automação.
                  Criamos o produto sob medida para resolver o problema real da sua empresa.
                </p>
                <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={cta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-signal whitespace-nowrap px-4 text-sm sm:px-6 sm:text-[15px]"
                  >
                    <WhatsAppIcon size={18} /> Solicitar orçamento gratuito
                  </a>
                  <a href="#servicos" className="btn-ghost">
                    Ver serviços
                  </a>
                </div>
              </div>
              <div className="reveal relative mx-auto w-full max-w-[520px]">
                <div
                  className="absolute inset-10 rounded-full bg-gradient-pulse opacity-30 blur-3xl"
                  aria-hidden
                />
                <img
                  src="/hero-illustration.svg"
                  alt="Ilustração de uma interface digital com gráficos e elementos de tecnologia"
                  className="relative h-auto w-full"
                  width="640"
                  height="520"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="scroll-mt-20 py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <SectionTitle
              title="Nossos Serviços"
              sub="Do primeiro site ao sistema que roda a sua operação: soluções sustentáveis e escaláveis."
            />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, t, d }, i) => (
                <li
                  key={t}
                  className="reveal group rounded-lg border border-border bg-surface p-7 transition hover:-translate-y-1 hover:border-sky/50"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-gradient-pulse">
                    <Icon size={24} strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold leading-7">{t}</h3>
                  <p className="mt-2 leading-[26px] text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Como trabalhamos */}
        <section
          id="processo"
          className="relative scroll-mt-20 border-y border-border bg-surface/40 py-12 md:py-16"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <SectionTitle
              title="Como trabalhamos"
              sub="Prazo e escopo combinados antes de começar. Você acompanha cada etapa."
            />
            <div className="relative">
              {/* linha que liga as etapas (fora da <ol> para o HTML ficar válido) */}
              <div
                className="absolute left-6 top-6 bottom-6 w-px bg-gradient-web md:left-6 md:right-6 md:top-6 md:bottom-auto md:h-px md:w-auto"
                aria-hidden
              />
              <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
                {steps.map(({ icon: Icon, t, d }, i) => (
                  <li
                    key={t}
                    className="reveal relative flex gap-5 md:flex-col"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan bg-background text-cyan">
                      <Icon size={22} aria-hidden />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-cyan">Etapa {i + 1}</p>
                      <h3 className="mt-1 text-xl font-semibold">{t}</h3>
                      <p className="mt-2 leading-[26px] text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Chamada para ação */}
        <section className="px-6 py-12 md:py-16" aria-labelledby="cta-title">
          <div className="reveal relative mx-auto max-w-[1200px] overflow-hidden rounded-xl bg-gradient-pulse px-6 py-16 text-center shadow-glow md:py-20">
            <div className="bg-node-grid absolute inset-0 opacity-60" aria-hidden />
            <div className="relative">
              <h2
                id="cta-title"
                className="mx-auto max-w-3xl font-display text-2xl font-bold leading-8 md:text-4xl md:leading-[48px]"
              >
                Pronto para transformar sua ideia em realidade digital?
              </h2>
              <a href={cta} target="_blank" rel="noopener noreferrer" className="btn-signal mt-8">
                <WhatsAppIcon size={18} /> Solicitar orçamento gratuito
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <SectionTitle title="Perguntas frequentes" />
            <div className="space-y-3">
              {faqs.map(([q, a]) => (
                <details
                  key={q}
                  className="reveal group rounded-lg border border-border bg-surface px-6 open:border-sky/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                    <h3>{q}</h3>
                    <ChevronDown
                      className="shrink-0 text-cyan transition group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="pb-5 leading-[26px] text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="scroll-mt-20 py-12 md:py-16">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
            <div className="reveal">
              <h2 className="font-display text-2xl font-bold leading-8 text-cyan md:text-[32px] md:leading-10">
                Conte seu problema
              </h2>
              <p className="mt-4 text-[17px] leading-7 text-muted-foreground">
                A gente desenha a solução com você. Respondemos rapidinho pelo WhatsApp.
              </p>
              <ul className="mt-8 space-y-4 text-[15px]">
                <li>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-cyan">
                    <Mail size={20} className="text-cyan" aria-hidden /> {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={cta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-cyan"
                  >
                    <WhatsAppIcon size={20} className="text-cyan" /> {phoneLabel()}
                  </a>
                </li>
              </ul>
              <div className="mt-8">
                <Socials />
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="flex items-center justify-center gap-2 border-t border-border/50 py-3 text-xs text-muted-foreground/70">
        <span>© 2026</span>
        <Logo className="h-5" />
        <span>Todos os direitos reservados.</span>
      </footer>

      {/* Botão flutuante do WhatsApp */}
      <a
        href={cta}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-success text-background shadow-glow transition hover:scale-110"
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
