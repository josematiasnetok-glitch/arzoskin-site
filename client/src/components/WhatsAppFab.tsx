import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { WA_MESSAGES, whatsappLink } from "@/data/site";

export function WhatsAppFab() {
  const { t, lang } = useLang();
  return (
    <a
      href={whatsappLink(WA_MESSAGES.general[lang])} target="_blank" rel="noopener noreferrer" aria-label={t.fab}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition"
    >
      <MessageCircle size={26} />
    </a>
  );
}
