import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Calendar,
  Briefcase,
  Tag,
  User
} from 'lucide-react';

// Highly-polished detailed project dataset matching the 5 main projects in the portfolio
interface Project {
  id: string;
  numId: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  client: string;
  role: string;
  tags: string[];
  heroImage: string;
  story: {
    overview: string;
    challenge: string;
    execution: string;
  };
  gallery: {
    url: string;
    type: 'image' | 'video';
    caption: string;
    aspect: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  artDirectionTitle?: string;
  artDirectionDesc?: string;
  artDirectionSubDesc?: string;
}

const projectsDatabase: Record<string, Project> = {
  'ixo': {
    id: 'ixo',
    numId: '01',
    title: 'IXO ESPORTS',
    subtitle: 'A DYNAMIC DESIGN SYSTEM BUILT FOR PEAK ESPORTS PERFORMANCE',
    description: 'Engineering a vibrant, high-energy visual identity—from custom pro team jerseys to lifestyle apparel and tournament broadcast graphics—for IXO Esports.',
    year: '2023',
    client: 'IXO eSports',
    role: 'Lead Identity Designer',
    tags: ['BRANDING', 'GRAPHIC DESIGN', 'APPAREL', 'STRATEGY'],
    heroImage: '/ixo-jersey.mp4',
    story: {
      overview: 'Competing in modern esports requires a visual presence that seamlessly scales across physical apparel and digital arenas. IXO Esports needed a striking, unified brand identity capable of making an immediate impact on stage, driving merchandise sales, and providing a clean graphic framework for fast-paced social media coverage.',
      challenge: 'We developed an ultra-modern design language centered around a distinctive geometric monogram and dynamic magenta-to-violet gradients. Anchored by a custom topographic wave pattern, the identity spans custom performance jerseys, streetwear lifestyle apparel, stream overlays, and social matchday assets designed for instant recognition across all platforms.',
      execution: 'For the pro jersey and merchandise line, we engineered contrasting home/away jersey concepts featuring custom contour linework and sharp branding placements. Complementary lifestyle tees bring the core IXO mark to everyday streetwear, delivering a premium merchandise collection for fans and players alike. Across digital touchpoints, we supplied IXO with a modular broadcast and graphics asset kit. From dynamic versus-screen templates to match result graphics, every component was built for maximum speed and readability during live tournament streams.'
    },
    gallery: [
      { url: '/IXO.webp', type: 'image', caption: 'Esports logo design.', aspect: 'aspect-[16/10]' },
      { url: '/graphics3.webp', type: 'image', caption: 'Custom esports apparel design.', aspect: 'aspect-[4/3]' },
      { url: '/ixo-overview.mp4', type: 'video', caption: 'Esports jersey mockup.', aspect: 'aspect-[21/9]' },
      { url: '/ixo-clothing.webp', type: 'image', caption: 'Twitch stream branding.', aspect: 'aspect-[4/3]' },
      { url: '/ixo-gameday.webp', type: 'image', caption: 'A promotional Call of Duty "GAMEDAY" match poster from the Vixens League.', aspect: 'aspect-[16/10]' }
    ],
    testimonial: {
      quote: "The new visual identity completely transformed how our team presents itself on stream and in competition. The custom jerseys and asset kit made our content workflow ten times faster..",
      author: "IXO",
      role: "Director of Operations, IXO Gaming"
    },
    artDirectionTitle: 'Art Direction & Visual Identity',
    artDirectionDesc: 'The visual direction blends high-tech graphic architecture with organic topographic linework. Vibrant neon gradients set against deep, textured dark backgrounds create an immersive aesthetic that bridges the gap between competitive gaming gear, digital broadcasts, and modern lifestyle fashion.',
    artDirectionSubDesc: 'High-performance branding requires extreme versatility across both digital and physical touchpoints. For IXO Esports, we paired a geometric primary crest with custom topographic grid lines across home and away apparel concepts. By contrasting deep charcoal bases with vibrant neon accents, the identity delivers maximum visual impact on esports apparel, online store merchandise, and live Twitch overlays.'
  },
  'lf': {
    id: 'lf',
    numId: '02',
    title: 'LF Coaching',
    subtitle: 'Minimalist Digital Architecture for High-Performance Online Coaching',
    description: 'Fusing an austere, high-contrast user interface with seamless video loops and pristine typography to elevate high-intent client conversions.',
    year: '2026',
    client: 'LF Coaching',
    role: 'Web Design, UI/UX, Custom WordPress Development',
    tags: ['WEB DESIGN', 'UI/UX', 'DEVELOPMENT', 'MOTION'],
    heroImage: '/lf-desktop2.jpg',
    story: {
      overview: 'LF Athletic Performance required a sleek, conversion-focused web platform to scale their online gym coaching business. Operating in a crowded fitness market, the goal was to ditch generic templates and build a tailored digital experience that converts site visitors into dedicated coaching clients. We designed a high-contrast, dark-mode UI/UX that projects authority, strength, and premium value.',
      challenge: 'Online fitness platforms often suffer from cluttered layouts, confusing onboarding flows, and overwhelming information. The challenge was to simplify the client acquisition funnel—clearly presenting the "How It Works" methodology while highlighting the personal authority and credentials of the head coach without friction.',
      execution: 'To capture the intense, high-performance nature of personal coaching, we engineered a sleek, dark-mode visual hierarchy anchored by bold crimson accents and aggressive typography. Custom interactive elements—including a dynamic macro/one-rep max calculator and structured package comparison cards—give prospective clients immediate, engaging tools to evaluate their fitness goals directly on the page. Strategic conversion design was baked into every scroll depth. From clear "How It Works" step-by-step roadmaps and social proof testimonials to an integrated, low-friction application form, the layout seamlessly guides visitors from initial motivation to submitting their coaching request. The responsive grid ensures crisp contrast and effortless navigation across all mobile and desktop devices.'
    },
    gallery: [
      { url: '/LF.webp', type: 'image', caption: 'High-converting personal trainer website', aspect: 'aspect-[16/10]' },
      { url: '/ipad-mockup.webp', type: 'image', caption: 'Online coaching onboarding form.', aspect: 'aspect-[4/3]' },
      { url: '/fenners-reel.mp4', type: 'video', caption: 'Cinematic brand video reel designed to capture athlete intensity.', aspect: 'aspect-[16/9]' },
      { url: '/lf-desktop.jpg', type: 'image', caption: 'Luxury fitness website design.', aspect: 'aspect-[4/3]' },
      { url: '/iphone-lf.webp', type: 'image', caption: 'Dark mode fitness UI design.', aspect: 'aspect-[16/10]' }
    ],
    testimonial: {
      quote: "The custom site completely elevated our brand positioning. We went from looking like every other online fitness coach to a high-end, authority brand. Our onboarding conversion rate increased noticeably within weeks of launch.",
      author: "Luke Fenwick",
      role: "Founder, LF Coaching"
    },
    artDirectionTitle: 'Luxury Fitness Web Design & Onboarding UI',
    artDirectionDesc: 'High-ticket online coaching demands an interface that builds immediate trust. For LF Coaching, we developed a dark-mode web ecosystem with structured application forms, interactive client intake steps, and responsive tablet/mobile viewports. By blending clinical minimalism with luxury editorial aesthetics, the platform delivers a premium client onboarding experience optimized for high conversion rates.',
    artDirectionSubDesc: 'LF Coaching art direction showing dark-mode fitness website branding on the left and an interactive tablet onboarding form on the right.'
  },
  'avng': {
    id: 'avng',
    numId: '03',
    title: 'AVNG',
    subtitle: 'Subversive Esports Glitch Campaign Canvas',
    description: 'AVNG Esports case study header showing creative direction and glitch-inspired esports team branding.',
    year: '2025',
    client: 'AVNG eSports',
    role: 'Creative Director',
    tags: ['Esports Branding, Graphic Design, Art Direction'],
    heroImage: '/avng-banner.webp',
    story: {
      overview: 'AVNG Esports needed a raw, disruptive visual strategy rooted in underground gaming culture and digital distortion. Moving away from corporate, family-friendly esports aesthetics, we developed a high-octane glitch campaign canvas designed to capture competitive gaming audiences across live tournament streams, team jerseys, content creator kits, and social media ecosystems.',
      challenge: 'Esports orgs often struggle to cut through online noise without relying on generic mascot logos and tired gradient templates. The challenge for AVNG was to create a modular, subversive team identity that felt authentic to hardcore gaming culture while remaining commercially scalable across physical pro jerseys, digital Twitch overlays, and merch drops.',
      execution: 'As Creative Director, I engineered a high-contrast, typographic-heavy design framework powered by glitch art mechanics and industrial UI layouts. Key deliverables included:'
    },
    gallery: [
      { url: '/avng-banner.webp', type: 'image', caption: 'The main AVNG team crest layout, player apparel print keys, and tournament media graphics.', aspect: 'aspect-[16/10]' },
      { url: '/avng.gif', type: 'image', caption: 'Glitch-heavy animated loop highlighting active visual distortion.', aspect: 'aspect-[4/3]' },
      { url: '/avng-roster.mp4', type: 'video', caption: 'Esports team jersey design', aspect: 'aspect-[16/9]' },
      { url: '/defeat-avng.webp', type: 'image', caption: 'AVNG Esports active Match Day Defeat template layout.', aspect: 'aspect-[3/4]' },
      { url: '/avng-victory.webp', type: 'image', caption: 'AVNG Esports active Match Day Victory template layout.', aspect: 'aspect-[3/4]' }
    ],
    testimonial: {
      quote: "Working on our post-match graphic suite was a total breeze. We needed templates for our Call of Duty roster that were bold, easily recognizable, and fast for our media managers to update during fast-paced tournament weekends.",
      author: "LCR",
      role: "Founder"
    },
    artDirectionTitle: 'Art Direction: Systemic Failure & Digital Distortion',
    artDirectionDesc: 'Embracing intentional systemic failure and raw digital aesthetics. We engineered an interactive, glitch-heavy visual takeover that breaks conventional layout rules—integrating chromatic aberration, overlapping halftone patterns, CRT noise, and system-warning popups built for high-impact broadcast graphic environments.',
    artDirectionSubDesc: 'High-contrast neon greens, warning reds, and heavy pixelation. A chaotic yet meticulously structured layout built to subvert polite commercial designs, turning every viewport into an active street billboard.'
  },
  'oblivion': {
    id: 'oblivion',
    numId: '04',
    title: 'OBLIVION XC',
    subtitle: 'PREMIUM TACTICAL APPAREL & BRAND SYSTEM',
    description: 'Refounding a legacy UK esports organisation with a menacing brand crest, structured apparel line, and modular vector identity kits.',
    year: '2023',
    client: 'Oblivion Esports',
    role: 'Brand Strategist & Lead Designer',
    tags: ['Branding, Graphic Design, Apparel Direction'],
    heroImage: '/obn-banner.webp',
    story: {
      overview: 'Oblivion XC is an established UK esports organization competing across CS:GO and Call of Duty. Refounded to reset their visual footprint, they commissioned a complete brand transformation to reflect a clinical, tactical competitive strategy. The resulting visual language is clean, menacing, and deeply rooted in athletic lifestyle garments and high-contrast match-day media.',
      challenge: 'Most esports apparel relies on loud, over-saturated colors and chaotic sublimated prints that players feel hesitant to wear off-stage. Oblivion needed a tactical, minimalist design system that seamlessly bridged elite tournament performance wear with high-end urban streetwear while maintaining high legibility on live Twitch feeds.',
      execution: 'We engineered a stark, geometric brand crest paired with a custom monospaced utility grid system. This identity was deployed across physical performance wear, custom technical windbreakers, and modular broadcast panels. Subtle halftone patterns and fine technical vectors echo military layout aesthetics, forging an ultra-cohesive digital and physical ecosystem.'
    },
    gallery: [
      { url: '/welcome-obn.webp', type: 'image', caption: 'Roster announcement graphic template featuring tactical player cutouts, custom vector badges, and paper-texture overlays.', aspect: 'aspect-[16/9]' },
      { url: '/obn-gameday2.webp', type: 'image', caption: 'High-Disciplined Tactical Palettes', aspect: 'aspect-[16/9]' },
      { url: '/obn.mp4', type: 'video', caption: 'The Oblivion esports clinical and tactical brand experience in motion.', aspect: 'aspect-[16/9]' },
      { url: '/gameday-obn.jpg', type: 'image', caption: '"VS" Match-day announcement graphics featuring stream links, match timings, and opposing team logo placements.', aspect: 'aspect-[3/4]' },
      { url: '/gf-obn.webp', type: 'image', caption: '"GRAND FINALS" poster template featuring tactical character art, hand-drawn typography accents (#FEARTHEUNKNOWN), and stark display typography.', aspect: 'aspect-[3/4]' }
    ],
    testimonial: {
      quote: "The rebrand completely transformed how our org is perceived in the competitive scene. The match-day asset kits, roster reveal templates, and Grand Finals graphics gave our social team the ability to push out top-tier, aggressive visuals in minutes during live tournaments. Exactly the menacing, high-performance identity Oblivion needed.",
      author: "Founder",
      role: " Managing Director, Oblivion XC"
    },
    artDirectionTitle: 'Tactical Utility Meets High-Performance Esports',
    artDirectionDesc: 'Merging tactical military utility with clean competitive gaming aesthetics. We designed a menacing geometric crest alongside clean technical grid lines, formulating an elite esports team kit and matching digital broadcast overlays.',
    artDirectionSubDesc: 'Match-day "GAMEDAY!" tournament card UI designed for high-speed social media deployment and live broadcast feeds.'
  },
  'grandfps': {
    id: 'grandfps',
    numId: '05',
    title: 'GrandzieFPS',
    subtitle: 'Custom Web Design & High-Impact Digital Branding for PC Optimization Experts',
    description: 'Designing a sleek, conversion-focused web identity tailored for competitive gamers and PC performance junkies.',
    year: '2026',
    client: 'GrandFPS PC Optimiser',
    role: 'Lead Brand & Motion Designer',
    tags: ['Web Design, UI/UX, Motion Design, Brand System'],
    heroImage: '/granddesktop.webp',
    story: {
      overview: 'GrandzieFPS provides deep system-level tuning, BIOS optimization, and latency reduction for competitive gamers. However, their digital presence needed to match the precision of their technical services. The goal was to replace generic tech layouts with an aggressive, high-contrast digital experience that instills immediate trust, communicates technical expertise, and converts high-intent traffic into bookings.',
      challenge: 'We engineered a bespoke web design built around a sleek, high-tech dark mode UI powered by neon green accenting. Every section—from real-time FPS benchmark comparisons to tier pricing cards—was strategically structured to guide visitors seamlessly toward booking an optimization package or joining the Discord community.',
      execution: 'Structure and speed were prioritized across all viewports. We streamlined the tier selection architecture so users can quickly evaluate optimization packages—from fresh Windows setups to full system overhauls. Integrated Discord CTAs, responsive mobile layouts, and subtle micro-interactions ensure a frictionless conversion flow from first scroll to checkout.'
    },
    gallery: [
      { url: '/iphone-grandzie.webp', type: 'image', caption: 'FLUID MOBILE EXPERIENCE & RESPONSIVE LAYOUTS.', aspect: 'aspect-[16/10]' },
      { url: '/grand-ipad.webp', type: 'image', caption: 'DYNAMIC PRICING & INTERACTIVE TIER CARDS', aspect: 'aspect-[16/9]' },
      { url: '/grand-vid.mp4', type: 'video', caption: 'High-visibility team scoreboard and real-time live ticker layouts.', aspect: 'aspect-[16/9]' },
      { url: '/grandfps2.webp', type: 'image', caption: 'High-concept brochure graphics.', aspect: 'aspect-[1750/2480]' },
      { url: '/grand-phone.webp', type: 'image', caption: 'Mobile-first companion application and real-time match statistics view.', aspect: 'aspect-[4/3]' }
    ],
    testimonial: {
      quote: "The web design completely redefined our digital presence. It communicates pure performance from the moment a user lands on the site, turning casual site visitors into booked tuning clients and vibrant community members.",
      author: "Grand",
      role: "Founder, GrandzieFPS"
    },
    artDirectionTitle: 'Art Direction',
    artDirectionDesc: 'The visual direction leans into modern gaming tech aesthetics, utilizing grid textures, high-contrast typography, and glowing status indicators. By blending raw benchmark data with clean, dark-mode component architecture, the interface reflects the speed, stability, and zero-latency performance GrandzieFPS delivers to its clients.',
    artDirectionSubDesc: 'High-contrast neon accents, deep dark mode UI, and sharp technical typography engineered for maximum readability. Every UI element—from mobile value propositions to tablet pricing matrices—was designed to deliver a smooth, frictionless user experience across all devices.'
  },
  'tuki': {
    id: 'tuki',
    numId: '06',
    title: 'Tuki eSports',
    subtitle: 'Championship Branding, Custom Apparel Design & Tournament Visual Assets',
    description: 'Building an aggressive, high-impact visual ecosystem—from custom pro jerseys to matchday broadcast graphics—for Tuki eSports.',
    year: '2024',
    client: 'TUKI UK & Ireland',
    role: 'Lead Visual Designer & Brand Strategist',
    tags: ['BRANDING', 'GRAPHIC DESIGN', 'APPAREL'],
    heroImage: '/tukiwinners.webp',
    story: {
      overview: 'Competing at the highest level in the UK & Ireland esports scene requires more than just in-game skill; it demands a distinct, instantly recognizable brand presence. Tuki eSports needed a cohesive visual identity that could command attention across physical merch drops, streaming platforms, and social media channels during high-stakes tournament play.',
      challenge: 'We developed a full-suite visual identity anchored by custom pro team apparel, dynamic matchday graphics, and bold roster announcement templates. Utilizing an aggressive red-and-black marble color scheme, high-energy typography, and sleek 3D logo accents, the design system bridges the gap between competitive team apparel and elite digital broadcasting.',
      execution: 'For the official team jersey design, we engineered a custom marble-texture graphic featuring bold contrast piping, clean logo placement, and sharp player back-nametags. The apparel layout delivers a sleek, athletic silhouette tailored for both stage play and official fan merch stores. On the broadcast side, we created modular social media and stream asset packs—including Gameday match banners, group standing announcements, and win-state overlays. Each template was engineered for rapid editing, allowing the organization to roll out real-time tournament updates during live events without compromising visual quality.'
    },
    gallery: [
      { url: '/gameday.webp', type: 'image', caption: 'HIGH-IMPACT SOCIAL MEDIA MATCH DAY AND LINEUP GRAPHICS.', aspect: 'aspect-[16/9]' },
      { url: '/jersey-ad.webp', type: 'image', caption: 'CHAMPIONSHIP JERSEY CAMPAIGN EDITORIAL PHOTOSHOOT AND LIFESTYLE PRESENTATION.', aspect: 'aspect-[1440/1800]' },
      { url: '/tuki-video.mp4', type: 'video', caption: 'Dynamic motion graphic sequence and cinematic tournament highlights loop.', aspect: 'aspect-[16/9]' },
      { url: '/Winners-of-div7.webp', type: 'image', caption: 'Division 7 Grand Finals championship results announcement.', aspect: 'aspect-[2480/3508]' },
      { url: '/winners.webp', type: 'image', caption: 'Group Stage celebration showcase.', aspect: 'aspect-[2480/3508]' }
    ],
    testimonial: {
      quote: "The unified visual redesign transformed Tuki eSports from a competitive roster into a professional esports brand. The merchandise sold out instantly, and our visual identity is now recognized across the entire UK & Ireland championship circuit.",
      author: "Ace",
      role: "General Manager, TUKI Esports"
    },
    artDirectionTitle: 'Art Direction',
    artDirectionDesc: 'The visual direction combines raw, urban tactical textures with ultra-modern sports graphics. High-contrast typography, stylized topographic pattern work, and vibrant red accents create an intense, competitive aesthetic that highlights roster victories, game-day match-ups, and merchandise drops across every digital touchpoint.',
    artDirectionSubDesc: 'Polished monochromatic bases, high-contrast display typography, and structured grid frameworks. A highly disciplined visual system that treats gaming lifestyle apparel and digital victory graphics with the prestige of a luxury brand.'
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Resolve ID/slug to matching project (with backward compatibility)
  let cleanId = id ? id.toLowerCase() : 'ixo';
  if (cleanId === '01') cleanId = 'ixo';
  else if (cleanId === '02') cleanId = 'lf';
  else if (cleanId === '03') cleanId = 'avng';
  else if (cleanId === '04' || cleanId === 'obn') cleanId = 'oblivion';
  else if (cleanId === '05' || cleanId === 'accl') cleanId = 'grandfps';
  else if (cleanId === '06' || cleanId === 'tuki') cleanId = 'tuki';

  const project = projectsDatabase[cleanId] || projectsDatabase['ixo'];
  const isSymmetricalLayout = project.id === 'avng' || project.id === 'oblivion';

  // Lightbox State
  const [activeMedia, setActiveMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null);

  // Custom Video Player State
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll growth effect for first video/image (Hero Media)
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroScrollRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1.0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);

  // Auto Scroll to Top on Project Switch
  useEffect(() => {
    const scrollToTop = () => {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    scrollToTop();
    // Double check with a short delay to account for dynamic content rendering
    const timer = setTimeout(scrollToTop, 50);

    setIsVideoPlaying(true);
    setIsVideoMuted(true);

    return () => clearTimeout(timer);
  }, [cleanId]);

  // Handle Video Play Toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => { });
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Handle Video Mute Toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Determine Next Project in Sequence for Carousel Loop
  const projectKeys = Object.keys(projectsDatabase);
  const currentIndex = projectKeys.indexOf(cleanId);
  const nextIndex = (currentIndex + 1) % projectKeys.length;
  const nextId = projectKeys[nextIndex];
  const nextProject = projectsDatabase[nextId];

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const lineScale = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black pt-28 md:pt-36 overflow-hidden">

      {/* Back button */}
      <div className="px-6 md:px-12 mb-10">
        <Link
          to="/work"
          className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 duration-300" />
          BACK TO PORTFOLIO GRID
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        {/* TITLE BLOCK */}
        <div className="px-6 md:px-12 mb-16">
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs md:text-sm tracking-[0.3em] text-neutral-400 mb-4 block uppercase font-medium"
          >
            CASE STUDY — {project.numId} / 05
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-8 leading-[0.95]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl lg:text-2xl font-sans text-neutral-300 max-w-4xl tracking-tight leading-relaxed mb-12 font-medium"
          >
            {project.subtitle}
          </motion.p>

          {/* SPECIFICATIONS GRID */}
          <motion.div variants={lineScale} className="w-full h-[1px] bg-neutral-800 origin-left my-8" />

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-4"
          >
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> CLIENT
              </span>
              <p className="font-mono text-xs font-medium text-white tracking-wider uppercase">{project.client}</p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> SERVICES
              </span>
              <div className="flex flex-col gap-1">
                {project.tags.slice(0, 2).map(tag => (
                  <p key={tag} className="font-mono text-xs font-medium text-white tracking-wider uppercase">{tag}</p>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> ROLE
              </span>
              <p className="font-mono text-xs font-medium text-white tracking-wider uppercase">{project.role}</p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> YEAR
              </span>
              <p className="font-mono text-xs font-medium text-white tracking-wider uppercase">{project.year}</p>
            </div>
          </motion.div>

          <motion.div variants={lineScale} className="w-full h-[1px] bg-neutral-800 origin-left mt-8 mb-16" />
        </div>

        {/* HERO MEDIA */}
        <div ref={heroScrollRef} className="w-full px-0 md:px-6 mb-16 md:mb-24">
          <motion.div
            style={{ scale, ...(project.id === 'tuki' ? { aspectRatio: '1500/500' } : {}) }}
            className="relative w-full aspect-video md:aspect-[21/9] bg-neutral-950 overflow-hidden group shadow-2xl"
          >
            {project.heroImage.endsWith('.mp4') ? (
              <motion.video
                style={{ scale: imageScale }}
                src={project.heroImage}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover origin-center"
              />
            ) : (
              <motion.img
                style={{ scale: imageScale }}
                src={project.heroImage}
                alt={project.title}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="w-full h-full object-cover origin-center"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Aspect tag and project name in bottom left */}
            <div className="absolute bottom-6 left-6 md:left-12 flex items-center gap-4 text-white font-mono text-[10px] tracking-widest uppercase bg-black/60 backdrop-blur-md px-4 py-2 border border-white/15">
              <span>{project.title} OVERVIEW</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>

        {/* EDITORIAL NARRATIVE SECTION */}
        <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24 md:mb-36">
          <div className="lg:col-span-5 space-y-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold block">
              THE DESIGN STRATEGY
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight leading-tight">
              Forging a Next-Gen Esports Brand & Apparel Ecosystem
            </h2>
            <div className="p-8 border-l-2 border-white bg-neutral-900/20 backdrop-blur-md space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase block">CORE INSIGHT</span>
              <p className="font-mono text-xs md:text-sm text-white font-medium leading-relaxed uppercase tracking-wider">
                &ldquo;{project.description}&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest text-neutral-400 uppercase font-semibold">01 / PROJECT OVERVIEW</h3>
              <p className="font-sans text-base md:text-lg text-neutral-300 leading-relaxed font-light">
                {project.story.overview}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest text-neutral-400 uppercase font-semibold">02 / THE CHALLENGE</h3>
              <p className="font-sans text-base md:text-lg text-neutral-300 leading-relaxed font-light">
                {project.story.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest text-neutral-400 uppercase font-semibold">03 / THE EXECUTION & DESIGN</h3>
              <p className="font-sans text-base md:text-lg text-neutral-300 leading-relaxed font-light">
                {project.story.execution}
              </p>
            </div>
          </div>
        </div>

        {/* HIGH-RESOLUTION ASYMMETRICAL INTERACTIVE GALLERY */}
        <div className="px-6 md:px-12 mb-24 md:mb-36">
          <div className="mb-16">
            <h2 id="art-direction-heading" className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white mb-6">
              {project.artDirectionTitle || 'Art Direction'}
            </h2>
            <p className="font-mono text-xs md:text-sm text-neutral-400 max-w-3xl leading-relaxed">
              {project.artDirectionDesc}
            </p>
          </div>

          <div className="space-y-12 md:space-y-20">

            {/* Gallery Layout Item 1: Symmetrical 2-col for avng/obn, asymmetric for others */}
            <div className={isSymmetricalLayout ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start" : "grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"}>
              <div className={isSymmetricalLayout ? "flex flex-col justify-between" : "md:col-span-7 flex flex-col justify-between"}>
                <div
                  className={`gallery-grid-item group ${project.gallery[0].aspect || (isSymmetricalLayout ? (project.id === 'oblivion' ? 'aspect-[16/9]' : 'aspect-[4/3]') : 'aspect-[4/3]')}`}
                  style={project.gallery[0].aspect && project.gallery[0].aspect.includes('/') ? { aspectRatio: project.gallery[0].aspect.replace('aspect-[', '').replace(']', '') } : undefined}
                  onClick={() => setActiveMedia({ url: project.gallery[0].url, type: project.gallery[0].type || 'image' })}
                >
                  {project.gallery[0].type === 'video' ? (
                    <video
                      src={project.gallery[0].url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="gallery-grid-media group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={project.gallery[0].url}
                      alt={project.gallery[0].caption}
                      loading="lazy"
                      decoding="async"
                      className="gallery-grid-media group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
                  </div>
                </div>
                <div className="figure-caption">
                  <span></span>
                  <span>{project.gallery[0].caption}</span>
                </div>
              </div>

              <div className={isSymmetricalLayout ? "flex flex-col justify-between" : "md:col-span-5 flex flex-col justify-between"}>
                <div>
                  <div
                    className={`gallery-grid-item group ${project.gallery[1].aspect || (isSymmetricalLayout ? (project.id === 'oblivion' ? 'aspect-[16/9]' : 'aspect-[4/3]') : 'aspect-square')}`}
                    style={project.gallery[1].aspect && project.gallery[1].aspect.includes('/') ? { aspectRatio: project.gallery[1].aspect.replace('aspect-[', '').replace(']', '') } : undefined}
                    onClick={() => setActiveMedia({ url: project.gallery[1].url, type: project.gallery[1].type || 'image' })}
                  >
                    {project.gallery[1].type === 'video' ? (
                      <video
                        src={project.gallery[1].url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="gallery-grid-media group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={project.gallery[1].url}
                        alt={project.gallery[1].caption}
                        loading="lazy"
                        decoding="async"
                        className="gallery-grid-media group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
                    </div>
                  </div>
                  <div className="figure-caption">
                    <span></span>
                    <span>{project.gallery[1].caption}</span>
                  </div>
                </div>

                {/* Under-image paragraph matching screenshot style */}
                {project.artDirectionSubDesc && (
                  <div className="mt-8 font-mono text-xs md:text-sm text-neutral-400 leading-relaxed">
                    {project.artDirectionSubDesc}
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Layout Item 2: Fully Custom Video / Panoramic Media Section */}
            {project.gallery.some(item => item.type === 'video') ? (
              <div className="w-full border border-neutral-800 p-4 md:p-8 bg-neutral-950/40 rounded-sm">
                <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={project.gallery.find(item => item.type === 'video')?.url}
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />

                  {/* Custom Player Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 opacity-100 transition-opacity duration-300">
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/70 border border-neutral-800 font-mono text-[10px] tracking-widest text-white uppercase rounded-full">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                      <span>ACTIVE PLAYBACK WORK SAMPLE</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                      {/* Play / Pause */}
                      <button
                        onClick={togglePlay}
                        className="flex items-center gap-2.5 px-5 py-2.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors duration-300 rounded-full cursor-none pointer-events-auto"
                      >
                        {isVideoPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-black" /> PAUSE STREAM
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-black" /> RESUME STREAM
                          </>
                        )}
                      </button>

                      {/* Mute / Unmute */}
                      <button
                        onClick={toggleMute}
                        className="p-3 bg-black/60 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-none pointer-events-auto"
                      >
                        {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                  <span>{(project.id === 'grandfps' || project.id === 'tuki') ? 'FIGURE 01.03 — ULTRA-WIDE LANDSCAPE EXHIBIT' : 'SPECIFICATION LOOP 02.01'}</span>
                  <span>{project.gallery.find(item => item.type === 'video')?.caption}</span>
                </div>
              </div>
            ) : (
              /* Panoramic alternative image layout if project lacks a direct video stream */
              !isSymmetricalLayout ? (
                <div className="w-full flex flex-col justify-between">
                  <div
                    className="gallery-grid-item group aspect-[21/9]"
                    onClick={() => setActiveMedia({ url: project.gallery[2]?.url || project.heroImage, type: 'image' })}
                  >
                    <img
                      src={project.gallery[2]?.url || project.heroImage}
                      alt="Panoramic Showcase"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover scale-[1.01] transition-transform duration-[4000ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
                    </div>
                  </div>
                  <div className="figure-caption">
                    <span>FIGURE 01.03 — ULTRA-WIDE LANDSCAPE EXHIBIT</span>
                    <span>{project.gallery[2]?.caption || 'Full stadium banner projection mockup.'}</span>
                  </div>
                </div>
              ) : null
            )}

            {/* Gallery Layout Item 3: Balanced 50/50 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {project.gallery.slice(3).map((item, index) => (
                <div key={item.url + index} className="flex flex-col">
                  <div
                    className={`gallery-grid-item group ${item.aspect || 'aspect-[4/3]'}`}
                    style={item.aspect && item.aspect.includes('/') ? { aspectRatio: item.aspect.replace('aspect-[', '').replace(']', '') } : undefined}
                    onClick={() => setActiveMedia({ url: item.url, type: item.type || 'image' })}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="gallery-grid-media group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.caption}
                        loading="lazy"
                        decoding="async"
                        className="gallery-grid-media group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
                    </div>
                  </div>
                  <div className="figure-caption">
                    <span>FIGURE 01.0{index + 4}</span>
                    <span>{item.caption}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* CLIENT TESTIMONIAL SECTION */}
        <div className="px-6 md:px-12 py-24 md:py-36 border-y border-neutral-900 bg-neutral-950/20 backdrop-blur-sm mb-24 md:mb-36">
          <div className="max-w-4xl mx-auto space-y-10">
            <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> CLIENT SATISFACTION VERDICT
            </span>

            <div className="relative">
              {/* Giant quotation marks styled editorially */}
              <span className="absolute -top-16 -left-8 md:-left-16 text-white/5 text-[15rem] font-serif leading-none select-none pointer-events-none">&ldquo;</span>

              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white tracking-tight leading-relaxed relative z-10 italic">
                {project.testimonial.quote}
              </blockquote>
            </div>

            <div className="pt-4 flex items-center gap-5">
              <div className="w-12 h-[1px] bg-white/40"></div>
              <div>
                <cite className="font-mono text-xs font-bold uppercase tracking-widest text-white not-italic block">
                  {project.testimonial.author}
                </cite>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1 block">
                  {project.testimonial.role} &mdash; {project.client}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEE MORE / NEXT PROJECT LINK FOOTER BLOCK */}
        <div className="px-6 md:px-12 pb-24 md:pb-36">
          <div className="w-full h-[1px] bg-neutral-900 mb-16"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase font-medium">STAY IN THE CYCLE</span>
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mt-1">Explore Next Work</h2>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono text-xs uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2 border-b border-white/20 pb-1.5 cursor-none"
            >
              SCROLL BACK TO TOP &uarr;
            </button>
          </div>

          {/* Huge interactive Card for the Next Project */}
          <Link
            to={`/work/${nextProject.id}`}
            className="group block relative w-full aspect-video md:aspect-[21/9] bg-neutral-950 overflow-hidden border border-neutral-900 rounded-sm"
          >
            {/* Background Image/Video of Next Project */}
            {nextProject.heroImage.endsWith('.mp4') ? (
              <video
                src={nextProject.heroImage}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105 opacity-40 group-hover:opacity-75"
              />
            ) : (
              <img
                src={nextProject.heroImage}
                alt={nextProject.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105 opacity-40 group-hover:opacity-75"
              />
            )}

            {/* Smooth Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
                  UP NEXT &mdash; CASE STUDY {nextProject.numId}
                </span>
              </div>

              <div className="max-w-2xl space-y-4">
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                  {nextProject.title}
                </h3>
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider line-clamp-2 leading-relaxed">
                  {nextProject.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs font-mono uppercase tracking-widest font-bold text-white group-hover:text-[#194896] transition-colors duration-300">
                  ENGAGE CASE STUDY <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2 duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </div>

      </motion.div>

      {/* PORTAL LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col justify-center items-center p-4 md:p-8 cursor-zoom-out"
            onClick={() => setActiveMedia(null)}
          >
            {/* Top Close bar */}
            <div className="absolute top-6 left-0 right-0 px-6 md:px-12 flex justify-between items-center text-white z-10">
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">INSPECTING ASSET &mdash; PRESS ANYWHERE TO ESCAPE</span>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full transition-colors cursor-none text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Container */}
            <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center">
              {activeMedia.type === 'video' ? (
                <video
                  src={activeMedia.url}
                  autoPlay
                  loop
                  controls
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <img
                  src={activeMedia.url}
                  alt="Expanded Showcase"
                  className="max-w-full max-h-full object-contain select-none"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
