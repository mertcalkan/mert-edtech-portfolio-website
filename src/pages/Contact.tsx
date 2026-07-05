import { motion } from "framer-motion";
import { Footer } from "../components/Footer";

// --- GERÇEKÇİ 2D KİMYA/BİLİM VEKTÖR BİLEŞENLERİ ---
const VectorFlask = ({
  className,
  rotation = "0deg",
}: {
  className?: string;
  rotation?: string;
}) => (
  <svg
    viewBox="0 0 100 120"
    className={className}
    style={{ transform: `rotate(${rotation})` }}
  >
    {/* Liquid */}
    <path
      d="M 30 100 L 70 100 Q 80 100 85 90 L 65 40 L 35 40 L 15 90 Q 10 100 30 100 Z"
      fill="#00e5ff"
      fillOpacity="0.85"
    />
    {/* Glass Body */}
    <path
      d="M 40 20 L 40 40 L 15 90 Q 5 110 30 110 L 70 110 Q 95 110 85 90 L 60 40 L 60 20 Z"
      fill="#ffffff"
      fillOpacity="0.15"
      stroke="#ffffff"
      strokeWidth="3"
      strokeOpacity="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Rim */}
    <rect
      x="35"
      y="15"
      width="30"
      height="6"
      rx="2"
      fill="#ffffff"
      fillOpacity="0.9"
    />
    {/* Markings */}
    <line
      x1="58"
      y1="55"
      x2="65"
      y2="55"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeOpacity="0.9"
      strokeLinecap="round"
    />
    <line
      x1="62"
      y1="70"
      x2="70"
      y2="70"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeOpacity="0.9"
      strokeLinecap="round"
    />
    <line
      x1="68"
      y1="85"
      x2="75"
      y2="85"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeOpacity="0.9"
      strokeLinecap="round"
    />
    {/* Glass Reflection */}
    <path
      d="M 22 85 L 36 45"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M 28 95 L 38 95"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

const VectorTestTube = ({
  className,
  rotation = "0deg",
}: {
  className?: string;
  rotation?: string;
}) => (
  <svg
    viewBox="0 0 60 120"
    className={className}
    style={{ transform: `rotate(${rotation})` }}
  >
    {/* Liquid */}
    <path
      d="M 15 50 L 45 50 L 45 100 Q 45 115 30 115 Q 15 115 15 100 Z"
      fill="#eaff00"
      fillOpacity="0.85"
    />
    {/* Glass */}
    <path
      d="M 15 15 L 15 100 Q 15 115 30 115 Q 45 115 45 100 L 45 15 Z"
      fill="#ffffff"
      fillOpacity="0.15"
      stroke="#ffffff"
      strokeWidth="3"
      strokeOpacity="0.8"
      strokeLinecap="round"
    />
    {/* Rim */}
    <rect
      x="10"
      y="10"
      width="40"
      height="6"
      rx="2"
      fill="#ffffff"
      fillOpacity="0.9"
    />
    {/* Bubbles */}
    <circle cx="25" cy="100" r="3" fill="#ffffff" fillOpacity="0.9" />
    <circle cx="35" cy="80" r="2.5" fill="#ffffff" fillOpacity="0.8" />
    <circle cx="28" cy="65" r="4" fill="#ffffff" fillOpacity="0.6" />
    <circle cx="32" cy="55" r="1.5" fill="#ffffff" fillOpacity="0.8" />
    {/* Glass Reflection */}
    <line
      x1="20"
      y1="30"
      x2="20"
      y2="95"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

const VectorAtom = ({
  className,
  rotation = "0deg",
}: {
  className?: string;
  rotation?: string;
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={{ transform: `rotate(${rotation})` }}
  >
    {/* Orbitals */}
    <ellipse
      cx="50"
      cy="50"
      rx="18"
      ry="45"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeOpacity="0.5"
      transform="rotate(0 50 50)"
    />
    <ellipse
      cx="50"
      cy="50"
      rx="18"
      ry="45"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeOpacity="0.5"
      transform="rotate(60 50 50)"
    />
    <ellipse
      cx="50"
      cy="50"
      rx="18"
      ry="45"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeOpacity="0.5"
      transform="rotate(120 50 50)"
    />
    {/* Nucleus */}
    <circle cx="50" cy="50" r="10" fill="#ff0055" fillOpacity="0.9" />
    <circle cx="47" cy="47" r="3" fill="#ffffff" fillOpacity="0.8" />
    <circle cx="53" cy="52" r="2" fill="#80002a" fillOpacity="0.5" />
    {/* Electrons */}
    <circle cx="50" cy="5" r="4" fill="#00e5ff" />
    <circle cx="11" cy="72" r="4" fill="#eaff00" />
    <circle cx="89" cy="72" r="4" fill="#ffffff" />
  </svg>
);

// YENİ 4. İKON: Mikroskop
const VectorMicroscope = ({
  className,
  rotation = "0deg",
}: {
  className?: string;
  rotation?: string;
}) => (
  <svg
    viewBox="0 0 100 120"
    className={className}
    style={{ transform: `rotate(${rotation})` }}
  >
    {/* Base */}
    <path
      d="M 20 110 L 80 110 Q 85 110 85 105 L 75 95 L 25 95 Q 15 110 20 110 Z"
      fill="#ffffff"
      fillOpacity="0.25"
      stroke="#ffffff"
      strokeWidth="3"
      strokeOpacity="0.8"
      strokeLinejoin="round"
    />
    {/* Arm */}
    <path
      d="M 70 95 Q 95 95 95 55 Q 95 25 70 25 L 55 25"
      fill="none"
      stroke="#ffffff"
      strokeWidth="12"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
    {/* Stage */}
    <rect
      x="25"
      y="75"
      width="45"
      height="5"
      rx="2"
      fill="#ffffff"
      fillOpacity="0.9"
    />
    {/* Tube */}
    <path
      d="M 38 20 L 52 20 L 52 65 L 38 65 Z"
      fill="#ffffff"
      fillOpacity="0.2"
      stroke="#ffffff"
      strokeWidth="3"
      strokeOpacity="0.8"
    />
    {/* Eyepiece */}
    <path
      d="M 40 10 L 50 10 L 48 20 L 42 20 Z"
      fill="#eaff00"
      fillOpacity="0.9"
    />
    <rect x="39" y="8" width="12" height="3" rx="1" fill="#ffffff" />
    {/* Objective Lens */}
    <path
      d="M 40 65 L 50 65 L 48 75 L 42 75 Z"
      fill="#00e5ff"
      fillOpacity="0.9"
    />
    <path d="M 44 75 L 46 75 L 45 78 Z" fill="#ffffff" />
    {/* Focus knob */}
    <circle cx="75" cy="60" r="9" fill="#ffffff" fillOpacity="0.9" />
    <circle cx="75" cy="60" r="5" fill="#0f766e" />
  </svg>
);

// --- ORTAK: 2D ETKİLEŞİMLİ VEKTÖR KAPSAYICI ---
const FloatingElement = ({
  children,
  delay = 0,
  duration = 4,
  className,
  hoverScale = 1.15,
}: any) => {
  return (
    <motion.div
      className={`absolute select-none pointer-events-auto opacity-30 md:opacity-100 ${className}`}
      animate={{
        y: ["-15px", "15px", "-15px"],
        rotate: [-2, 2, -2],
      }}
      transition={{
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "easeInOut",
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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden font-satoshi selection:bg-white/30 text-white bg-black">
      <section className="relative h-[100dvh] w-full flex items-center justify-center bg-[#0f766e] overflow-hidden">
        {/* 2D Vektörel Kimya Elementleri Arka Planı (Ölçüler Index.tsx'e tamamen eşitlendi) */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
          <FloatingElement
            className="top-[5%] -left-[10%] sm:top-[10%] sm:left-[2%] md:top-[15%] md:left-[5%] xl:top-[12%] xl:left-[8%]"
            delay={0}
            duration={5}
            hoverScale={1.2}
          >
            <VectorFlask
              className="w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] 2xl:w-[220px] h-auto"
              rotation="-15deg"
            />
          </FloatingElement>

          <FloatingElement
            className="bottom-[5%] -right-[10%] sm:bottom-[15%] sm:right-[2%] md:bottom-[20%] md:right-[5%] xl:bottom-[15%] xl:right-[10%]"
            delay={1.5}
            duration={6}
            hoverScale={1.2}
          >
            <VectorTestTube
              className="w-[70px] sm:w-[80px] md:w-[90px] lg:w-[110px] xl:w-[130px] 2xl:w-[160px] h-auto"
              rotation="20deg"
            />
          </FloatingElement>

          <FloatingElement
            className="bottom-[5%] -left-[10%] sm:bottom-[10%] sm:left-[2%] md:bottom-[15%] md:left-[5%] xl:bottom-[12%] xl:left-[8%]"
            delay={0.5}
            duration={4}
            hoverScale={1.2}
          >
            <VectorAtom
              className="w-[80px] sm:w-[100px] md:w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-auto"
              rotation="-10deg"
            />
          </FloatingElement>

          <FloatingElement
            className="top-[5%] -right-[10%] sm:top-[15%] sm:right-[2%] md:top-[20%] md:right-[5%] xl:top-[15%] xl:right-[8%]"
            delay={2}
            duration={5.5}
            hoverScale={1.2}
          >
            <VectorMicroscope
              className="w-[110px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[220px] 2xl:w-[260px] h-auto"
              rotation="15deg"
            />
          </FloatingElement>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <motion.h1
              variants={itemVariant}
              className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[110px] 2xl:text-[120px] font-black tracking-tight mb-4 drop-shadow-md leading-none break-words"
            >
              Benimle <span className="text-[#eaff00]">İletişime</span> Geç
            </motion.h1>

            <motion.p
              variants={itemVariant}
              className="text-xs sm:text-base md:text-lg xl:text-xl 2xl:text-2xl font-medium max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed tracking-wide text-white/95 mb-8"
            >
              Benimle aşağıdaki yöntemler ile iletişime geçebilirsin.
            </motion.p>

            {/* E-posta boyutu Index.tsx'deki H2 tagının (e.g. Eğitim Teknolojileri Geliştiricisi) font ölçülerine eşitlendi */}
            <motion.a
              href="mailto:mertcalkan2001@gmail.com"
              variants={itemVariant}
              className="text-[6vw] sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[55px] 2xl:text-[60px] font-bold italic text-[#eaff00] tracking-tight mb-12 drop-shadow-md hover:text-white transition-colors duration-300 block leading-none"
            >
              mertcalkan2001@gmail.com
            </motion.a>

            {/* Dairesel Şık Sosyal Medya İkonları */}
            <motion.div
              variants={itemVariant}
              className="flex flex-wrap justify-center gap-6 md:gap-8"
            >
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm hover:bg-[#eaff00] hover:text-[#0f766e] transition-all duration-300 drop-shadow-lg hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(234,255,0,0.5)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm hover:bg-[#eaff00] hover:text-[#0f766e] transition-all duration-300 drop-shadow-lg hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(234,255,0,0.5)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm hover:bg-[#eaff00] hover:text-[#0f766e] transition-all duration-300 drop-shadow-lg hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(234,255,0,0.5)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Contact;
