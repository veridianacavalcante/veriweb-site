// Dados de contato do site. Altere aqui e a mudança vale para o site inteiro.

// WhatsApp: só dígitos, com DDI + DDD + número.
export const WHATSAPP = "5511985774518";

// TODO: confirmar que este e-mail existe (o domínio precisa estar configurado para receber).
export const EMAIL = "contato@veriweb.com.br";

export const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

// "5515900000000" -> "(15) 90000-0000" (remove o DDI 55)
export function phoneLabel(): string {
  const national = WHATSAPP.replace(/^55/, "");
  const ddd = national.slice(0, 2);
  const rest = national.slice(2);
  return `(${ddd}) ${rest.slice(0, -4)}-${rest.slice(-4)}`;
}

export type SocialName = "Instagram" | "LinkedIn" | "GitHub" | "Facebook";

// Cole o link completo do perfil (ex.: "https://instagram.com/veriweb").
// Redes com o link vazio não aparecem no site.
export const SOCIAL_LINKS: Record<SocialName, string> = {
  Instagram: "https://www.instagram.com/veri.web/",
  LinkedIn: "https://www.linkedin.com/company/veri-web/",
  GitHub: "",
  Facebook: "https://www.facebook.com/webveri/",
};
