import { LanguageProvider } from "@/i18n";
import { IntroProvider } from "@/lib/intro";
import { Intro } from "@/components/Intro";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Strip } from "@/components/Strip";
import { About } from "@/components/About";
import { Manifesto } from "@/components/Manifesto";
import { Collection } from "@/components/Collection";
import { Transform } from "@/components/Transform";
import { Ritual } from "@/components/Ritual";
import { Reviews } from "@/components/Reviews";
import { Steps } from "@/components/Steps";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function App() {
  return (
    <LanguageProvider>
      <IntroProvider>
        <Intro />
        <Header />
        <main>
          <Hero />
          <Strip />
          <Manifesto />
          <Collection />
          <Transform />
          <Ritual />
          <About />
          <Reviews />
          <Steps />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFab />
      </IntroProvider>
    </LanguageProvider>
  );
}
