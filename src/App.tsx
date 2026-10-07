import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { Skills } from '@/components/Skills/Skills';
import { Experience } from '@/components/Experience/Experience';
import { Projects } from '@/components/Projects/Projects';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { useTheme } from '@/hooks/useTheme';
import { useSpotlight } from '@/hooks/useSpotlight';
import { ClipXDemo } from '@/components/ClipXDemo/ClipXDemo';
import { NextGenDemo } from '@/components/Demos/NextGenDemo';
import { ArcForgeDemo } from '@/components/Demos/ArcForgeDemo';
import { GestureDemo } from '@/components/Demos/GestureDemo';
import { OrianaDemo } from '@/components/Demos/OrianaDemo';
import { EcommerceDemo } from '@/components/Demos/EcommerceDemo';
import { WeatherDemo } from '@/components/Demos/WeatherDemo';

const demos: Record<string, () => JSX.Element> = {
  clipx: ClipXDemo,
  nextgen: NextGenDemo,
  arcforge: ArcForgeDemo,
  gesture: GestureDemo,
  oriana: OrianaDemo,
  ecommerce: EcommerceDemo,
  weather: WeatherDemo,
};

function App() {
  const { theme, toggleTheme } = useTheme();
  useSpotlight();

  const Demo = demos[new URLSearchParams(window.location.search).get('demo') ?? ''];
  if (Demo) {
    return <Demo />;
  }

  return (
    <div className="relative min-h-screen bg-ink-50 text-ink-800 dark:bg-ink-950 dark:text-ink-200">
      <div className="ai-backdrop" aria-hidden="true">
        <div className="gradient-orb animate-aurora -left-40 -top-40 h-[34rem] w-[34rem] bg-brand-600/25 dark:bg-brand-600/30" />
        <div
          className="gradient-orb animate-aurora -right-40 top-1/4 h-[30rem] w-[30rem] bg-accent-500/15 dark:bg-accent-600/20"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="gradient-orb animate-aurora bottom-0 left-1/3 h-[26rem] w-[26rem] bg-cyan-400/10 dark:bg-cyan-500/10"
          style={{ animationDelay: '8s' }}
        />
      </div>

      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
