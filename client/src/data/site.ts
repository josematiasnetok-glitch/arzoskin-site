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
  esmeralda: ["#4FA383", "#1F5B45"],
  quartzo: ["#F0C4CC", "#C98A97"],
  rubi: ["#D9475F", "#7E1426"],
  onix: ["#5A5A60", "#161618"],
  safira: ["#5E86D0", "#1E3A78"],
  diamante: ["#F4F7FA", "#A9B7C4"],
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

export type ResultItem = { src: string; ratio: string; en: string; pt: string };
export const RESULTS: ResultItem[] = [
  { src: "result-1.webp", ratio: "4/5", en: "Before and after: skin tone and texture, side profile", pt: "Antes e depois: tom e textura da pele, perfil" },
  { src: "result-2.webp", ratio: "4/5", en: "Before and after: eye area and skin tone", pt: "Antes e depois: região dos olhos e tom da pele" },
  { src: "result-3.webp", ratio: "4/5", en: "Before and after: nose area, without and with ARZOSKIN", pt: "Antes e depois: região do nariz, sem e com ARZOSKIN" },
  { src: "result-4.webp", ratio: "4/5", en: "Before and after: a facial changes everything", pt: "Antes e depois: um facial muda tudo" },
  { src: "result-5.webp", ratio: "4/5", en: "Before and after: acne-prone skin", pt: "Antes e depois: pele com acne" },
  { src: "result-6.webp", ratio: "1/1", en: "Before and after: pores and texture close-up", pt: "Antes e depois: poros e textura de perto" },
];

// Ordem dos depoimentos: o primeiro está em inglês; os demais são conversas reais em português.
export const FEEDBACK = [9, 8, 5, 6, 7, 2, 4, 1, 3].map((n) => ({ src: `fb-${n}.webp` }));

export const RITUAL = ["ritual-1.webp", "ritual-2.webp", "ritual-3.webp", "ritual-4.webp"] as const;
