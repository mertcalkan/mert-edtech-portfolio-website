import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectIframe = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100dvh] bg-black relative">
      {/* Geri Dön Butonu */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate("/projeler")}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white bg-black/50 hover:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border border-white/10"
      >
        <ArrowLeft size={20} />
        <span className="font-satoshi font-medium">Projeler</span>
      </motion.button>
      
      <iframe 
        src="https://uslu-sayilar.netlify.app/" 
        className="w-full h-full border-none"
        title="Üslü Sayılar Avcısı"
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default ProjectIframe;
