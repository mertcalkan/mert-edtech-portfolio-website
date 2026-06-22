import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

// --- ORTAK: 2D ETKİLEŞİMLİ VEKTÖR BİLEŞENİ ---
const FloatingElement = ({ children, delay = 0, duration = 4, className, hoverScale = 1.15 }: any) => {
  return (
    <motion.div
      className={`absolute select-none pointer-events-auto ${className}`}
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

// --- MÜZİK VEKTÖR BİLEŞENLERİ ---
const VectorPiano = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <div className={`flex bg-white rounded-md p-1 shadow-2xl ${className}`} style={{ transform: `rotate(${rotation})` }}>
    {[0, 1, 2, 3, 4, 5, 6].map((key) => (
      <div key={key} className="w-4 h-16 sm:w-6 sm:h-24 bg-white border border-gray-200 relative z-0">
        {[0, 1, 3, 4, 5].includes(key) && (
          <div className="absolute top-0 -right-2 sm:-right-3 w-4 h-10 sm:w-6 sm:h-14 bg-black z-10 mx-auto"></div>
        )}
      </div>
    ))}
  </div>
);

const VectorNote = ({ className, rotation = "0deg", color = "white" }: { className?: string, rotation?: string, color?: string }) => (
  <div className={`flex items-end ${className}`} style={{ transform: `rotate(${rotation})` }}>
    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-${color}`}></div>
    <div className={`w-[2px] h-8 sm:h-12 bg-${color} -ml-1`}></div>
  </div>
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
        
        {/* SECTION 1 - MOR TEMA (Görsel 2) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme1-bg overflow-hidden text-theme1-text selection:bg-white/30">
          {/* 2D Vektörel Arka Plan Elementleri (Dev Sayılar) */}
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
             <FloatingElement className="top-[10%] left-[10%] text-theme1-shape text-[20vw] font-black opacity-80" delay={0}>9</FloatingElement>
             <FloatingElement className="bottom-[15%] right-[15%] text-theme1-shape text-[25vw] font-black opacity-80" delay={1}>7</FloatingElement>
             <FloatingElement className="top-[20%] right-[10%] text-theme1-shape text-[15vw] font-black opacity-80" delay={2} duration={5}>3</FloatingElement>
             <FloatingElement className="bottom-[10%] left-[20%] text-theme1-shape text-[18vw] font-black opacity-80" delay={0.5} duration={6}>2</FloatingElement>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 0 ? "visible" : "hidden"} className="w-full">
              <motion.h1 variants={itemVariant} className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[120px] font-black tracking-tight mb-2 drop-shadow-xl leading-none break-words">Selam.</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 tracking-tight mb-8 leading-none">eğitim teknolojileri <br className="md:hidden" />geliştiricisi</motion.h2>
              <motion.p variants={itemVariant} className="text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/80">Eğitim teknolojileri üzerine alışılagelmişin dışında uygulamalar geliştiriyorum. Amacım, öğrenme süreçlerini sıkıcı ezber kalıplarından kurtararak teknolojinin sunduğu imkanlarla interaktif bir hale getirmek.</motion.p>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-8 text-xs sm:text-sm font-bold tracking-widest opacity-60">2012/2026</div>
          <div className="absolute bottom-8 right-8 text-xs sm:text-sm font-bold tracking-widest opacity-60">01/03</div>
        </section>

        {/* SECTION 2 - MERCAN TEMA (Matematik Sembolleri Eklendi) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme2-bg overflow-hidden text-white selection:bg-white/30">
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
            {/* Matematik ve Oyunlaştırma Vektörleri */}
            <FloatingElement className="top-[20%] right-[25%] text-[8vw] sm:text-6xl text-theme2-shape font-black" delay={0} duration={4}>+</FloatingElement>
            <FloatingElement className="bottom-[25%] left-[20%] text-[10vw] sm:text-7xl text-white opacity-80 font-black" delay={1.5} duration={5}>×</FloatingElement>
            <FloatingElement className="top-[30%] left-[15%] text-[6vw] sm:text-5xl text-theme2-shape font-black" delay={2} duration={4}>÷</FloatingElement>
            <FloatingElement className="bottom-[15%] right-[20%] text-[8vw] sm:text-6xl text-white opacity-80 font-black" delay={0.5} duration={6}>-</FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 1 ? "visible" : "hidden"} className="w-full">
              <motion.h1 variants={itemVariant} className="text-[9vw] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-2 drop-shadow-lg leading-none break-words">Oyunlaştırılmış</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-black text-theme2-shape tracking-tight mb-8 leading-none">özel ürünler</motion.h2>
              <motion.p variants={itemVariant} className="text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/90">İngilizce, müzik, bilişim teknolojileri, matematik ve yaratıcı kodlama alanlarında prototipler tasarlıyorum. Sıradan arayüzlerin aksine akılda kalıcı, sade ama etkileşimli metotları tercih ediyorum.</motion.p>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-8 text-xs sm:text-sm font-bold tracking-widest opacity-60">2012/2026</div>
          <div className="absolute bottom-8 right-8 text-xs sm:text-sm font-bold tracking-widest opacity-60">02/03</div>
        </section>

        {/* SECTION 3 - TURUNCU TEMA (Görsel 1: Headspace / Müzik Vektörleri) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme3-bg overflow-hidden text-theme3-title selection:bg-theme3-shape/30">
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
            {/* Piyano ve Nota Vektörleri */}
            <FloatingElement className="top-[15%] left-[8%] md:top-[20%] md:left-[15%]" delay={0.5} duration={6} hoverScale={1.1}>
               <VectorPiano rotation="-15deg" />
            </FloatingElement>
            
            <FloatingElement className="bottom-[25%] right-[10%] md:bottom-[30%] md:right-[20%]" delay={1.5} duration={4} hoverScale={1.2}>
               <div className="flex gap-2">
                 <VectorNote color="theme3-shape" rotation="10deg" />
                 <VectorNote color="white" rotation="-5deg" className="mt-4" />
               </div>
            </FloatingElement>

             <FloatingElement className="top-[10%] right-[15%] text-white text-5xl" delay={2} duration={5}>✦</FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 2 ? "visible" : "hidden"} className="w-full">
              <motion.h1 variants={itemVariant} className="text-[9.5vw] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 drop-shadow-lg leading-none break-words text-theme3-title">Mikro Seviyede</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black text-theme3-shape tracking-tight mb-8 leading-none">öğrenme</motion.h2>
              <motion.p variants={itemVariant} className="text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-theme3-title/95">Geliştirdiğim ürünler genelde mikro seviyede kavramların öğrenilmesi üzerine kurulu yaratıcı örneklerdir. Kullanıcının kafasının karışmaması adına ürünlerimi minimal ölçütte tutmayı tercih ediyorum.</motion.p>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-8 text-xs sm:text-sm font-bold tracking-widest text-theme3-title opacity-60">2012/2026</div>
          <div className="absolute bottom-8 right-8 text-xs sm:text-sm font-bold tracking-widest text-theme3-title opacity-60">03/03</div>
        </section>

      </motion.div>
    </div>
  );
};

export default Index;