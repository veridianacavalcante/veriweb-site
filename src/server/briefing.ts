const MAX_PDF_SIZE = 5 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_PDF_SIZE + 32 * 1024;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT = 5;
const MAX_RATE_ENTRIES = 10_000;

type RateEntry = { count: number; resetAt: number };
type BriefingFields = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  servico: string;
};

const rateByIp = new Map<string, RateEntry>();
let lastRateCleanup = 0;

class ValidationError extends Error {}

function jsonResponse(status: number, body: { ok: boolean; message?: string }): Response {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

function getClientIp(request: Request): string {
  // Use os cabeçalhos de IP que o proxy da hospedagem sobrescreve.
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (now - lastRateCleanup > 15 * 60 * 1000) {
    for (const [key, entry] of rateByIp) {
      if (entry.resetAt <= now) rateByIp.delete(key);
    }
    lastRateCleanup = now;
  }

  const entry = rateByIp.get(ip);
  if (entry && entry.resetAt > now) {
    if (entry.count >= RATE_LIMIT) return true;
    entry.count += 1;
    return false;
  }

  if (rateByIp.size >= MAX_RATE_ENTRIES) {
    for (const [key, current] of rateByIp) {
      if (current.resetAt <= now) rateByIp.delete(key);
    }
    if (rateByIp.size >= MAX_RATE_ENTRIES) return true;
  }

  rateByIp.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  return false;
}

// Lê o multipart com limite antes de materializar o formulário em memória.
async function readLimitedForm(request: Request): Promise<FormData> {
  const reader = request.body?.getReader();
  if (!reader) throw new ValidationError("O formulário enviado está vazio.");

  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_REQUEST_SIZE) {
        await reader.cancel();
        throw new ValidationError("O PDF deve ter no máximo 5 MB.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  try {
    const body = new ArrayBuffer(total);
    const bodyBytes = new Uint8Array(body);
    let offset = 0;
    for (const chunk of chunks) {
      bodyBytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const formRequest = new Request(request.url, {
      method: "POST",
      headers: request.headers,
      body,
    });
    return await formRequest.formData();
  } catch {
    throw new ValidationError(
      "Não foi possível ler o formulário. Verifique os dados e tente novamente.",
    );
  }
}

function readField(
  form: FormData,
  name: keyof BriefingFields,
  label: string,
  maxLength: number,
): string {
  const entry = form.get(name);
  if (typeof entry !== "string" || !entry.trim()) {
    throw new ValidationError(`O campo ${label} é obrigatório.`);
  }

  const value = entry.trim();
  const hasControlCharacters = [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });
  if (value.length > maxLength || hasControlCharacters) {
    throw new ValidationError(`O campo ${label} excede o limite ou contém caracteres inválidos.`);
  }
  return value;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character]!;
  });
}

function safeFilename(filename: string): string {
  const base = filename
    .replace(/[\\/]/g, "-")
    .replace(/\.pdf$/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "")
    .slice(0, 100);
  return `${base || "Briefing-VERIWEB"}.pdf`;
}

function getEmailHtml(fields: BriefingFields, date: string): string {
  return `<!doctype html>
<html lang="pt-BR">
<body style="margin:0;padding:32px;background:#00071A;font-family:Arial,sans-serif;color:#fff">
  <div style="max-width:600px;margin:0 auto;padding:28px;border:1px solid #046CFF;border-radius:12px">
    <h1 style="margin:0 0 24px;color:#00E4FD;font-size:24px">Novo briefing VERIWEB</h1>
    <p style="margin:0 0 18px;color:#9AA8C7">Serviço: <strong style="color:#fff">${escapeHtml(fields.servico)}</strong></p>
    <p style="margin:0 0 12px">Nome: ${escapeHtml(fields.nome)}</p>
    <p style="margin:0 0 12px">Empresa: ${escapeHtml(fields.empresa)}</p>
    <p style="margin:0 0 12px">E-mail: ${escapeHtml(fields.email)}</p>
    <p style="margin:0 0 12px">WhatsApp: ${escapeHtml(fields.whatsapp)}</p>
    <p style="margin:0 0 24px;color:#9AA8C7">Recebido em: ${escapeHtml(date)}</p>
    <p style="margin:0;color:#00E4FD">O briefing completo está em anexo (PDF).</p>
  </div>
</body>
</html>`;
}

function getEmailText(fields: BriefingFields, date: string): string {
  return [
    "Novo briefing VERIWEB",
    `Serviço: ${fields.servico}`,
    `Nome: ${fields.nome}`,
    `Empresa: ${fields.empresa}`,
    `E-mail: ${fields.email}`,
    `WhatsApp: ${fields.whatsapp}`,
    `Recebido em: ${date}`,
    "",
    "O briefing completo está em anexo (PDF).",
  ].join("\n");
}

function getSmtpConfig() {
  const host = process.env["SMTP_HOST"]?.trim();
  const user = process.env["SMTP_USER"]?.trim();
  const pass = process.env["SMTP_PASS"];
  const port = Number(process.env["SMTP_PORT"] || 465);
  const to = process.env["BRIEFING_TO"]?.trim() || "veri@veriweb.com.br";

  if (!host || !user || !pass || !Number.isInteger(port) || port !== 465) return null;
  if (user.toLowerCase() !== "veri@veriweb.com.br") return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return null;
  return { host, user, pass, port, to };
}

export async function handleBriefingRequest(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return jsonResponse(403, { ok: false, message: "Origem da requisição não permitida." });
      }
    } catch {
      return jsonResponse(403, { ok: false, message: "Origem da requisição não permitida." });
    }
  }
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return jsonResponse(403, { ok: false, message: "Origem da requisição não permitida." });
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.startsWith("multipart/form-data;")) {
    return jsonResponse(400, {
      ok: false,
      message: "Envie os dados no formato multipart/form-data.",
    });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_SIZE) {
    return jsonResponse(400, { ok: false, message: "O PDF deve ter no máximo 5 MB." });
  }

  let form: FormData;
  try {
    form = await readLimitedForm(request);
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonResponse(400, { ok: false, message: error.message });
    }
    return jsonResponse(400, { ok: false, message: "Não foi possível ler o formulário enviado." });
  }

  if (String(form.get("website") ?? "").trim()) {
    return jsonResponse(200, { ok: true });
  }

  if (isRateLimited(getClientIp(request))) {
    return jsonResponse(429, {
      ok: false,
      message: "Limite de envios atingido. Tente novamente mais tarde.",
    });
  }

  let fields: BriefingFields;
  let pdf: File;
  let pdfBytes: Buffer;
  try {
    const pdfEntry = form.get("pdf");
    if (!(pdfEntry instanceof File)) throw new ValidationError("O arquivo PDF é obrigatório.");
    if (pdfEntry.type !== "application/pdf") {
      throw new ValidationError("O arquivo enviado deve ser um PDF.");
    }
    if (pdfEntry.size > MAX_PDF_SIZE) {
      throw new ValidationError("O PDF deve ter no máximo 5 MB.");
    }

    fields = {
      nome: readField(form, "nome", "nome", 150),
      empresa: readField(form, "empresa", "empresa", 150),
      email: readField(form, "email", "e-mail", 254),
      whatsapp: readField(form, "whatsapp", "WhatsApp", 40),
      servico: readField(form, "servico", "serviço", 120),
    };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      throw new ValidationError("Informe um e-mail válido.");
    }

    pdfBytes = Buffer.from(await pdfEntry.arrayBuffer());
    if (pdfBytes.length < 4 || pdfBytes.subarray(0, 4).toString("ascii") !== "%PDF") {
      throw new ValidationError("O arquivo não contém um PDF válido.");
    }
    pdf = pdfEntry;
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonResponse(400, { ok: false, message: error.message });
    }
    return jsonResponse(400, { ok: false, message: "Os dados enviados são inválidos." });
  }

  const smtp = getSmtpConfig();
  if (!smtp) {
    return jsonResponse(500, {
      ok: false,
      message: "Não foi possível enviar o briefing agora. Tente novamente mais tarde.",
    });
  }

  const date = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  try {
    const { default: nodemailer } = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: true,
      auth: { user: smtp.user, pass: smtp.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
    });

    await transporter.sendMail({
      from: { name: "VERIWEB Briefing", address: "veri@veriweb.com.br" },
      to: smtp.to,
      replyTo: fields.email,
      subject: `Novo briefing · ${fields.servico} · ${fields.empresa}`,
      html: getEmailHtml(fields, date),
      text: getEmailText(fields, date),
      attachments: [
        {
          filename: safeFilename(pdf.name),
          content: pdfBytes,
          contentType: "application/pdf",
        },
      ],
    });
  } catch {
    return jsonResponse(500, {
      ok: false,
      message: "Não foi possível enviar o briefing agora. Tente novamente mais tarde.",
    });
  }

  return jsonResponse(200, { ok: true });
}
