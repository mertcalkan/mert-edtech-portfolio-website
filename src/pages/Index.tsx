import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

// --- YENİ NESİL ETKİLEŞİMLİ VEKTÖR (Ekran Boyutuna Göre Optimize Edilmiş Hareketler) ---
const FloatingElement = ({ children, delay = 0, duration = 4, className, hoverProps = { scale: 1.25, rotateX: 10, rotateY: 10 }, disableTap = false, isBlurred = false, animationType = "float", isMobile = false }: any) => {
  let animateProps: any = {};
  let transitionProps: any = {};

  if (animationType === "float") {
    animateProps = { 
      y: isMobile ? ["-10px", "10px", "-10px"] : ["-20px", "20px", "-20px"], 
      x: isMobile ? ["-5px", "5px", "-5px"] : ["-10px", "10px", "-10px"], 
      rotate: [-4, 4, -4] 
    };
    transitionProps = { repeat: Infinity, duration: duration, delay: delay, ease: "easeInOut" };
  } else if (animationType === "orbit") {
    animateProps = { 
      x: isMobile ? ["0px", "15px", "0px", "-15px", "0px"] : ["0px", "30px", "0px", "-30px", "0px"], 
      y: isMobile ? ["0px", "10px", "20px", "10px", "0px"] : ["0px", "20px", "40px", "20px", "0px"], 
      rotate: [-5, 10, 0, -10, -5] 
    };
    transitionProps = { repeat: Infinity, duration: duration, delay: delay, ease: "easeInOut" };
  } else if (animationType === "drift") {
    animateProps = { 
      x: isMobile ? ["-15px", "15px", "-15px"] : ["-30px", "30px", "-30px"], 
      y: isMobile ? ["-10px", "10px", "-10px"] : ["-20px", "20px", "-20px"], 
      rotate: [-10, 10, -10] 
    };
    transitionProps = { repeat: Infinity, duration: duration, delay: delay, ease: "easeInOut" };
  } else if (animationType === "balloon") {
    animateProps = { y: ["120vh", "-120vh"], x: ["-15px", "15px", "-15px"], rotate: [-5, 5, -5] };
    transitionProps = {
      // Negatif delay hack'i ile balonların ilk açılışta çoktan ekrana girmiş olması sağlandı
      y: { repeat: Infinity, duration: duration * 2.5, ease: "linear", delay: delay - (duration * 1.5) },
      x: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: delay },
      rotate: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: delay }
    };
  }

  return (
    <motion.div
      className={`absolute pointer-events-none ${className} ${isBlurred ? 'opacity-30 sm:opacity-50 sm:blur-[3px]' : ''}`}
      animate={animateProps}
      transition={transitionProps}
      style={{ willChange: "transform" }}
    >
      <motion.div
        drag={!isMobile} 
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        dragElastic={0.1}
        className={`group w-full h-full pointer-events-auto flex items-center justify-center ${!isBlurred ? 'drop-shadow-lg sm:drop-shadow-2xl' : ''} ${!isMobile && "cursor-grab active:cursor-grabbing"}`}
        whileHover={!isMobile ? hoverProps : {}}
        whileTap={!isMobile && !disableTap ? { scale: 0.95, cursor: "grabbing" } : (!isMobile ? { cursor: "grabbing" } : {})}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- SECTION 1: NETWORK & SATRANÇ VEKTÖRLERİ (Gülümseyen Karakterler) ---

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
    <path d="M 20 110 Q 50 120 80 110 L 75 95 Q 50 100 25 95 Z" fill="#E86A33" fillOpacity="0.8" />
    <path d="M 25 95 Q 50 100 75 95 L 70 85 Q 50 90 30 85 Z" fill="#D25B2A" fillOpacity="0.8" />
    <path d="M 35 85 Q 25 50 40 40 L 60 40 Q 75 50 65 85 Z" fill="#FFFFFF" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3.5" />
    <path d="M 35 85 Q 25 50 40 40 L 50 40 Q 60 50 55 85 Z" fill="#ffffff" fillOpacity="0.1" /> 
    <path d="M 30 45 Q 50 50 70 45 L 65 35 Q 50 40 35 35 Z" fill="#E86A33" fillOpacity="0.8" />
    <circle cx="50" cy="22" r="18" fill="#FFFFFF" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3.5" />
    <circle cx="45" cy="18" r="14" fill="#ffffff" fillOpacity="0.1" />
    <g className="eye">
      <ellipse cx="43" cy="18" rx="2.5" ry="4" fill="#111" />
      <ellipse cx="57" cy="18" rx="2.5" ry="4" fill="#111" />
      <circle cx="42" cy="17" r="1" fill="#FFF" />
      <circle cx="56" cy="17" r="1" fill="#FFF" />
    </g>
    <path d="M 45 26 Q 50 26 55 26" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="transition-opacity duration-300 group-hover:opacity-0" />
    <path d="M 43 25 Q 50 40 57 25" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </svg>
);

const VectorQueen = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 80 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M10 30 L25 50 L40 20 L55 50 L70 30 L65 80 L15 80 Z" fill="#ffffff" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3.5" />
    <path d="M15 80 L40 50 L65 80 Z" fill="#ffffff" fillOpacity="0.1" /> 
    <circle cx="10" cy="25" r="6" fill="#FFB800" fillOpacity="0.7" />
    <circle cx="40" cy="15" r="7" fill="#FFB800" fillOpacity="0.7" />
    <circle cx="70" cy="25" r="6" fill="#FFB800" fillOpacity="0.7" />
    <rect x="10" y="80" width="60" height="10" rx="4" fill="#8B5CF6" fillOpacity="0.8" />
    <rect x="20" y="70" width="40" height="5" rx="2" fill="#E86A33" fillOpacity="0.8" />
    <g className="eye-delay">
      <ellipse cx="33" cy="55" rx="2.5" ry="4" fill="#111" />
      <ellipse cx="47" cy="55" rx="2.5" ry="4" fill="#111" />
      <circle cx="32" cy="54" r="1" fill="#FFF" />
      <circle cx="46" cy="54" r="1" fill="#FFF" />
    </g>
    <path d="M 35 63 Q 40 63 45 63" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="transition-opacity duration-300 group-hover:opacity-0" />
    <path d="M 33 62 Q 40 78 47 62" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </svg>
);

const VectorKing = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 120" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M 20 110 L 80 110 L 70 95 L 30 95 Z" fill="#E86A33" fillOpacity="0.8" />
    <path d="M 25 95 L 75 95 L 65 65 L 35 65 Z" fill="#FFFFFF" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3.5" />
    <path d="M 75 95 L 65 65 L 50 65 L 50 95 Z" fill="#ffffff" fillOpacity="0.1" />
    <path d="M 15 45 L 85 45 L 65 65 L 35 65 Z" fill="#FFB800" fillOpacity="0.7" />
    <path d="M 85 45 L 65 65 L 50 65 L 50 45 Z" fill="#F59E0B" fillOpacity="0.7" />
    <circle cx="15" cy="45" r="5" fill="#E86A33" fillOpacity="0.8" />
    <circle cx="50" cy="40" r="6" fill="#E86A33" fillOpacity="0.8" />
    <circle cx="85" cy="45" r="5" fill="#E86A33" fillOpacity="0.8" />
    <rect x="46" y="10" width="8" height="30" fill="#FFB800" fillOpacity="0.7" />
    <rect x="35" y="20" width="30" height="8" fill="#FFB800" fillOpacity="0.7" />
    <g className="eye">
      <ellipse cx="43" cy="78" rx="2.5" ry="4" fill="#111" />
      <ellipse cx="57" cy="78" rx="2.5" ry="4" fill="#111" />
      <circle cx="42" cy="77" r="1" fill="#FFF" />
      <circle cx="56" cy="77" r="1" fill="#FFF" />
    </g>
    <path d="M 45 86 Q 50 86 55 86" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="transition-opacity duration-300 group-hover:opacity-0" />
    <path d="M 43 85 Q 50 101 57 85" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </svg>
);

const VectorRook = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 120" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M 20 110 L 80 110 L 70 85 L 30 85 Z" fill="#E86A33" fillOpacity="0.8" />
    <path d="M 25 85 L 75 85 L 70 45 L 30 45 Z" fill="#FFFFFF" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3.5" />
    <path d="M 75 85 L 70 45 L 50 45 L 50 85 Z" fill="#ffffff" fillOpacity="0.1" />
    <path d="M 20 45 L 80 45 L 80 15 L 65 15 L 65 30 L 55 30 L 55 15 L 45 15 L 45 30 L 35 30 L 35 15 L 20 15 Z" fill="#FFFFFF" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3.5" />
    <path d="M 80 45 L 50 45 L 50 15 L 65 15 L 65 30 L 55 30 L 55 15 L 50 15 Z" fill="#ffffff" fillOpacity="0.1" />
    <g className="eye-delay">
      <ellipse cx="41" cy="60" rx="2.5" ry="4" fill="#111" />
      <ellipse cx="59" cy="60" rx="2.5" ry="4" fill="#111" />
      <circle cx="40" cy="59" r="1" fill="#FFF" />
      <circle cx="58" cy="59" r="1" fill="#FFF" />
    </g>
    <path d="M 44 69 Q 50 69 56 69" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="transition-opacity duration-300 group-hover:opacity-0" />
    <path d="M 42 68 Q 50 84 58 68" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </svg>
);

const VectorKnight = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 120" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M 20 110 L 80 110 L 75 90 L 25 90 Z" fill="#E86A33" fillOpacity="0.8" />
    <path d="M 25 90 L 75 90 C 75 60 90 40 70 20 C 60 10 40 10 30 25 C 20 40 10 50 15 65 C 20 70 30 65 35 55 C 40 60 40 70 30 90 Z" fill="#FFFFFF" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3.5" />
    <path d="M 70 20 C 80 40 75 65 75 90" stroke="#FFB800" strokeWidth="8" strokeOpacity="0.7" strokeDasharray="5 5" fill="none" />
    <path d="M 15 65 C 10 75 25 80 35 70" fill="#ffffff" fillOpacity="0.1" />
    <path d="M 45 15 L 40 0 L 55 10 Z" fill="#FFFFFF" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
    <path d="M 60 18 L 65 5 L 70 15 Z" fill="#ffffff" fillOpacity="0.1" />
    <g className="eye">
      <ellipse cx="32" cy="38" rx="2.5" ry="4" fill="#111" />
      <ellipse cx="46" cy="38" rx="2.5" ry="4" fill="#111" />
      <circle cx="31" cy="37" r="1" fill="#FFF" />
      <circle cx="45" cy="37" r="1" fill="#FFF" />
    </g>
    <circle cx="16" cy="72" r="1.5" fill="#D25B2A" />
    <circle cx="23" cy="74" r="1.5" fill="#D25B2A" />
    <path d="M 33 46 Q 39 46 45 46" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="transition-opacity duration-300 group-hover:opacity-0" />
    <path d="M 31 45 Q 39 62 47 45" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </svg>
);

// --- SECTION 2: BALON VEKTÖRÜ ---
const VectorBalloon = ({ children, className, color = "#F2B8D1", rotation = "0deg" }: any) => (
  <div className={`flex flex-col items-center ${className}`} style={{ transform: `rotate(${rotation})` }}>
     <div className="relative w-full">
       <svg viewBox="0 0 80 100" className="w-full h-auto z-10 drop-shadow-lg block">
          <path d="M40 0 C 10 0, 0 30, 0 50 C 0 80, 30 90, 40 95 C 50 90, 80 80, 80 50 C 80 30, 70 0, 40 0 Z" fill={color} opacity="0.45" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M35 95 L45 95 L40 100 Z" fill={color} opacity="0.6" />
          <ellipse cx="22" cy="28" rx="6" ry="14" fill="white" opacity="0.3" transform="rotate(-25 22 28)" />
       </svg>
       <div className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[#E34542] z-20 font-black drop-shadow-sm flex items-center justify-center w-full">
          {children}
       </div>
     </div>
     <div className="w-[2px] h-12 sm:h-20 bg-white/30 -mt-1 z-0"></div>
  </div>
);

// --- SECTION 3: MÜZİK VEKTÖRLERİ (Gerçekçi Viyolin & Trompet) ---
const VectorPiano = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 120 60" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <rect x="0" y="0" width="120" height="60" rx="4" fill="#ffffff" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="4" />
    <rect x="0" y="55" width="120" height="5" rx="2" fill="#ffffff" fillOpacity="0.1" /> 
    {[20,40,60,80,100].map(x => <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="3"/>)}
    {[12, 32, 72, 92].map(x => (
      <g key={x}>
        <rect x={x} y="0" width="16" height="35" rx="2" fill="#111827" fillOpacity="0.9" />
        <rect x={x+2} y="0" width="12" height="32" rx="1" fill="#374151" fillOpacity="0.8" /> 
      </g>
    ))}
  </svg>
);

const VectorDrum = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M10 30 C 10 10, 90 10, 90 30 L 90 70 C 90 90, 10 90, 10 70 Z" fill="#FFE24A" fillOpacity="0.5" />
    <path d="M10 30 C 10 10, 90 10, 90 30 L 90 70 C 90 90, 10 90, 10 70 Z" fill="black" opacity="0.1" /> 
    <ellipse cx="50" cy="30" rx="40" ry="15" fill="#ffffff" fillOpacity="0.2" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="4" />
    <path d="M 10 30 L 30 70 M 30 30 L 50 70 M 50 30 L 70 70 M 70 30 L 90 70" stroke="#ffffff" strokeWidth="5" opacity="0.4"/>
    <line x1="20" y1="5" x2="60" y2="40" stroke="#D97706" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.8" />
    <ellipse cx="20" cy="5" rx="4" ry="4" fill="#D97706" fillOpacity="0.8" />
    <line x1="80" y1="5" x2="40" y2="40" stroke="#B45309" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.8" />
    <ellipse cx="80" cy="5" rx="4" ry="4" fill="#B45309" fillOpacity="0.8" />
  </svg>
);

const VectorNotes = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M30 70 C 20 70, 15 75, 15 80 C 15 85, 20 90, 30 90 C 40 90, 45 85, 45 80 L 45 30 L 85 20 L 85 65 C 75 65, 70 70, 70 75 C 70 80, 75 85, 85 85 C 95 85, 100 80, 100 75 L 100 10 L 40 20 Z" fill="#ffffff" fillOpacity="0.25" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="4" />
    <ellipse cx="25" cy="80" rx="4" ry="8" fill="black" opacity="0.1" transform="rotate(-30 25 80)" />
    <ellipse cx="80" cy="75" rx="4" ry="8" fill="black" opacity="0.1" transform="rotate(-30 80 75)" />
  </svg>
);

const VectorGuitar = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <path d="M45 5 L 55 5 L 55 45 L 45 45 Z" fill="#374151" fillOpacity="0.8" />
    <line x1="45" y1="15" x2="55" y2="15" stroke="#9CA3AF" strokeWidth="2" />
    <line x1="45" y1="25" x2="55" y2="25" stroke="#9CA3AF" strokeWidth="2" />
    <line x1="45" y1="35" x2="55" y2="35" stroke="#9CA3AF" strokeWidth="2" />
    <path d="M30 45 C 10 45, 10 70, 30 70 C 25 80, 30 95, 50 95 C 70 95, 75 80, 70 70 C 90 70, 90 45, 70 45 Z" fill="#FFE24A" fillOpacity="0.5" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3" />
    <path d="M30 45 C 10 45, 10 70, 30 70 C 25 80, 30 95, 50 95 C 70 95, 75 80, 70 70 C 90 70, 90 45, 70 45 Z" fill="black" opacity="0.1" transform="scale(0.95) translate(2, 3)" />
    <circle cx="50" cy="65" r="12" fill="#1f2937" fillOpacity="0.8" />
    <rect x="46" y="85" width="8" height="4" fill="#374151" fillOpacity="0.8" rx="1" />
    <line x1="48" y1="5" x2="48" y2="85" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
    <line x1="50" y1="5" x2="50" y2="85" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
    <line x1="52" y1="5" x2="52" y2="85" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
  </svg>
);

const VectorViolin = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    <line x1="15" y1="85" x2="85" y2="15" stroke="#FCD34D" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.8" />
    <line x1="18" y1="82" x2="82" y2="18" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
    <path d="M 40 20 C 20 20 20 40 30 45 C 25 55 20 70 40 85 C 50 90 60 90 70 85 C 90 70 85 55 80 45 C 90 40 90 20 70 20 C 60 15 50 15 40 20 Z" fill="#B45309" fillOpacity="0.6" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" />
    <path d="M 40 20 C 20 20 20 40 30 45 C 25 55 20 70 40 85 C 50 90 60 90 70 85 C 90 70 85 55 80 45 C 90 40 90 20 70 20 Z" fill="black" opacity="0.1" transform="scale(0.9) translate(5, 5)" />
    <path d="M 35 25 C 25 25 25 35 30 40" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M 30 75 C 40 80 50 80 60 75" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3" />
    <rect x="52" y="2" width="6" height="45" fill="#1f2937" fillOpacity="0.8" transform="rotate(10 55 25)" />
    <path d="M 52 25 L 56 24 L 50 55 L 44 55 Z" fill="#111827" fillOpacity="0.8" />
    <circle cx="62" cy="4" r="5" fill="#78350F" fillOpacity="0.8" />
    <line x1="58" y1="3" x2="68" y2="1" stroke="#1f2937" strokeWidth="3" strokeOpacity="0.8" />
    <line x1="59" y1="6" x2="69" y2="4" stroke="#1f2937" strokeWidth="3" strokeOpacity="0.8" />
    <path d="M 35 50 C 30 55 30 65 35 70" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round" strokeOpacity="0.8" />
    <circle cx="34" cy="50" r="2" fill="#111827" fillOpacity="0.8" />
    <circle cx="36" cy="70" r="2" fill="#111827" fillOpacity="0.8" />
    <path d="M 65 45 C 70 50 70 60 65 65" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round" strokeOpacity="0.8" />
    <circle cx="64" cy="45" r="2" fill="#111827" fillOpacity="0.8" />
    <circle cx="66" cy="65" r="2" fill="#111827" fillOpacity="0.8" />
    <rect x="42" y="58" width="12" height="3" fill="#D97706" fillOpacity="0.8" rx="1" />
    <path d="M 45 70 L 51 68 L 48 85 L 42 85 Z" fill="#1f2937" fillOpacity="0.8" />
    <line x1="53" y1="5" x2="44" y2="80" stroke="#E5E7EB" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="54.5" y1="5" x2="45.5" y2="80" stroke="#E5E7EB" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="56" y1="5" x2="47" y2="80" stroke="#E5E7EB" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="57.5" y1="5" x2="48.5" y2="80" stroke="#E5E7EB" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

const VectorTrumpet = ({ className, rotation = "0deg" }: { className?: string, rotation?: string }) => (
  <svg viewBox="0 0 120 50" className={`${className}`} style={{ transform: `rotate(${rotation})` }}>
    {/* Mouthpiece */}
    <path d="M 5 22 L 15 22 L 15 28 L 5 28 Z" fill="#E5E7EB" opacity="0.8" />
    <ellipse cx="5" cy="25" rx="3" ry="6" fill="#D1D5DB" />
    {/* Main Tube */}
    <path d="M 15 23 L 80 23 L 80 27 L 15 27 Z" fill="#FCD34D" fillOpacity="0.9" />
    <path d="M 15 23 L 80 23 L 80 25 L 15 25 Z" fill="#FFFFFF" fillOpacity="0.5" />
    {/* Lower looping tube */}
    <path d="M 35 27 C 35 45, 75 45, 75 27" fill="none" stroke="#FCD34D" strokeWidth="4" strokeOpacity="0.9" />
    <path d="M 35 27 C 35 45, 75 45, 75 27" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" />
    {/* Valves */}
    <rect x="42" y="10" width="6" height="25" fill="#F59E0B" fillOpacity="0.9" rx="1" />
    <rect x="52" y="10" width="6" height="25" fill="#F59E0B" fillOpacity="0.9" rx="1" />
    <rect x="62" y="10" width="6" height="25" fill="#F59E0B" fillOpacity="0.9" rx="1" />
    {/* Valve caps */}
    <rect x="41" y="6" width="8" height="4" fill="#E5E7EB" fillOpacity="0.9" rx="1" />
    <rect x="51" y="6" width="8" height="4" fill="#E5E7EB" fillOpacity="0.9" rx="1" />
    <rect x="61" y="6" width="8" height="4" fill="#E5E7EB" fillOpacity="0.9" rx="1" />
    {/* Bell */}
    <path d="M 80 20 C 95 20, 105 5, 115 5 L 115 45 C 105 45, 95 30, 80 30 Z" fill="#F59E0B" fillOpacity="0.85" />
    <path d="M 80 20 C 95 20, 100 12, 110 8 C 100 18, 90 23, 80 23 Z" fill="#FFFFFF" fillOpacity="0.4" />
    <ellipse cx="115" cy="25" rx="4" ry="20" fill="#D97706" fillOpacity="0.9" />
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
        
        {/* SECTION 1 - YEŞİL/MOR TEMA (Satranç & Developer) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme1-bg overflow-hidden text-theme1-text selection:bg-white/30">
          
          <NetworkBackground />

          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
             <FloatingElement isMobile={isMobile} isBlurred animationType="orbit" className="top-[5%] right-[5%] sm:top-[15%] sm:right-[20%]" delay={2} duration={12}>
               <VectorQueen className="w-12 h-16 sm:w-16 sm:h-20" rotation="25deg" />
             </FloatingElement>
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
             <FloatingElement hoverProps={{ scale: 1.25, rotate: -5 }} isMobile={isMobile} animationType="float" className="md:hidden lg:hidden xl:hidden block top-[85%] right-[15%] sm:top-[50%] sm:left-[25%]" delay={1.2} duration={9}>
               <VectorRook className="w-14 h-16 sm:w-16 sm:h-24" rotation="-5deg" />
             </FloatingElement>
             
             <FloatingElement hoverProps={{ scale: 1.25, rotate: 5 }} isMobile={isMobile} animationType="float" className="bottom-[15%] left-[8%] sm:bottom-[25%] sm:left-[15%] blur-[1px]" delay={0} duration={6}>
               <VectorPawn className="w-14 h-20 sm:w-20 sm:h-28 xl:w-32 xl:h-40 2xl:w-40 2xl:h-48" rotation="-10deg" />
             </FloatingElement>
             <FloatingElement hoverProps={{ filter: "drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.8))", scale: 1.15 }} isMobile={isMobile} animationType="drift" className="top-[15%] left-[5%] sm:top-[20%] sm:left-[12%]" delay={1.5} duration={8}>
               <VectorKing className="w-16 h-24 sm:w-24 sm:h-32 xl:w-36 xl:h-48 2xl:w-48 2xl:h-64" rotation="10deg" />
             </FloatingElement>
             <FloatingElement hoverProps={{ filter: "drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.8))", scale: 1.15 }} isMobile={isMobile} animationType="orbit" className="bottom-[20%] right-[5%] sm:bottom-[20%] sm:right-[15%] blur-[1px]" delay={0.8} duration={10}>
               <VectorQueen className="w-16 h-20 sm:w-24 sm:h-32 xl:w-36 xl:h-48 2xl:w-48 2xl:h-64" rotation="15deg" />
             </FloatingElement>
             <FloatingElement hoverProps={{ scale: 1.25, rotate: -5 }} isMobile={isMobile} animationType="float" className="top-[25%] right-[5%] sm:top-[30%] sm:right-[12%]" delay={2} duration={7}>
               <VectorKnight className="w-16 h-20 sm:w-20 sm:h-28 xl:w-32 xl:h-40 2xl:w-40 2xl:h-48" rotation="15deg" />
             </FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-40 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 0 ? "visible" : "hidden"} className="w-full pointer-events-auto mt-16 sm:mt-0">
              <motion.h1 variants={itemVariant} className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[110px] 2xl:text-[120px] font-black tracking-tight mb-2 drop-shadow-lg leading-none break-words">Merhaba, ben Mert.</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[55px] 2xl:text-[60px] font-bold tracking-tight mb-8 leading-none">Eğitim Teknolojileri Geliştiricisi</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-base md:text-lg xl:text-xl 2xl:text-2xl font-medium max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed tracking-wide text-white">Eğitim teknolojileri üzerine alışılagelmişin dışında uygulamalar geliştiriyorum. Amacım, öğrenme süreçlerini sıkıcı ezber kalıplarından kurtararak teknolojinin sunduğu imkanlarla interaktif bir hale getirmek.</motion.p>
            </motion.div>
          </div>

        </section>

        {/* SECTION 2 - MERCAN TEMA (Fiziksel Savrulma Etkileşimli Uçan Balonlar) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme2-bg overflow-hidden text-white selection:bg-white/30">
          
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <FloatingElement disableTap={true} hoverProps={{ x: -60, y: -20, rotate: -35, transition: { type: "spring", stiffness: 150, damping: 12 } }} isMobile={isMobile} isBlurred animationType="balloon" className="left-[5%] sm:left-[25%]" delay={0} duration={9}>
              <VectorBalloon color="#F2B8D1" className="w-12 sm:w-20 lg:w-24 xl:w-32 2xl:w-40 text-[5vw] sm:text-[35px] xl:text-[45px] 2xl:text-[60px]" rotation="-5deg">÷</VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: 50, y: -40, rotate: 30, transition: { type: "spring", stiffness: 150, damping: 12 } }} isMobile={isMobile} isBlurred animationType="balloon" className="right-[5%] sm:right-[15%]" delay={4} duration={12}>
              <VectorBalloon color="#FFE24A" className="w-10 sm:w-16 lg:w-20 xl:w-28 2xl:w-36 text-[4vw] sm:text-[30px] xl:text-[40px] 2xl:text-[50px]" rotation="10deg">=</VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: -30, y: -60, rotate: -20, transition: { type: "spring", stiffness: 150, damping: 12 } }} isMobile={isMobile} isBlurred animationType="balloon" className="left-[80%] sm:left-[50%]" delay={2} duration={15}>
               <VectorBalloon color="#FFFFFF" className="w-10 sm:w-14 lg:w-16 xl:w-24 2xl:w-32 text-[4vw] sm:text-[25px] xl:text-[35px] 2xl:text-[45px]" rotation="-8deg">-</VectorBalloon>
            </FloatingElement>
            
            <FloatingElement disableTap={true} hoverProps={{ x: 70, y: -30, rotate: 40, transition: { type: "spring", stiffness: 200, damping: 15 } }} isMobile={isMobile} animationType="balloon" className="right-[5%] sm:right-[20%] blur-[1px]" delay={1} duration={8}>
              <VectorBalloon color="#F2B8D1" className="w-16 sm:w-24 lg:w-32 xl:w-40 2xl:w-56 text-[6vw] sm:text-[50px] xl:text-[60px] 2xl:text-[80px]" rotation="8deg">5</VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: -80, y: -40, rotate: -45, transition: { type: "spring", stiffness: 200, damping: 15 } }} isMobile={isMobile} animationType="balloon" className="left-[2%] sm:left-[10%]" delay={5} duration={10}>
              <VectorBalloon color="#FFE24A" className="w-20 sm:w-28 lg:w-40 xl:w-52 2xl:w-72 text-[7vw] sm:text-[60px] xl:text-[80px] 2xl:text-[100px]" rotation="-12deg">
                <span>2<sup className="text-[4vw] sm:text-[30px] lg:text-[35px] xl:text-[45px] 2xl:text-[60px] ml-1">3</sup></span>
              </VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: -60, y: 50, rotate: -30, transition: { type: "spring", stiffness: 200, damping: 15 } }} isMobile={isMobile} animationType="balloon" className="left-[15%] sm:left-[25%] blur-sm" delay={3} duration={11}>
              <VectorBalloon color="#FFFFFF" className="w-14 sm:w-20 lg:w-28 xl:w-36 2xl:w-48 text-[5vw] sm:text-[40px] xl:text-[50px] 2xl:text-[70px]" rotation="12deg">×</VectorBalloon>
            </FloatingElement>
            <FloatingElement disableTap={true} hoverProps={{ x: 60, y: 40, rotate: 35, transition: { type: "spring", stiffness: 200, damping: 15 } }} isMobile={isMobile} animationType="balloon" className="right-[15%] sm:right-[30%]" delay={7} duration={9}>
              <VectorBalloon color="#FFFFFF" className="w-16 sm:w-24 lg:w-32 xl:w-40 2xl:w-56 text-[6vw] sm:text-[50px] xl:text-[65px] 2xl:text-[85px]" rotation="-5deg">+</VectorBalloon>
            </FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-30 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 1 ? "visible" : "hidden"} className="w-full pointer-events-auto mt-16 sm:mt-0">
              <motion.h1 variants={itemVariant} className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[110px] 2xl:text-[120px] font-black tracking-tight mb-2 drop-shadow-lg leading-none break-words">Oyunlaştırılmış</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[55px] 2xl:text-[60px] font-bold text-theme2-shape tracking-tight mb-8 leading-none">özel ürünler</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-base md:text-lg xl:text-xl 2xl:text-2xl font-medium max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed tracking-wide text-white">İngilizce, müzik, bilişim teknolojileri, matematik ve yaratıcı kodlama alanlarında prototipler tasarlıyorum. Sıradan arayüzlerin aksine akılda kalıcı, sade ama etkileşimli metotları tercih ediyorum.</motion.p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 - MOR TEMA (Gerçekçi Müzik & Viyolin & Trompet) */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-theme3-bg overflow-hidden text-theme3-title selection:bg-theme3-shape/40">
          
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {/* Genişlik (width) sınıfları Section 1 oranlarına sabitlendi */}
            <FloatingElement hoverProps={{ scale: 1.25, rotate: -5 }} isMobile={isMobile} animationType="orbit" className="top-[10%] left-[5%] sm:top-[10%] sm:left-[5%] md:top-[15%] md:left-[10%]" delay={0.5} duration={10}>
               <VectorPiano className="w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] 2xl:w-[220px] h-auto" rotation="-15deg" />
            </FloatingElement>
            <FloatingElement hoverProps={{ scale: 1.25, rotate: 5 }} isMobile={isMobile} animationType="float" className="bottom-[15%] left-[5%] sm:bottom-[20%] sm:left-[8%] md:bottom-[20%] md:left-[15%] blur-[2px]" delay={1.5} duration={6}>
               <VectorNotes className="w-[70px] sm:w-[80px] md:w-[90px] lg:w-[110px] xl:w-[130px] 2xl:w-[160px] h-auto" rotation="10deg" />
            </FloatingElement>
            <FloatingElement hoverProps={{ scale: 1.25, rotate: -5 }} isMobile={isMobile} animationType="drift" className="top-[20%] right-[5%] sm:top-[20%] sm:right-[5%] md:top-[15%] md:right-[10%]" delay={0.8} duration={12}>
               <VectorDrum className="w-[80px] sm:w-[100px] md:w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-auto" rotation="20deg" />
            </FloatingElement>
            <FloatingElement hoverProps={{ scale: 1.25, rotate: 5 }} isMobile={isMobile} animationType="float" className="bottom-[15%] right-[10%] sm:bottom-[15%] sm:right-[10%] md:bottom-[15%] md:right-[15%]" delay={2} duration={7}>
               <VectorGuitar className="w-[90px] sm:w-[110px] md:w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[190px] h-auto" rotation="-25deg" />
            </FloatingElement>
            <FloatingElement hoverProps={{ scale: 1.25, rotate: -5 }} isMobile={isMobile} animationType="orbit" className="top-[45%] right-[15%] sm:top-[50%] sm:right-[25%]" delay={2.5} duration={11}>
               <VectorViolin className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[190px] h-auto" rotation="15deg" />
            </FloatingElement>
            <FloatingElement hoverProps={{ scale: 1.25, rotate: 10 }} isMobile={isMobile} animationType="drift" className="top-[60%] left-[25%] sm:top-[65%] sm:left-[35%] md:top-[70%] md:left-[35%]" delay={1.2} duration={9}>
               <VectorTrumpet className="w-[110px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[220px] 2xl:w-[260px] h-auto" rotation="-15deg" />
            </FloatingElement>
          </div>

          <div className="container mx-auto px-6 relative z-40 text-center flex flex-col items-center w-full pointer-events-none">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 2 ? "visible" : "hidden"} className="w-full pointer-events-auto mt-16 sm:mt-0">
              <motion.h1 variants={itemVariant} className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[110px] 2xl:text-[120px] font-black tracking-tight mb-2 drop-shadow-md leading-none break-words text-theme3-title">Mikro Seviyede</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[55px] 2xl:text-[60px] font-bold text-theme3-shape tracking-tight mb-8 leading-none drop-shadow-sm">öğrenme</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-base md:text-lg xl:text-xl 2xl:text-2xl font-medium max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed tracking-wide text-white">Geliştirdiğim ürünler genelde mikro seviyede kavramların öğrenilmesi üzerine kurulu yaratıcı örneklerdir. Kullanıcının kafasının karışmaması adına ürünlerimi minimal ölçütte tutmayı tercih ediyorum.</motion.p>
            </motion.div>
          </div>

        </section>

      </motion.div>
    </div>
  );
};

export default Index;