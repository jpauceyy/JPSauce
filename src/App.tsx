/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import Lenis from 'lenis';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LenisSetup() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent browser auto-scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll window to top immediately before initializing Lenis
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      infinite: pathname === '/work'
    });
    (window as any).lenis = lenis;

    // Reset Lenis internal scroll state to top immediately
    lenis.scrollTo(0, { immediate: true });

    // Double check scroll position after a short tick to handle rendering delay
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 50);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      clearTimeout(timer);
      (window as any).lenis = undefined;
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}

function ConditionalFooter() {
  const { pathname } = useLocation();
  const isWorkDetail = pathname.startsWith('/work/');
  const isStandardRoute = ['/', '/work', '/contact'].includes(pathname) || isWorkDetail;
  if (!isStandardRoute || pathname === '/work') return null;
  return <Footer />;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <LenisSetup />
      
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ConditionalFooter />
      </div>
    </Router>
  );
}
