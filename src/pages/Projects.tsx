import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

// Kategoriler
const CATEGORIES = ["TÜMÜ", "OYUN", "EDTECH", "3D / WEBGL", "WEB"];

// Projelerin Datası
const PROJECTS_DATA = [
  {
    id: 1,
    title: "ÜSLÜ SAYILAR AVCISI",
    subtitle: "3d interaktif matematik oyunu",
    category: "OYUN",
    bg: "bg-gradient-to-br from-blue-600 to-purple-800",
  },
  {
    id: 2,
    title: "ARTORITHM",
    subtitle: "çocuklar için yaratıcı kodlama",
    category: "EDTECH",
    bg: "bg-gradient-to-br from-pink-500 to-orange-400",
  },
  {
    id: 3,
    title: "AIR PIANO",
    subtitle: "mediapipe destekli sanal piyano",
    category: "3D / WEBGL",
    bg: "bg-gradient-to-br from-teal-400 to-emerald-600",
  },
  {
    id: 4,
    title: "DUKAPO",
    subtitle: "performans odaklı e-ticaret",
    category: "WEB",
    bg: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: 5,
    title: "ROBLOX EDU",
    subtitle: "luau ile mikro öğrenme",
    category: "OYUN",
    bg: "bg-gradient-to-br from-red-500 to-rose-700",
  },
  {
    id: 6,
    title: "MEGA-APP",
    subtitle: "pedagojik modüler platform",
    category: "EDTECH",
    bg: "bg-gradient-to-br from-indigo-600 to-cyan-500",
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("TÜMÜ");
  const [dragWidth, setDragWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Filtrelenmiş projeler
  const filteredProjects = PROJECTS_DATA.filter(
    (project) => activeCategory === "TÜMÜ" || project.category === activeCategory
  );

  // Kategoriye ait proje sayısını bulma (Örn: OYUN 2)
  const getCategoryCount = (cat: string) => {
    if (cat === "TÜMÜ") return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => p.category === cat).length;
  };

  // Sürükleme sınırlarını (constraint) filtrelemeye göre dinamik hesapla
  useEffect(() => {
    if (carouselRef.current) {
      setDragWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [filteredProjects, activeCategory]);

 return (
    <div className="h-[100dvh] w-full overflow-hidden bg-[#111111] text-white flex flex-col justify-center relative font-satoshi">
      
      {/* Sürüklenebilir Proje Kartları Alanı */}
      <div className="w-full">
        <motion.div 
          ref={carouselRef} 
          className="cursor-grab overflow-hidden px-6 md:px-20"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -Math.max(dragWidth, 0) }} 
            dragElastic={0.15} 
            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
            className="flex items-start gap-6 md:gap-10 w-max"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  // Kart genişlikleri eski haline sabitlendi (450px)
                  className="flex flex-col group w-[280px] md:w-[450px]"
                >
                  {/* Kart yüksekliği eski haline sabitlendi (280px) */}
                  <div className={`w-full h-[180px] md:h-[280px] ${project.bg} rounded-sm overflow-hidden relative mb-4`}>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  </div>
                  
                  {/* Başlık Fontları eski boyutlarına (text-xl md:text-3xl) geri getirildi */}
                  <motion.h3 layout className="text-xl md:text-3xl font-black uppercase tracking-tight">
                    {project.title}
                  </motion.h3>
                  
                  {/* Alt Başlık Fontları eski boyutlarına (text-sm md:text-base) geri getirildi */}
                  <motion.p layout className="text-sm md:text-base font-medium text-white/70 mt-2 tracking-wide">
                    {project.subtitle}
                  </motion.p>
                  
                  <motion.div layout className="w-8 h-[1px] bg-white mt-4 opacity-50" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Alt Filtre Barı */}
      {!isMobile && (
        <div className="absolute bottom-12 left-0 w-full flex justify-center">
          <div className="flex flex-col items-center">
            <div className="flex space-x-8 mb-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  // Buton font boyutları eski haline sabitlendi
                  className={`text-[11px] font-bold tracking-[0.15em] uppercase flex items-start gap-1 transition-colors duration-300 ${
                    activeCategory === category ? "text-white" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  {category}
                  <span className="text-[9px] opacity-70">{getCategoryCount(category)}</span>
                </button>
              ))}
            </div>
            {/* Çizgi genişliği eski haline (400px) sabitlendi */}
            <div className="w-[400px] h-[1px] bg-white/20 relative"></div>
          </div>
        </div>
      )}

      {/* Dinamik Tarih Alanı */}
      <div className="absolute bottom-8 left-8 text-xs font-bold tracking-widest opacity-80 z-0">
        2012/{new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Projects;