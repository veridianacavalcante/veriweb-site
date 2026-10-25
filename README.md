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
| `src/components/ContactForm.tsx` | Formulário de contato |
| `public/logo-horizontal.svg` | Logo do topo e do rodapé (basta substituir o arquivo) |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | Ícone da aba e do celular |
| `src/styles.css` | Cores da marca e animações |
| `src/routes/__root.tsx` | Título base, fontes, favicon, páginas de erro e 404 |

## Antes de publicar

- Confirmar que o endereço configurado em `EMAIL` recebe mensagens.
- Conferir se os links em `SOCIAL_LINKS` apontam para os perfis corretos.
- Adicionar uma imagem de compartilhamento (`og:image`) se quiser prévia bonita no WhatsApp/LinkedIn.

## Publicar em hospedagem Node.js

O projeto usa renderização no servidor (SSR) e gera o servidor de produção em `.output/server/index.mjs`.
Use uma hospedagem que aceite aplicações Node.js com um comando de build e um comando de inicialização:

1. Instale as dependências com `npm install`.
2. Gere a versão de produção com `npm run build`.
3. Inicie a aplicação com `npm run start`.

O runtime da hospedagem precisa ser compatível com Node.js 22.12 ou superior. Confirme no painel da hospedagem se ela suporta aplicações Node.js SSR e comandos personalizados de build/inicialização; este projeto não deve ser enviado como site estático.
