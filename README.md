# ARZOSKIN — Site (Orlando, FL)

Vite + React 18 + TypeScript + Tailwind + Framer Motion. Pronto para GitHub + Vercel.

```bash
pnpm install
pnpm dev      # desenvolvimento
pnpm check    # tipos
pnpm build    # saída em dist/public
```

Vercel: Framework Vite, Build `pnpm build`, Output `dist/public` (já no `vercel.json`).

## Onde editar
- `client/src/data/site.ts`: WhatsApp, Instagram, cidade, mensagens de WhatsApp (geral, por protocolo, por preocupação), lista de resultados e depoimentos.
- `client/src/i18n/en.ts` e `pt.ts`: todos os textos (site em inglês por padrão, com alternância para português; abre em PT se o navegador estiver em PT).
- `client/public/media/`: imagens e vídeos. **Se trocar uma mídia, use um nome novo** (o `vercel.json` cacheia `/media` por 1 ano como imutável).

## Seções
Abertura (logo) → Hero com vídeo → faixa de serviços → Fundadora → 6 Protocolos (+ botões por preocupação) → Experiência (vídeo + fotos + sessão completa) → Resultados (antes e depois) → Depoimentos → Como funciona → Contato.

## Mídias usadas
- Hero: `hero.mp4` cortado de 0,3 s a 9,6 s, sem áudio (o final tinha logo e fade preto, que quebrariam o loop). Poster: `hero.webp`.
- Experiência: `ritual.mp4` (vídeo curto 2, em loop) e `session.mp4` (vídeo 1, 68 s, com áudio, abre ao tocar em "Watch a full session"; reduzido de 11 MB para 4 MB).
- Fotos da Amanda: FOTO 4, 5 e 6. A "foto 1" (com o texto "what my patients are saying") não foi usada por já trazer texto.
- Antes e depois: `antes e depois 1 a 5` + `FEEDBACK 10`. São montagens com textos próprios (alguns em português, outros em inglês).
- Depoimentos: FEEDBACK 1 a 9 (o 9 está em inglês; os demais em português).

## PENDÊNCIAS (confirmar com a cliente antes de divulgar)
1. **Descrição de cada protocolo.** A lista veio como nome + subtítulo, sem descrição. Os textos curtos foram escritos de forma conservadora (sem promessas). **Confirmar o pareamento:** lido na ordem, ficou Ônix Lumiglow = Dermaplaning, Safira Glow = Skin Renewal Peel, Diamante DNA Glow = Microneedling.
2. **Preços e duração** não informados, então o site não mostra valores (o CTA leva ao WhatsApp).
3. **Autorização de imagens:** os antes e depois mostram rostos de clientes e os depoimentos mostram prints de conversas com fotos e (em alguns) @ de clientes. Confirmar autorização de uso. O FEEDBACK 3 é um comentário do Instagram com @ de terceiros; se ela preferir, remover em `data/site.ts` (`FEEDBACK`).
4. **Credenciais da Amanda** (licença de esteticista da Flórida, formação): não foram informadas, então não aparecem. Se ela tiver, adicionar em `i18n` > `about`.
5. **Endereço e horários:** só "Orlando" foi informado. Se ela atender em endereço fixo (ou quiser mapa), informar.
6. **Vídeo da sessão** (`session.mp4`) tem legendas embutidas em português em alguns trechos. Se quiser versão limpa, mandar o arquivo sem legenda.
7. **Texto de resultados:** o aviso "resultados variam" está em Resultados. Se o setor exigir outro aviso, ajustar em `i18n` > `results.note`.
