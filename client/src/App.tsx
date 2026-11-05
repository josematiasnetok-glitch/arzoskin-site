import { LanguageProvider } from "@/i18n";
import { IntroProvider } from "@/lib/intro";
import { Intro } from "@/components/Intro";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Strip } from "@/components/Strip";
import { About } from "@/components/About";
import { Protocols } from "@/components/Protocols";
import { Experience } from "@/components/Experience";
import { Results } from "@/components/Results";
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
          <About />
          <Protocols />
          <Experience />
          <Results />
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
