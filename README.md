# ARZOSKIN — site (v2 "Lapidação")

Conceito: a pele é lapidada como uma gema. Seis protocolos = seis gemas (Esmeralda, Quartzo Rosa, Rubi, Ônix, Safira, Diamante), cada uma com sua cor de seção.
Stack: Vite 5 · React 18 · TypeScript · Tailwind 3 · Framer Motion. Bilíngue EN/PT (padrão EN; PT se o navegador for PT).

## Rodar / publicar
    pnpm install && pnpm dev        # local
    pnpm check && pnpm build        # saída em dist/public
Vercel: `vercel.json` já aponta `dist/public`. Tudo em `client/public/media` (caminhos relativos).

## Seções
Intro · Hero (vídeo de fundo em tela cheia, com parallax no scroll) · Faixa · Manifesto · Coleção (6 gemas) · Transformações (6 antes/depois ARRASTÁVEIS) · Ritual (vídeo + momentos) · Amanda · Avaliações (prints) · Etapas · Contato · WhatsApp.

## Mídia (client/public/media)
hero-video.mp4, hero*.webp, ritual.mp4/.webp, session.mp4/.webp, ritual-1..5, amanda-*, fb-1..9, case-1..6-before/after.webp.
Ao trocar uma mídia, use NOVO nome de arquivo (a Vercel cacheia /media por 1 ano).

## Pendências (confirmar com a cliente)
- Pareamento dos protocolos: Ônix = Dermaplaning, Safira = Skin Renewal Peel, Diamante = Microneedling.
- Sem preços, credenciais, endereço de rua ou horários (não informados).
- Autorização de uso das fotos de clientes (antes/depois e prints); print 3 mostra @ de terceiro.
- Os pares antes/depois são fotos diferentes, sem alinhamento perfeito; tags "@arzoskin" removidas dos "antes" 3 e 5.
- O vídeo session.mp4 tem legendas em PT gravadas no próprio vídeo.
- A ordem dos "momentos" do Ritual é editorial, não afirma a ordem real do procedimento.
- Nota "resultados variam" mantida abaixo dos comparadores.

Animações de scroll: barra de progresso dourada, hero com zoom\/fade, faixa que desliza, gema e vídeo do Ritual com parallax, comparador que "abre" ao entrar.
