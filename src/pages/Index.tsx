import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

// --- YENİ NESİL ETKİLEŞİMLİ VEKTÖR (Çarpışma/Patlama Önleyici İç İçe Katman Mimarisi) ---
const FloatingElement = ({ children, delay = 0, duration = 4, className, hoverProps = { scale: 1.15, rotateX: 15, rotateY: 15 }, disableTap = false, isBlurred = false, animationType = "float", isMobile = false }: any) => {
  let animateProps: any = {};
  let transitionProps: any = {};

  if (animationType === "float") {
    animateProps = { y: ["-20px", "20px", "-20px"], x: ["-10px", "10px", "-10px"], rotate: [-4, 4, -4] };
    transitionProps = { repeat: Infinity, duration: duration, delay: delay, ease: "easeInOut" };
  } else if (animationType === "orbit") {
    animateProps = { x: ["0px", "50px", "0px", "-50px", "0px"], y: ["0px", "30px", "60px", "30px", "0px"], rotate: [-5, 10, 0, -10, -5] };
    transitionProps = { repeat: Infinity, duration: duration, delay: delay, ease: "easeInOut" };
  } else if (animationType === "drift") {
    animateProps = { x: ["-30px", "30px", "-30px"], y: ["-20px", "20px", "-20px"], rotate: [-10, 10, -10] };
    transitionProps = { repeat: Infinity, duration: duration, delay: delay, ease: "easeInOut" };
  } else if (animationType === "balloon") {
    animateProps = { y: ["120vh", "-120vh"], x: ["-15px", "15px", "-15px"], rotate: [-5, 5, -5] };
    transitionProps = {
      y: { repeat: Infinity, duration: duration * 2.5, ease: "linear", delay: delay },
      x: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: delay },
      rotate: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: delay }
    };
  }

  return (
    // DIŞ KATMAN: Sadece havada süzülme (orbit, drift, balloon) animasyonunu üstlenir.
    <motion.div
      className={`absolute pointer-events-none ${className} ${isBlurred ? 'opacity-30 sm:opacity-50 sm:blur-[3px]' : 'z-20'}`}
      animate={animateProps}
      transition={transitionProps}
      style={{ willChange: "transform" }}
    >
      {/* İÇ KATMAN: Sadece Fare Etkileşimlerini (Hover/Drag) üstlenir. Böylece animasyonlar çakışıp "patlamaz". */}
      <motion.div
        drag={!isMobile} 
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        dragElastic={0.1}
        className={`w-full h-full pointer-events-auto flex items-center justify-center ${!isBlurred ? 'drop-shadow-lg sm:drop-shadow-2xl' : ''} ${!isMobile && "cursor-grab active:cursor-grabbing"}`}
        whileHover={!isMobile ? hoverProps : {}}
        whileTap={!isMobile && !disableTap ? { scale: 0.9, cursor: "grabbing" } : (!isMobile ? { cursor: "grabbing" } : {})}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- SECTION 1: NETWORK, ZEKA & EĞİTİM VEKTÖRLERİ ---

const NetworkBackground = () => (
  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10%" y1="20%" x2="30%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
    <line x1="30%" y1="50%" x2="60%" y2="30%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
    <line x1="60%" y1="30%" x2="80%" y2="70%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
    <line x1="30%" y1="50%" x2="20%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
    <line x1="60%" y1="30%" x2="85%" y2="15%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
    
    <circle cx="10%" cy="20%" r="4" fill="white" />
    <circle cx="30%" cy="50%" r="6" fill="#FFB800" />
    <circle cx="60%" cy="30%" r="5" fill="white" />
    <circle cx="80%" cy="70%" r="4" fill="white" />
    <circle cx="20%" cy="80%" r="5" fill="#E86A33" />
    <circle cx="85%" cy="15%" r="3" fill="white" />
  </svg>
);

const VectorPawn = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 120" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M 20 110 Q 50 120 80 110 L 75 95 Q 50 100 25 95 Z" fill="#E86A33" />
    <path d="M 25 95 Q 50 100 75 95 L 70 85 Q 50 90 30 85 Z" fill="#D25B2A" />
    <path d="M 35 85 Q 25 50 40 40 L 60 40 Q 75 50 65 85 Z" fill="#FFFFFF" />
    <path d="M 35 85 Q 25 50 40 40 L 50 40 Q 60 50 55 85 Z" fill="#F3F4F6" /> 
    <path d="M 30 45 Q 50 50 70 45 L 65 35 Q 50 40 35 35 Z" fill="#E86A33" />
    <circle cx="50" cy="22" r="18" fill="#FFFFFF" />
    <circle cx="45" cy="18" r="14" fill="#F3F4F6" />
    {/* Gözler ve Kırpma Efekti */}
    <g className="eye">
      <ellipse cx="43" cy="20" rx="3" ry="4.5" fill="#111" />
      <ellipse cx="57" cy="20" rx="3" ry="4.5" fill="#111" />
      <circle cx="42" cy="19" r="1.2" fill="#FFF" />
      <circle cx="56" cy="19" r="1.2" fill="#FFF" />
    </g>
  </svg>
);

const VectorQueen = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 80 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M10 30 L25 50 L40 20 L55 50 L70 30 L65 80 L15 80 Z" fill="#ffffff" />
    <path d="M15 80 L40 50 L65 80 Z" fill="#F3F4F6" /> 
    <circle cx="10" cy="25" r="6" fill="#FFB800" />
    <circle cx="40" cy="15" r="7" fill="#FFB800" />
    <circle cx="70" cy="25" r="6" fill="#FFB800" />
    <rect x="10" y="80" width="60" height="10" rx="4" fill="#8B5CF6" />
    <rect x="20" y="70" width="40" height="5" rx="2" fill="#E86A33" />
    {/* Gözler ve Kırpma Efekti (Gecikmeli) */}
    <g className="eye-delay">
      <ellipse cx="32" cy="55" rx="3" ry="4.5" fill="#111" />
      <ellipse cx="48" cy="55" rx="3" ry="4.5" fill="#111" />
      <circle cx="31" cy="54" r="1.2" fill="#FFF" />
      <circle cx="47" cy="54" r="1.2" fill="#FFF" />
    </g>
  </svg>
);

const VectorKnight = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 120" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M 20 110 Q 50 120 80 110 L 75 95 Q 50 100 25 95 Z" fill="#E86A33" />
    <path d="M 25 95 Q 50 100 75 95 L 70 85 Q 50 90 30 85 Z" fill="#D25B2A" />
    {/* Gerçekçi At Formu */}
    <path d="M 70 85 L 30 85 C 30 65 20 55 15 45 C 10 35 15 25 25 25 C 40 25 50 15 55 15 C 65 15 80 40 70 85 Z" fill="#FFFFFF" />
    <path d="M 55 15 C 65 25 75 45 70 70" stroke="#FFB800" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
    <path d="M 70 85 C 80 40 60 15 55 15 C 65 25 70 50 60 85 Z" fill="#F3F4F6" />
    {/* Burun/Ağız Bölgesi */}
    <path d="M 15 45 C 5 50 10 65 20 65 C 25 65 30 55 25 45 Z" fill="#E5E7EB" />
    {/* Kulaklar */}
    <path d="M 45 15 L 40 5 L 50 12 Z" fill="#FFFFFF" stroke="#E5E7EB" />
    <path d="M 50 12 L 55 2 L 60 15 Z" fill="#E5E7EB" />
    {/* Gözler (3/4 Açılı Çift Göz) */}
    <g className="eye">
      <ellipse cx="34" cy="30" rx="3" ry="4.5" fill="#111" />
      <ellipse cx="44" cy="30" rx="3" ry="4.5" fill="#111" />
      <circle cx="33" cy="29" r="1.2" fill="#FFF" />
      <circle cx="43" cy="29" r="1.2" fill="#FFF" />
    </g>
    {/* Burun Delikleri */}
    <circle cx="15" cy="55" r="1.5" fill="#D25B2A" />
    <circle cx="21" cy="57" r="1.5" fill="#D25B2A" />
  </svg>
);

const VectorBrain = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 80" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    {/* Anatomiye Uygun Lateral Beyin */}
    <path d="M 20 45 C 15 25 30 10 50 10 C 75 10 90 25 85 45 C 80 65 65 70 50 70 C 30 70 25 60 20 45 Z" fill="#FFB800" />
    <path d="M 20 45 C 15 25 30 10 50 10 C 75 10 90 25 85 45 C 80 65 65 70 50 70 C 30 70 25 60 20 45 Z" fill="#F59E0B" transform="scale(0.9) translate(5, 4)" />
    {/* Serebellum (Beyincik) */}
    <path d="M 65 65 C 80 65 85 80 70 80 C 60 80 55 70 65 65 Z" fill="#D97706" />
    {/* Beyin Sapı */}
    <path d="M 45 65 L 45 85 C 45 95 55 95 55 85 L 55 65 Z" fill="#B45309" />
    {/* Sulci / Kıvrımlar */}
    <path d="M 35 15 C 40 30 35 50 45 60 M 50 12 C 55 30 50 50 60 60 M 65 18 C 65 35 75 45 70 60 M 25 35 C 35 30 45 35 55 30" stroke="#B45309" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M 30 20 C 40 15 50 15 60 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
  </svg>
);

const VectorPuzzle = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M20 20 L40 20 C40 10 60 10 60 20 L80 20 L80 40 C90 40 90 60 80 60 L80 80 L60 80 C60 90 40 90 40 80 L20 80 L20 60 C10 60 10 40 20 40 Z" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="4"/>
    <path d="M25 25 L35 25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

// --- SECTION 2: BALON VEKTÖRÜ ---
const VectorBalloon = ({ children, className, color = "#F2B8D1", rotation = "0deg" }: any) => (
  <div className={`flex flex-col items-center ${className}`} style={{ transform: `rotate(${rotation})` }}>
     <div className="relative w-full">
       <svg viewBox="0 0 80 100" className="w-full h-auto z-10 drop-shadow-lg block">
          <path d="M40 0 C 10 0, 0 30, 0 50 C 0 80, 30 90, 40 95 C 50 90, 80 80, 80 50 C 80 30, 70 0, 40 0 Z" fill={color} />
          <path d="M35 95 L45 95 L40 100 Z" fill={color} />
          <ellipse cx="22" cy="28" rx="6" ry="14" fill="white" opacity="0.3" transform="rotate(-25 22 28)" />
       </svg>
       <div className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[#E34542] z-20 font-black drop-shadow-sm flex items-center justify-center w-full">
          {children}
       </div>
     </div>
     <div className="w-[2px] h-12 sm:h-20 bg-white/50 -mt-1 z-0"></div>
  </div>
);

// --- SECTION 3: MÜZİK VEKTÖRLERİ ---
const VectorPiano = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg width="140" height="70" viewBox="0 0 120 60" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <rect x="0" y="0" width="120" height="60" rx="4" fill="#ffffff" />
    <rect x="0" y="55" width="120" height="5" rx="2" fill="#e5e7eb" /> 
    {[20,40,60,80,100].map(x => <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#d1d5db" strokeWidth="2"/>)}
    {[12, 32, 72, 92].map(x => (
      <g key={x}>
        <rect x={x} y="0" width="16" height="35" rx="2" fill="#111827" />
        <rect x={x+2} y="0" width="12" height="32" rx="1" fill="#374151" /> 
      </g>
    ))}
  </svg>
);

const VectorDrum = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg width="100" height="100" viewBox="0 0 100 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M10 30 C 10 10, 90 10, 90 30 L 90 70 C 90 90, 10 90, 10 70 Z" fill="#FFE24A" />
    <path d="M10 30 C 10 10, 90 10, 90 30 L 90 70 C 90 90, 10 90, 10 70 Z" fill="black" opacity="0.1" /> 
    <ellipse cx="50" cy="30" rx="40" ry="15" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
    <path d="M 10 30 L 30 70 M 30 30 L 50 70 M 50 30 L 70 70 M 70 30 L 90 70" stroke="#ffffff" strokeWidth="4" opacity="0.7"/>
    <line x1="20" y1="5" x2="60" y2="40" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="20" cy="5" rx="4" ry="4" fill="#D97706" />
    <line x1="80" y1="5" x2="40" y2="40" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="80" cy="5" rx="4" ry="4" fill="#B45309" />
  </svg>
);

const VectorNotes = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg width="90" height="90" viewBox="0 0 100 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M30 70 C 20 70, 15 75, 15 80 C 15 85, 20 90, 30 90 C 40 90, 45 85, 45 80 L 45 30 L 85 20 L 85 65 C 75 65, 70 70, 70 75 C 70 80, 75 85, 85 85 C 95 85, 100 80, 100 75 L 100 10 L 40 20 Z" fill="#ffffff" />
    <ellipse cx="25" cy="80" rx="4" ry="8" fill="black" opacity="0.1" transform="rotate(-30 25 80)" />
    <ellipse cx="80" cy="75" rx="4" ry="8" fill="black" opacity="0.1" transform="rotate(-30 80 75)" />
  </svg>
);

const VectorGuitar = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg width="110" height="110" viewBox="0 0 100 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M45 5 L 55 5 L 55 45 L 45 45 Z" fill="#374151" />
    <line x1="45" y1="15" x2="55" y2="15" stroke="#9CA3AF" strokeWidth="1" />
    <line x1="45" y1="25" x2="55" y2="25" stroke="#9CA3AF" strokeWidth="1" />
    <line x1="45" y1="35" x2="55" y2="35" stroke="#9CA3AF" strokeWidth="1" />
    <path d="M30 45 C 10 45, 10 70, 30 70 C 25 80, 30 95, 50 95 C 70 95, 75 80, 70 70 C 90 70, 90 45, 70 45 Z" fill="#FFE24A" />
    <path d="M30 45 C 10 45, 10 70, 30 70 C 25 80, 30 95, 50 95 C 70 95, 75 80, 70 70 C 90 70, 90 45, 70 45 Z" fill="black" opacity="0.1" transform="scale(0.95) translate(2, 3)" />
    <circle cx="50" cy="65" r="12" fill="#1f2937" />
    <rect x="46" y="85" width="8" height="4" fill="#374151" rx="1" />
    <line x1="48" y1="5" x2="48" y2="85" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
    <line x1="50" y1="5" x2="50" y2="85" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
    <line x1="52" y1="5" x2="52" y2="85" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
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
      {/* Saf CSS Göz Kırpma Animasyonu */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 92%, 98%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .eye { transform-origin: center; animation: blink 4s infinite; }
        .eye-delay { transform-origin: center; animation: blink 5s infinite 1s; }
      `}} />

      <motion.div
        className="w-full h-[300dvh] flex flex-col"
        style={{ willChange: "transform" }}
        animate={{ y: `-${currentSection * 100}dvh` }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }} 
      >
        
        {/* SECTION 1 - YEŞİL TEMA (Satranç & Zeka & Developer) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme1-bg overflow-hidden text-theme1-text selection:bg-white/30">
          
          <NetworkBackground />

          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             <FloatingElement isMobile={isMobile} isBlurred animationType="orbit" className="top-[10%] right-[10%] md:top-[15%] md:right-[20%]" delay={2} duration={12}>
               <VectorQueen className="w-12 h-16 sm:w-16 sm:h-20" rotation="25deg" />
             </FloatingElement>
             <FloatingElement isMobile={isMobile} isBlurred animationType="drift" className="bottom-[15%] left-[5%] md:bottom-[10%] md:left-[35%]" delay={1} duration={15}>
               <VectorPuzzle className="w-12 h-12 sm:w-16 sm:h-16" rotation="-40deg" />
             </FloatingElement>
             <FloatingElement isMobile={isMobile} isBlurred animationType="float" className="top-[60%] left-[10%] md:top-[70%] md:left-[15%]" delay={0.5} duration={10}>
               <VectorPawn className="w-8 h-12 sm:w-12 sm:h-16" rotation="-15deg" />
             </FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 0 ? "visible" : "hidden"} className="w-full pointer-events-auto mt-8 sm:mt-0">
              <motion.h1 variants={itemVariant} className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black tracking-tight mb-2 drop-shadow-lg leading-none break-words">Merhaba, ben Mert.</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-tight mb-8 leading-none">Eğitim Teknolojileri Geliştiricisi</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white">Eğitim teknolojileri üzerine alışılagelmişin dışında uygulamalar geliştiriyorum. Amacım, öğrenme süreçlerini sıkıcı ezber kalıplarından kurtararak teknolojinin sunduğu imkanlarla interaktif bir hale getirmek.</motion.p>
            </motion.div>
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
             {/* Piyon: İleri ve yukarı (küçük) hamle */}
             <FloatingElement hoverProps={{ y: -30, scale: 1.15 }} isMobile={isMobile} animationType="float" className="bottom-[20%] left-[8%] md:bottom-[25%] md:left-[15%]" delay={0} duration={6}>
               <VectorPawn className="w-14 h-20 sm:w-20 sm:h-28" rotation="-10deg" />
             </FloatingElement>
             {/* Beyin: Yaratıcılık dalgalanması (Pulse) */}
             <FloatingElement hoverProps={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 1.5 } }} isMobile={isMobile} animationType="drift" className="top-[15%] left-[5%] md:top-[20%] md:left-[12%]" delay={1.5} duration={8}>
               <VectorBrain className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32" rotation="10deg" />
             </FloatingElement>
             {/* Vezir: Altın ışık yayma efekti */}
             <FloatingElement hoverProps={{ filter: "drop-shadow(0px 0px 25px rgba(255, 184, 0, 1))", scale: 1.1 }} isMobile={isMobile} animationType="orbit" className="bottom-[15%] right-[5%] md:bottom-[20%] md:right-[15%]" delay={0.8} duration={10}>
               <VectorQueen className="w-16 h-20 sm:w-24 sm:h-32" rotation="15deg" />
             </FloatingElement>
             {/* Satranç Atı (L Hamlesi - Sola ve Yukarı Sekme) */}
             <FloatingElement hoverProps={{ x: -30, y: -40, scale: 1.15 }} isMobile={isMobile} animationType="float" className="top-[25%] right-[5%] md:top-[30%] md:right-[12%]" delay={2} duration={7}>
               <VectorKnight className="w-16 h-20 sm:w-20 sm:h-28" rotation="15deg" />
             </FloatingElement>
          </div>
        </section>

        {/* SECTION 2 - MERCAN TEMA (Fiziksel Savrulma Etkileşimli Uçan Balonlar) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme2-bg overflow-hidden text-white selection:bg-white/30">
          
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Arka Plan Bulanık Balonlar -> disableTap=true (Tıklanınca küçülmez), hoverProps ile rüzgar/itilme etkisi */}
            <FloatingElement disableTap={true} hoverProps={{ x: -40, y: -20, rotate: -15 }} isMobile={isMobile} isBlurred animationType="balloon" className="left-[15%] sm:left-[25%]" delay={0} duration={9}>
              <VectorBalloon color="#F2B8D1" className="w-12 sm:w-20 lg:w-24 text-[5vw] sm:text-[35px]" rotation="-5deg">÷</VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: 40, y: -30, rotate: 20 }} isMobile={isMobile} isBlurred animationType="balloon" className="right-[10%] sm:right-[15%]" delay={4} duration={12}>
              <VectorBalloon color="#FFE24A" className="w-10 sm:w-16 lg:w-20 text-[4vw] sm:text-[30px]" rotation="10deg">=</VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: -20, y: -40, rotate: -10 }} isMobile={isMobile} isBlurred animationType="balloon" className="left-[40%] sm:left-[50%]" delay={2} duration={15}>
               <VectorBalloon color="#FFFFFF" className="w-10 sm:w-14 lg:w-16 text-[4vw] sm:text-[25px]" rotation="-8deg">-</VectorBalloon>
            </FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 1 ? "visible" : "hidden"} className="w-full pointer-events-auto mt-8 sm:mt-0">
              <motion.h1 variants={itemVariant} className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black tracking-tight mb-2 drop-shadow-lg leading-none break-words">Oyunlaştırılmış</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-theme2-shape tracking-tight mb-8 leading-none">özel ürünler</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white">İngilizce, müzik, bilişim teknolojileri, matematik ve yaratıcı kodlama alanlarında prototipler tasarlıyorum. Sıradan arayüzlerin aksine akılda kalıcı, sade ama etkileşimli metotları tercih ediyorum.</motion.p>
            </motion.div>
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {/* Ön Plan Net Balonlar -> disableTap=true, Fare yaklaşınca fiziksel olarak kaçış/savrulma animasyonları */}
            <FloatingElement disableTap={true} hoverProps={{ x: 50, y: -10, rotate: 25 }} isMobile={isMobile} animationType="balloon" className="right-[5%] sm:right-[20%]" delay={1} duration={8}>
              <VectorBalloon color="#F2B8D1" className="w-16 sm:w-24 lg:w-32 text-[6vw] sm:text-[50px]" rotation="8deg">5</VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: -50, y: -30, rotate: -25 }} isMobile={isMobile} animationType="balloon" className="left-[2%] sm:left-[10%]" delay={5} duration={10}>
              <VectorBalloon color="#FFE24A" className="w-20 sm:w-28 lg:w-40 text-[7vw] sm:text-[60px]" rotation="-12deg">
                <span>2<sup className="text-[4vw] sm:text-[30px] lg:text-[35px] ml-1">3</sup></span>
              </VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: -40, y: 40, rotate: -20 }} isMobile={isMobile} animationType="balloon" className="left-[15%] sm:left-[25%]" delay={3} duration={11}>
              <VectorBalloon color="#FFFFFF" className="w-14 sm:w-20 lg:w-28 text-[5vw] sm:text-[40px]" rotation="12deg">×</VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: 40, y: 30, rotate: 30 }} isMobile={isMobile} animationType="balloon" className="right-[15%] sm:right-[30%]" delay={7} duration={9}>
              <VectorBalloon color="#FFFFFF" className="w-16 sm:w-24 lg:w-32 text-[6vw] sm:text-[50px]" rotation="-5deg">+</VectorBalloon>
            </FloatingElement>
          </div>
        </section>

        {/* SECTION 3 - MOR TEMA (Gerçekçi Müzik) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme3-bg overflow-hidden text-theme3-title selection:bg-theme3-shape/40">
          
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <FloatingElement isMobile={isMobile} isBlurred animationType="drift" className="top-[50%] left-[2%] sm:left-[5%] md:top-[45%] md:left-[5%]" delay={2.5} duration={14}>
               <VectorNotes className="scale-50 sm:scale-75" rotation="-20deg" />
            </FloatingElement>
            <FloatingElement isMobile={isMobile} isBlurred animationType="orbit" className="bottom-[5%] left-[30%] sm:left-[40%] md:bottom-[10%] md:left-[45%]" delay={1} duration={12}>
               <VectorDrum className="scale-50 sm:scale-75" rotation="-10deg" />
            </FloatingElement>
            <FloatingElement isMobile={isMobile} isBlurred animationType="float" className="top-[5%] right-[10%] sm:right-[30%] md:top-[8%] md:right-[35%]" delay={1.8} duration={8}>
               <VectorPiano className="scale-50 sm:scale-75" rotation="30deg" />
            </FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 2 ? "visible" : "hidden"} className="w-full pointer-events-auto mt-8 sm:mt-0">
              <motion.h1 variants={itemVariant} className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black tracking-tight mb-2 drop-shadow-md leading-none break-words text-theme3-title">Mikro Seviyede</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-theme3-shape tracking-tight mb-8 leading-none drop-shadow-sm">öğrenme</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white">Geliştirdiğim ürünler genelde mikro seviyede kavramların öğrenilmesi üzerine kurulu yaratıcı örneklerdir. Kullanıcının kafasının karışmaması adına ürünlerimi minimal ölçütte tutmayı tercih ediyorum.</motion.p>
            </motion.div>
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <FloatingElement isMobile={isMobile} animationType="orbit" className="top-[5%] left-[2%] sm:top-[10%] sm:left-[5%] md:top-[15%] md:left-[10%]" delay={0.5} duration={10}>
               <VectorPiano className="scale-75 sm:scale-100" rotation="-15deg" />
            </FloatingElement>
            <FloatingElement isMobile={isMobile} animationType="float" className="bottom-[15%] left-[2%] sm:bottom-[20%] sm:left-[8%] md:bottom-[20%] md:left-[15%]" delay={1.5} duration={6}>
               <VectorNotes className="scale-75 sm:scale-100" rotation="10deg" />
            </FloatingElement>
            <FloatingElement isMobile={isMobile} animationType="drift" className="top-[15%] right-[2%] sm:top-[20%] sm:right-[5%] md:top-[15%] md:right-[10%]" delay={0.8} duration={12}>
               <VectorDrum className="scale-75 sm:scale-100" rotation="20deg" />
            </FloatingElement>
            <FloatingElement isMobile={isMobile} animationType="float" className="bottom-[10%] right-[5%] sm:bottom-[15%] sm:right-[10%] md:bottom-[15%] md:right-[15%]" delay={2} duration={7}>
               <VectorGuitar className="scale-75 sm:scale-100" rotation="-25deg" />
            </FloatingElement>
          </div>
        </section>

      </motion.div>
    </div>
  );
};

export default Index;