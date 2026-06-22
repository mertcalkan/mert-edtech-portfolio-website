import { motion } from "framer-motion";

// --- 2D KİMYA VEKTÖR BİLEŞENLERİ ---
const VectorFlask = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `rotate(${rotation})` }}>
    <div className="w-4 h-6 sm:w-6 sm:h-8 border-x-4 border-t-4 border-white rounded-t-sm"></div>
    <div className="w-16 h-16 sm:w-24 sm:h-24 border-4 border-white rounded-full bg-transparent flex items-end justify-center overflow-hidden -mt-1">
      <div className="w-full h-1/2 bg-[#00e5ff] opacity-80 border-t-2 border-dashed border-white"></div>
    </div>
    <div className="absolute top-1 right-[-10px] text-white text-xs">✦</div>
  </div>
);

const VectorTestTube = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `rotate(${rotation})` }}>
    <div className="w-6 h-20 sm:w-8 sm:h-28 border-4 border-white rounded-b-full bg-transparent flex items-end justify-center overflow-hidden">
      <div className="w-full h-3/5 bg-[#eaff00] opacity-80"></div>
    </div>
    <div className="absolute bottom-4 w-1.5 h-1.5 rounded-full bg-white ml-2"></div>
    <div className="absolute bottom-8 w-1 h-1 rounded-full bg-white -ml-1"></div>
  </div>
);

const VectorAtom = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <div className={`relative flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 ${className}`} style={{ transform: `rotate(${rotation})` }}>
    <div className="absolute w-full h-1/3 border-2 border-white rounded-full rotate-45"></div>
    <div className="absolute w-full h-1/3 border-2 border-white rounded-full -rotate-45"></div>
    <div className="absolute w-1/3 h-full border-2 border-white rounded-full"></div>
    <div className="absolute w-4 h-4 rounded-full bg-[#ff0055]"></div>
  </div>
);

// --- ORTAK: 2D ETKİLEŞİMLİ VEKTÖR KAPSAYICI ---
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


// --- İLETİŞİM SAYFASI ANA BİLEŞENİ ---
const Contact = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden font-satoshi selection:bg-white/30 text-white bg-black">
      <section className="relative h-[100dvh] w-full flex items-center justify-center bg-[#0f766e] overflow-hidden">
        
        {/* 2D Vektörel Kimya Elementleri Arka Planı */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
           <FloatingElement className="top-[15%] left-[10%] md:top-[20%] md:left-[15%]" delay={0} duration={5} hoverScale={1.2}>
             <VectorFlask rotation="-15deg" />
           </FloatingElement>

           <FloatingElement className="bottom-[20%] right-[10%] md:bottom-[25%] md:right-[15%]" delay={1.5} duration={6} hoverScale={1.2}>
             <VectorTestTube rotation="20deg" />
           </FloatingElement>

           <FloatingElement className="bottom-[15%] left-[20%] md:bottom-[20%] md:left-[25%]" delay={0.5} duration={4} hoverScale={1.2}>
             <VectorAtom rotation="-10deg" />
           </FloatingElement>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
          <motion.div variants={containerVariant} initial="hidden" animate="visible" className="w-full">
            <motion.h1 variants={itemVariant} className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase mb-4 drop-shadow-lg leading-none break-words">
              BENİMLE İLETİŞİME GEÇ
            </motion.h1>
            
            <motion.p variants={itemVariant} className="text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/95 mb-8">
              Benimle aşağıdaki yöntemler ile iletişime geçebilirsin.
            </motion.p>
            
            <motion.a 
              href="mailto:mertcalkan2001@gmail.com" 
              variants={itemVariant} 
              className="text-[5vw] sm:text-2xl md:text-4xl font-bold italic text-[#eaff00] tracking-tight mb-12 drop-shadow-md hover:text-white transition-colors duration-300 block"
            >
              mertcalkan2001@gmail.com
            </motion.a>

            <motion.div variants={itemVariant} className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-base font-bold tracking-widest uppercase">
              {['Lınkedin', 'Instagram', 'Youtube'].map((social) => (
                <a key={social} href="#" className="hover:text-[#eaff00] transition-colors duration-300 relative group">
                  {social}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#eaff00] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;