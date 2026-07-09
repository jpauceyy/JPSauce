import Hero from '../components/Hero';
import FeaturedWorks from '../components/FeaturedWorks';
import Capabilities from '../components/Capabilities';
import Process from '../components/Process';
import About from '../components/About';
import Partners from '../components/Partners';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWorks />
      <Capabilities />
      <Process />
      <About />
      <Partners />
    </main>
  );
}
