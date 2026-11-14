# VERIWEB · Site institucional

TypeScript + React com TanStack Start e Tailwind CSS v4.

## Rodar no VS Code

1. Abra a pasta do projeto no VS Code (File → Open Folder).
2. No terminal do VS Code: `npm install`
3. `npm run dev` e abra http://localhost:8080

Outros comandos: `npm run build`, `npm run preview`, `npm run lint`, `npm run format`.

## Onde editar

| Arquivo | O que muda |
| --- | --- |
| `src/lib/site.ts` | **WhatsApp, e-mail e links das redes sociais** (um lugar só) |
| `src/lib/content.ts` | Textos: menu, serviços, etapas, FAQ |
| `src/routes/index.tsx` | Estrutura da página e textos do topo/rodapé |
| `public/og-image.svg`, `public/og-image.png` | Imagem de compartilhamento; manter alinhada ao hero da home |
| `public/sitemap.xml`, `public/robots.txt` | Sitemap e instruções para mecanismos de busca |
| `src/components/ContactForm.tsx` | Formulário de contato |
| `public/logo-horizontal.svg` | Logo do topo e do rodapé (basta substituir o arquivo) |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | Ícone da aba e do celular |
| `src/styles.css` | Cores da marca e animações |
| `src/routes/__root.tsx` | Título base, fontes, favicon, páginas de erro e 404 |

## Antes de publicar

- Confirmar que o endereço configurado em `EMAIL` recebe mensagens.
- Conferir se os links em `SOCIAL_LINKS` apontam para os perfis corretos.
- Conferir `public/sitemap.xml` e manter a data `lastmod` atualizada após alterações relevantes no site.
- Conferir se `og:image` aponta para a imagem publicada em `public/og-image.png`.

## Publicar em hospedagem Node.js

O projeto usa renderização no servidor (SSR) e gera o servidor de produção em `.output/server/index.mjs`.
Use uma hospedagem que aceite aplicações Node.js com um comando de build e um comando de inicialização:

1. Instale as dependências com `npm install`.
2. Gere a versão de produção com `npm run build`.
3. Inicie a aplicação com `npm run start`.

O runtime da hospedagem precisa ser compatível com Node.js 22.12 ou superior. Confirme no painel da hospedagem se ela suporta aplicações Node.js SSR e comandos personalizados de build/inicialização; este projeto não deve ser enviado como site estático.

## Briefing por e-mail

A página autônoma está em `public/briefing/index.html` e é publicada em `/briefing/`. Ao clicar em “Concluir e enviar briefing”, o PDF é gerado em memória e enviado como anexo pelo endpoint `POST /api/briefing` via SMTP da Hostinger; a página não baixa uma cópia para o computador. O servidor não salva anexos nem registra dados pessoais. O limite é de 5 envios por IP a cada hora por processo (reiniciar a aplicação zera a contagem). A identificação do IP usa `X-Real-IP` ou o primeiro `X-Forwarded-For`; o proxy da hospedagem precisa sobrescrever esses cabeçalhos para evitar falsificação.

### Variáveis de ambiente

Copie `.env.example` para `.env` no desenvolvimento e preencha `SMTP_PASS` com a senha da caixa `veri@veriweb.com.br`. Não compartilhe essa senha nem envie o arquivo `.env`; ele é ignorado pelo Git.

| Variável | Valor |
| --- | --- |
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `veri@veriweb.com.br` |
| `SMTP_PASS` | Senha da caixa de e-mail da Hostinger |
| `BRIEFING_TO` | Destinatário; padrão `veri@veriweb.com.br` |

No hPanel, configure essas variáveis na área da aplicação Node.js (Environment variables) antes de iniciar/reiniciar o app. Use Node.js 22.12 ou superior, comando de build `npm run build` e inicialização `npm run start`; publique o projeto como aplicação Node SSR, não apenas copiando arquivos para `public_html`. Mantenha a página `/briefing/` no diretório público servido pelo app. O encaminhamento existente da caixa para o Gmail não é alterado.

### Rodar e testar

1. `npm ci`
2. Copie `.env.example` para `.env`, preencha os valores (inclusive `SMTP_PASS`) e rode `npm run dev`.
3. Com `npm run dev`, abra `http://127.0.0.1:8080/briefing/index.html` e conclua o formulário. O botão “Concluir e enviar briefing” envia o PDF automaticamente. No Vite de desenvolvimento, use o caminho explícito `index.html`; no servidor de produção, o endereço publicado é `/briefing/`. Para testar esse endereço localmente, rode `npm run build` e `npm run start` e abra `http://localhost:3000/briefing/`. Não use a extensão Live Server na porta `5500`: ela publica apenas arquivos estáticos e não executa a API.
4. Se quiser testar o endpoint diretamente, use:

```powershell
curl.exe -i -F "pdf=@C:\caminho\briefing.pdf;type=application/pdf" -F "nome=Teste" -F "empresa=Empresa Teste" -F "email=cliente@example.com" -F "whatsapp=11999999999" -F "servico=Site institucional" -F "website=" http://localhost:8080/api/briefing
```

Uma resposta `200` com `{"ok":true}` indica que o SMTP aceitou a mensagem, mas não garante que o encaminhamento posterior ao Gmail foi aceito. Confira primeiro a caixa `veri@veriweb.com.br` e abra o PDF; depois verifique `veriweb.br@gmail.com` e Spam. Não use dados reais de clientes no teste.

### Proteção anti-robô opcional

O campo honeypot e o limite por IP já estão ativos. Para adicionar Cloudflare Turnstile depois, crie um widget para `veriweb.com.br`, envie o token do navegador no formulário e valide-o no endpoint com o segredo guardado somente nas variáveis de ambiente do servidor.
