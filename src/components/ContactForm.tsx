import { useState, type FormEvent, type ReactNode } from "react";
import { Send } from "lucide-react";
import { z } from "zod";

import { serviceOptions } from "../lib/content";
import { waLink } from "../lib/site";

const digits = (v: string) => v.replace(/\D/g, "");

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  telefone: z
    .string()
    .trim()
    .refine(
      (v) => /^[\d\s()+-]+$/.test(v) && digits(v).length >= 10 && digits(v).length <= 13,
      "Telefone inválido (use DDD + número)",
    ),
  empresa: z.string().trim().max(100, "Nome da empresa muito longo").optional(),
  // A mensagem customizada é necessária: o <select> com opção inicial desabilitada não entra no FormData,
  // então o campo chega como "undefined" e a mensagem padrão do zod sairia em inglês.
  servico: z.string({ error: "Escolha um serviço" }).min(1, "Escolha um serviço"),
  mensagem: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais (mín. 10 caracteres)")
    .max(1000, "Máximo de 1000 caracteres"),
});

const fieldOrder = ["nome", "email", "telefone", "empresa", "servico", "mensagem"];

function Field({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-erro`} className="mt-1 text-[13px] text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-sm border border-input bg-background px-4 py-3 text-[15px] placeholder:text-muted-foreground/60 focus:border-cyan focus:outline-none";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  // Atributos de acessibilidade para campos com erro
  const aria = (name: string) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-erro` : undefined,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSent(false);

    const result = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!(key in next)) next[key] = issue.message;
      }
      setErrors(next);
      const first = fieldOrder.find((k) => next[k]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setErrors({});
    const v = result.data;
    const msg = `Olá, VERIWEB! Sou ${v.nome}${v.empresa ? ` (${v.empresa})` : ""}.\nServiço: ${v.servico}\nE-mail: ${v.email}\nTelefone: ${v.telefone}\n\n${v.mensagem}`;
    const url = waLink(msg);

    // Abre o WhatsApp em nova aba; se o navegador bloquear o pop-up, abre na mesma aba.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;

    form.reset();
    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="reveal grid gap-5 rounded-lg border border-border bg-surface p-6 md:grid-cols-2 md:p-8"
    >
      <Field name="nome" error={errors["nome"]} label="Nome *">
        <input id="nome" name="nome" className={inputClass} autoComplete="name" {...aria("nome")} />
      </Field>
      <Field name="email" error={errors["email"]} label="E-mail *">
        <input
          id="email"
          name="email"
          type="email"
          className={inputClass}
          autoComplete="email"
          {...aria("email")}
        />
      </Field>
      <Field name="telefone" error={errors["telefone"]} label="Telefone (WhatsApp) *">
        <input
          id="telefone"
          name="telefone"
          type="tel"
          placeholder="(11) 90000-0000"
          className={inputClass}
          autoComplete="tel"
          {...aria("telefone")}
        />
      </Field>
      <Field name="empresa" error={errors["empresa"]} label="Empresa">
        <input
          id="empresa"
          name="empresa"
          className={inputClass}
          autoComplete="organization"
          {...aria("empresa")}
        />
      </Field>
      <div className="md:col-span-2">
        <Field name="servico" error={errors["servico"]} label="Serviço de interesse *">
          <select
            id="servico"
            name="servico"
            defaultValue=""
            className={inputClass}
            {...aria("servico")}
          >
            <option value="" disabled>
              Selecione um serviço
            </option>
            {serviceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field name="mensagem" error={errors["mensagem"]} label="Mensagem *">
          <textarea
            id="mensagem"
            name="mensagem"
            rows={5}
            className={inputClass}
            {...aria("mensagem")}
          />
        </Field>
      </div>
      <button type="submit" className="btn-signal md:col-span-2">
        <Send size={18} aria-hidden /> Enviar pelo WhatsApp
      </button>
      <p className="text-[13px] text-muted-foreground md:col-span-2" role="status">
        {sent
          ? "Abrimos o WhatsApp com a sua mensagem pronta. Falta só tocar em enviar por lá."
          : "Ao enviar, abriremos o WhatsApp com a sua mensagem já preenchida."}
      </p>
    </form>
  );
}
