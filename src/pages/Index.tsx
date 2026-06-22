import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

// --- ORTAK: 2D ETKİLEŞİMLİ VEKTÖR BİLEŞENİ ---
const FloatingElement = ({ children, delay = 0, duration = 4, className, hoverScale = 1.15 }: any) => {
  return (
    <motion.div
      className={`absolute select-none pointer-events-auto cursor-pointer ${className}`}
      animate={{ 
        y: ["-15px", "15px", "-15px"],
        rotate: [-2, 2, -2]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: duration, 
        delay: delay, 
        ease: "easeInOut" 
      }}
      whileHover={{ scale: hoverScale, rotate: 0 }}
    >
      {children}
    </motion.div>
  );
};

// --- SECTION 1: RUBİK KÜP VEKTÖRÜ ---
const VectorRubiksCube = ({ className, rotation = "-10deg" }: { className?: string, rotation?: string }) => (
  <div 
    className={`grid grid-cols-3 gap-[2px] sm:gap-1 p-1 sm:p-[6px] bg-[#111] rounded-md sm:rounded-lg shadow-xl ${className}`} 
    style={{ transform: `rotate(${rotation})` }}
  >
    <div className="bg-[#E86A33] aspect-square rounded-[2px] sm:rounded-sm"></div>
    <div className="bg-white aspect-square rounded-[2px] sm:rounded-sm"></div>
    <div className="bg-[#FFB800] aspect-square rounded-[2px] sm:rounded-sm"></div>
    <div className="bg-[#00E5FF] aspect-square rounded-[2px] sm:rounded-sm"></div>
    <div className="bg-[#10B981] aspect-square rounded-[2px] sm:rounded-sm"></div>
    <div className="bg-[#E86A33] aspect-square rounded-[2px] sm:rounded-sm"></div>
    <div className="bg-[#FFB800] aspect-square rounded-[2px] sm:rounded-sm"></div>
    <div className="bg-[#8B5CF6] aspect-square rounded-[2px] sm:rounded-sm"></div>
    <div className="bg-white aspect-square rounded-[2px] sm:rounded-sm"></div>
  </div>
);

// --- SECTION 3: PROFESYONEL SVG MÜZİK VEKTÖRLERİ ---
const VectorPiano = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg width="140" height="70" viewBox="0 0 120 60" className={`drop-shadow-2xl ${className}`} style={{ transform: `rotate(${rotation})` }}>
    <rect x="0" y="0" width="120" height="60" rx="4" fill="#ffffff" />
    {[20,40,60,80,100].map(x => <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#d1d5db" strokeWidth="2"/>)}
    {[12, 32, 72, 92].map(x => <rect key={x} x={x} y="0" width="16" height="35" rx="2" fill="#111827" />)}
  </svg>
);

const VectorDrum = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg width="100" height="100" viewBox="0 0 100 100" className={`drop-shadow-2xl ${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M10 30 C 10 10, 90 10, 90 30 L 90 70 C 90 90, 10 90, 10 70 Z" fill="#F6E254" />
    <ellipse cx="50" cy="30" rx="40" ry="15" fill="#ffffff" />
    <path d="M 10 30 L 30 70 M 30 30 L 50 70 M 50 30 L 70 70 M 70 30 L 90 70" stroke="#ffffff" strokeWidth="4" opacity="0.6"/>
    <path d="M10 30 C 10 50, 90 50, 90 30" fill="none" stroke="#eab308" strokeWidth="3"/>
  </svg>
);

const VectorNotes = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg width="90" height="90" viewBox="0 0 100 100" className={`drop-shadow-lg ${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M30 70 C 20 70, 15 75, 15 80 C 15 85, 20 90, 30 90 C 40 90, 45 85, 45 80 L 45 30 L 85 20 L 85 65 C 75 65, 70 70, 70 75 C 70 80, 75 85, 85 85 C 95 85, 100 80, 100 75 L 100 10 L 40 20 Z" fill="#ffffff" />
  </svg>
);

const VectorGuitar = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg width="110" height="110" viewBox="0 0 100 100" className={`drop-shadow-2xl ${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M45 5 L 55 5 L 55 45 L 45 45 Z" fill="#374151" />
    <path d="M30 45 C 10 45, 10 70, 30 70 C 25 80, 30 95, 50 95 C 70 95, 75 80, 70 70 C 90 70, 90 45, 70 45 Z" fill="#F6E254" />
    <circle cx="50" cy="70" r="12" fill="#1f2937" />
    <rect x="46" y="2" width="8" height="10" fill="#F6E254" rx="2" />
    <line x1="48" y1="12" x2="48" y2="70" stroke="#ffffff" strokeWidth="1.5" />
    <line x1="52" y1="12" x2="52" y2="70" stroke="#ffffff" strokeWidth="1.5" />
  </svg>
);

// --- ANA SAYFA BİLEŞENİ ---
const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 
      if (isScrolling.current || Math.abs(e.deltaY) < 20) return;
      isScrolling.current = true;
      setCurrentSection((prev) => e.deltaY > 0 ? Math.min(prev + 1, 2) : Math.max(prev - 1, 0)); 
      scrollTimeout = setTimeout(() => { isScrolling.current = false; }, 750);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        isScrolling.current = true;
        setCurrentSection((prev) => deltaY > 0 ? Math.min(prev + 1, 2) : Math.max(prev - 1, 0));
        scrollTimeout = setTimeout(() => { isScrolling.current = false; }, 750);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden font-satoshi text-white bg-black">
      <motion.div
        className="w-full h-[300dvh] flex flex-col"
        animate={{ y: `-${currentSection * 100}dvh` }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }} 
      >
        
        {/* SECTION 1 - MOR TEMA */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme1-bg overflow-hidden text-theme1-text selection:bg-white/30">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
             <FloatingElement className="top-[12%] left-[8%] md:top-[15%] md:left-[10%]" delay={0} duration={5} hoverScale={1.1}>
               <VectorRubiksCube className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 opacity-90" rotation="-12deg" />
             </FloatingElement>
             <FloatingElement className="bottom-[15%] right-[8%] md:bottom-[15%] md:right-[10%]" delay={1.5} duration={6} hoverScale={1.1}>
               <VectorRubiksCube className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-90" rotation="15deg" />
             </FloatingElement>
             <FloatingElement className="bottom-[10%] left-[15%] md:bottom-[20%] md:left-[15%]" delay={0.8} duration={4.5} hoverScale={1.1}>
               <VectorRubiksCube className="w-12 h-12 sm:w-16 sm:h-16 opacity-70" rotation="-25deg" />
             </FloatingElement>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 0 ? "visible" : "hidden"} className="w-full pointer-events-auto">
              {/* Standart Başlık Boyutları */}
              <motion.h1 variants={itemVariant} className="text-[10vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black tracking-tight mb-2 drop-shadow-lg leading-none break-words">Selam.</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[60px] font-black tracking-tight mb-8 leading-none"> <br className="md:hidden" />geliştiricisi</motion.h2>
              <motion.p variants={itemVariant} className="text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white">Eğitim teknolojileri üzerine alışılagelmişin dışında uygulamalar geliştiriyorum. Amacım, öğrenme süreçlerini sıkıcı ezber kalıplarından kurtararak teknolojinin sunduğu imkanlarla interaktif bir hale getirmek.</motion.p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 - MERCAN TEMA */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme2-bg overflow-hidden text-white selection:bg-white/30">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <FloatingElement className="top-[20%] right-[20%] text-[10vw] sm:text-7xl font-black opacity-90 drop-shadow-lg" delay={0} duration={4}>5</FloatingElement>
            <FloatingElement className="bottom-[25%] left-[15%] text-[12vw] sm:text-[80px] font-black opacity-90 drop-shadow-lg" delay={1.5} duration={5}>
              2<sup className="text-[4vw] sm:text-3xl lg:text-4xl">3</sup> {/* Üs fontu küçültüldü */}
            </FloatingElement>
            <FloatingElement className="top-[25%] left-[20%] text-[8vw] sm:text-6xl text-theme2-shape font-black drop-shadow-md" delay={2} duration={4.5}>×</FloatingElement>
            <FloatingElement className="bottom-[20%] right-[25%] text-[10vw] sm:text-7xl text-theme2-shape font-black drop-shadow-md" delay={0.5} duration={6}>+</FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 1 ? "visible" : "hidden"} className="w-full pointer-events-auto">
              {/* Standart Başlık Boyutları */}
              <motion.h1 variants={itemVariant} className="text-[10vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black tracking-tight mb-2 drop-shadow-lg leading-none break-words">Oyunlaştırılmış</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[60px] font-black text-theme2-shape tracking-tight mb-8 leading-none">özel ürünler</motion.h2>
              <motion.p variants={itemVariant} className="text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white">İngilizce, müzik, bilişim teknolojileri, matematik ve yaratıcı kodlama alanlarında prototipler tasarlıyorum. Sıradan arayüzlerin aksine akılda kalıcı, sade ama etkileşimli metotları tercih ediyorum.</motion.p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 - YEŞİL/TEAL TEMA */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme3-bg overflow-hidden text-theme3-title selection:bg-theme3-shape/40">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <FloatingElement className="top-[15%] left-[8%] md:top-[20%] md:left-[12%]" delay={0.5} duration={6} hoverScale={1.1}>
               <VectorPiano rotation="-15deg" />
            </FloatingElement>
            <FloatingElement className="bottom-[25%] left-[10%] md:bottom-[20%] md:left-[20%]" delay={1.5} duration={4} hoverScale={1.2}>
               <VectorNotes rotation="10deg" />
            </FloatingElement>
            <FloatingElement className="top-[25%] right-[10%] md:top-[20%] md:right-[15%]" delay={0.8} duration={5.5} hoverScale={1.15}>
               <VectorDrum rotation="20deg" />
            </FloatingElement>
            <FloatingElement className="bottom-[15%] right-[12%] md:bottom-[20%] md:right-[22%]" delay={2} duration={5} hoverScale={1.1}>
               <VectorGuitar rotation="-25deg" />
            </FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 2 ? "visible" : "hidden"} className="w-full pointer-events-auto">
              {/* Standart Başlık Boyutları */}
              <motion.h1 variants={itemVariant} className="text-[10vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black tracking-tight mb-2 drop-shadow-md leading-none break-words text-theme3-title">Mikro Seviyede</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[60px] font-black text-theme3-shape tracking-tight mb-8 leading-none drop-shadow-sm">öğrenme</motion.h2>
              <motion.p variants={itemVariant} className="text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white">Geliştirdiğim ürünler genelde mikro seviyede kavramların öğrenilmesi üzerine kurulu yaratıcı örneklerdir. Kullanıcının kafasının karışmaması adına ürünlerimi minimal ölçütte tutmayı tercih ediyorum.</motion.p>
            </motion.div>
          </div>
        </section>

      </motion.div>
    </div>
  );
};

export default Index;