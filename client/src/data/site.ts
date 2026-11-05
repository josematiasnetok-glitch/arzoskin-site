// Fonte única de contatos. Troque aqui e o site inteiro atualiza.
export const SITE = {
  name: "ARZOSKIN",
  founder: "Amanda Rojas de Souza",
  whatsappNumber: "14078194630",
  whatsappDisplay: "+1 (407) 819-4630",
  phoneTel: "+14078194630",
  instagramUrl: "https://www.instagram.com/arzoskin/",
  instagramHandle: "@arzoskin",
  city: "Orlando",
  region: "Orlando, FL",
  // Sem endereço de rua: só "Orlando" foi informado. Não inventar endereço.
} as const;

export type Lang = "en" | "pt";

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Mensagem geral = a que a cliente enviou (com o formulário rápido em bullets).
export const WA_MESSAGES = {
  general: {
    en: "Hello, I found ARZOSKIN and would like to learn more about the treatments.\n• My name is:\n• My main skin concern is (acne, dark spots, texture, sensitivity, or rejuvenation):\n• I would like to schedule a treatment.",
    pt: "Olá, encontrei a ARZOSKIN e gostaria de saber mais sobre os tratamentos.\n• Meu nome é:\n• Minha principal preocupação com a pele é (acne, manchas, textura, sensibilidade ou rejuvenescimento):\n• Gostaria de agendar um tratamento.",
  },
  protocol: {
    en: (p: string) => `Hello, I found ARZOSKIN and I'm interested in ${p}.\n• My name is:\n• My main skin concern is:\n• I would like to schedule a treatment.`,
    pt: (p: string) => `Olá, encontrei a ARZOSKIN e tenho interesse em ${p}.\n• Meu nome é:\n• Minha principal preocupação com a pele é:\n• Gostaria de agendar um tratamento.`,
  },
  concern: {
    en: (c: string) => `Hello, I found ARZOSKIN. My main skin concern is ${c} and I'd like help choosing a treatment.\n• My name is:`,
    pt: (c: string) => `Olá, encontrei a ARZOSKIN. Minha principal preocupação é ${c} e gostaria de ajuda para escolher um tratamento.\n• Meu nome é:`,
  },
} as const;

// Cores de cada gema (ponto/brilho dos protocolos).
export const GEMS = {
  esmeralda: ["#6FD1A6", "#0F4A36"],
  quartzo: ["#FBD9DF", "#B9707F"],
  rubi: ["#F0647C", "#6E0F22"],
  onix: ["#8A8A93", "#0E0E11"],
  safira: ["#7FA6F0", "#14316E"],
  diamante: ["#FFFFFF", "#8FA2B5"],
} as const;
// Cor de fundo da seção quando a pedra está ativa (escura, para o texto claro ler bem).
export const GEM_BG = {
  esmeralda: "#0E2A20",
  quartzo: "#3A1F27",
  rubi: "#2E0D16",
  onix: "#121214",
  safira: "#0E1B3A",
  diamante: "#1B2530",
} as const;
export type GemKey = keyof typeof GEMS;

export const PROTOCOLS: { key: GemKey; id: string }[] = [
  { key: "esmeralda", id: "esmeralda" },
  { key: "quartzo", id: "quartzo" },
  { key: "rubi", id: "rubi" },
  { key: "onix", id: "onix" },
  { key: "safira", id: "safira" },
  { key: "diamante", id: "diamante" },
];

export const CASES = [
  { n: 1, w: 634, h: 1350, focus: "50% 40%" },
  { n: 2, w: 632, h: 1285, focus: "50% 52%" },
  { n: 3, w: 1360, h: 1116, focus: "50% 50%" },
  { n: 4, w: 840, h: 898, focus: "50% 50%" },
  { n: 5, w: 1400, h: 826, focus: "50% 40%" },
  { n: 6, w: 590, h: 1190, focus: "50% 50%" },
] as const;

// Ordem dos depoimentos: o primeiro está em inglês; os demais são conversas reais em português.
export const FEEDBACK = [9, 8, 5, 6, 7, 2, 4, 1, 3].map((n) => ({ src: `fb-${n}.webp` }));

export const RITUAL = ["ritual-4.webp", "ritual-2.webp", "ritual-1.webp", "ritual-3.webp", "ritual-5.webp"] as const;
