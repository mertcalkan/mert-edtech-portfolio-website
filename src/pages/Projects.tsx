import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import usluSayilarImg from "../assets/uslu-sayilar-2.png";
import { Footer } from "../components/Footer";

// Kategoriler
const CATEGORIES = ["TÜMÜ", "EDTECH", "WEB AR", "ART"];

// Projelerin Datası
const PROJECTS_DATA = [
  {
    id: 1,
    title: "ÜSLÜ SAYILAR AVCISI",
    subtitle: "3d interaktif matematik oyunu",
    category: "EDTECH",
    bg: "bg-gradient-to-br from-blue-600 to-purple-800",
    image: usluSayilarImg,
    slug: "uslu-sayilar"
  }

];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("TÜMÜ");
  const [dragWidth, setDragWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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
    <div className="h-[100dvh] w-full overflow-hidden bg-[#111111] text-white flex flex-col relative font-satoshi">
      
      {/* Sürüklenebilir Proje Kartları Alanı */}
      <div className="w-full h-full flex flex-col lg:justify-center overflow-y-auto lg:overflow-hidden hide-scrollbar">
        
        {/* Mobilde yukarıdan boşluk bırakmak için */}
        <div className="h-28 lg:hidden flex-shrink-0" />

        <motion.div 
          ref={carouselRef} 
          className="lg:cursor-grab flex-shrink-0 px-6 md:px-20"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag={typeof window !== "undefined" && window.innerWidth >= 1024 ? "x" : false}
            dragConstraints={{ right: 0, left: -Math.max(dragWidth, 0) }} 
            dragElastic={0.15} 
            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:w-max w-full"
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
                  onClick={() => project.slug && navigate(`/projeler/${project.slug}`)}
                  className={`flex flex-col group w-[280px] md:w-[600px] lg:w-[450px] ${project.slug ? "cursor-pointer" : ""}`}
                >
                  <div className={`w-full h-[180px] md:h-[380px] lg:h-[280px] ${project.bg} rounded-sm overflow-hidden relative mb-4`}>
                    {project.image && (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover" 
                        loading={project.id === 1 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={project.id === 1 ? "high" : "auto"}
                      />
                    )}
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
        
        {/* Mobil/Tablet Footer (Scroll akışının en altında) */}
        <div className="w-full mt-auto mb-6 pt-12 flex justify-center lg:hidden flex-shrink-0">
          <Footer className="pointer-events-none flex justify-center" />
        </div>
      </div>

      {/* Alt Filtre Barı */}
      {!isMobile && (
        <div className="absolute bottom-12 left-0 w-full flex justify-center z-10 pointer-events-auto">
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
      
      <Footer className="absolute bottom-4 left-0 w-full z-40 pointer-events-none lg:flex justify-center hidden" />
    </div>
  );
};

export default Projects;