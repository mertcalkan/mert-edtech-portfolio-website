import { useRef, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Box, Text3D, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "../hooks/use-mobile";

// --- DİNAMİK MOBİL ÖLÇEKLEYİCİ ---
const ResponsiveWrapper = ({ children, isMobile }: { children: React.ReactNode, isMobile: boolean }) => {
  const { viewport } = useThree();
  // Mobilde boyut %25 oranında küçültüldü (* 0.75)
  const scale = isMobile ? Math.min(1, viewport.width / 8) * 0.75 : Math.min(1, viewport.width / 18);
  return <group scale={scale}>{children}</group>;
};

// --- 3D ARKA PLAN SAHNELERİ ---

// 1. Section: Çözülmüş Zeka Küpü (2 Asset -> 1 Üst, 1 Alt)
const RubiksCube = ({ position, rotation, scale }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2 + rotation[0];
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + rotation[1];
    }
  });

  const cubes = [];
  const offset = 1.02;
  const colors = ['#10b981', '#ffaa00', '#ffffff', '#eaff00', '#00e5ff', '#8b5cf6'];
  const black = '#111111'; 

  for(let x=-1; x<=1; x++) {
    for(let y=-1; y<=1; y++) {
      for(let z=-1; z<=1; z++) {
        const mats = [
          x === 1 ? colors[0] : black, x === -1 ? colors[1] : black,
          y === 1 ? colors[2] : black, y === -1 ? colors[3] : black,
          z === 1 ? colors[4] : black, z === -1 ? colors[5] : black,
        ];
        cubes.push(
          <mesh key={`${x}-${y}-${z}`} position={[x * offset, y * offset, z * offset]}>
            <boxGeometry args={[1, 1, 1]} />
            {mats.map((c, i) => (
              <meshStandardMaterial key={i} attach={`material-${i}`} color={c} roughness={0.6} metalness={0.1} />
            ))}
          </mesh>
        );
      }
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>{cubes}</group>
    </Float>
  );
};

const RubiksCubeScene = ({ isMobile }: { isMobile: boolean }) => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={1.5} />
    <Environment preset="city" />
    <ResponsiveWrapper isMobile={isMobile}>
      {/* Mobilde Y ekseni 4.5 ve -4.5 olarak yazıya yaklaştırıldı */}
      <RubiksCube position={isMobile ? [0, 6, -1] : [-6, 3, -2]} rotation={[0.5, 0.5, 0]} scale={0.45} />
      <RubiksCube position={isMobile ? [0, -6, -1] : [6, -3, -1]} rotation={[-0.2, 0.8, 0]} scale={0.55} />
    </ResponsiveWrapper>
  </>
);

// 2. Section: 3D Etkileşimli Sayılar (6 Asset -> 3 Üst, 3 Alt)
const InteractiveNumber = ({ num, pos, color }: any) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={3}>
      <Text3D
        font="https://unpkg.com/three@0.149.0/examples/fonts/helvetiker_bold.typeface.json"
        size={2}
        height={0.5}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelSegments={5}
        position={pos}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial
          color={hovered ? '#ffffff' : color}
          roughness={hovered ? 0.2 : 0.1}
          metalness={hovered ? 0.8 : 0.6}
          clearcoat={hovered ? 0.5 : 1}
          clearcoatRoughness={0.1}
        />
        {num}
      </Text3D>
    </Float>
  );
};

const NumbersScene = ({ isMobile }: { isMobile: boolean }) => {
const numbers = [
  { num: '0', deskPos: [-4, 3, -2], mobPos: [-4, 4.5, -1], color: '#00e5ff' }, // Üst Sol (0.5 aşağı)
  { num: '1', deskPos: [-1, 3, -2], mobPos: [-1, 4.5, -1], color: '#eaff00' }, // Üst Orta (0.5 aşağı)
  { num: '3', deskPos: [2, 3, -2], mobPos: [2, 4.5, -1], color: '#ff0055' },   // Üst Sağ (0.5 aşağı)
  { num: '5', deskPos: [-4, -4.75, -2], mobPos: [-4, -5.75, -1], color: '#00e5ff' }, // Alt Sol (0.5 yukarı)
  { num: '8', deskPos: [-1, -5.5, -2], mobPos: [-1, -5.25, -1], color: '#eaff00' }, // Alt Orta (0.5 yukarı)
  { num: '9', deskPos: [2, -5.5, -2], mobPos: [2, -5.25, -1], color: '#ff0055' },   // Alt Sağ (0.5 yukarı)
];




  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[-5, 5, 5]} intensity={2} />
      <Environment preset="city" />
      <ResponsiveWrapper isMobile={isMobile}>
        <Suspense fallback={null}>
          {numbers.map((item, i) => (
            <InteractiveNumber key={i} num={item.num} pos={isMobile ? item.mobPos : item.deskPos} color={item.color} />
          ))}
        </Suspense>
      </ResponsiveWrapper>
    </>
  );
};

// 3. Section: 3D Müzik Notaları ve Piyano (4 Asset -> 2 Üst, 2 Alt)
const SingleNote = ({ position, rotation, color }: any) => (
  <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
    <group position={position} rotation={rotation} scale={0.8}>
      <Sphere args={[0.6, 32, 32]} position={[-0.6, 0, 0]} scale={[1.2, 0.8, 1]} rotation={[0, 0, 0.2]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Sphere>
      <Cylinder args={[0.1, 0.1, 2.5, 16]} position={[0, 1.25, 0]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Cylinder>
      <Box args={[0.8, 0.2, 0.1]} position={[0.4, 2.4, 0]} rotation={[0, 0, -0.3]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Box>
    </group>
  </Float>
);

const DoubleNote = ({ position, rotation, color }: any) => (
  <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.7}>
    <group position={position} rotation={rotation} scale={0.7}>
      <Sphere args={[0.5, 32, 32]} position={[-1, 0, 0]} scale={[1.2, 0.8, 1]} rotation={[0, 0, 0.2]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Sphere>
      <Cylinder args={[0.1, 0.1, 2.5]} position={[-0.5, 1.25, 0]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Cylinder>
      <Sphere args={[0.5, 32, 32]} position={[1, 0, 0]} scale={[1.2, 0.8, 1]} rotation={[0, 0, 0.2]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Sphere>
      <Cylinder args={[0.1, 0.1, 2.5]} position={[1.5, 1.25, 0]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Cylinder>
      <Box args={[2.2, 0.2, 0.1]} position={[0.5, 2.4, 0]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Box>
    </group>
  </Float>
);

const TripleNote = ({ position, rotation, color }: any) => (
  <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
    <group position={position} rotation={rotation} scale={0.6}>
      <Sphere args={[0.5, 32, 32]} position={[-2, 0, 0]} scale={[1.2, 0.8, 1]} rotation={[0, 0, 0.2]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Sphere>
      <Cylinder args={[0.1, 0.1, 2.5]} position={[-1.5, 1.25, 0]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Cylinder>
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]} scale={[1.2, 0.8, 1]} rotation={[0, 0, 0.2]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Sphere>
      <Cylinder args={[0.1, 0.1, 2.5]} position={[0.5, 1.25, 0]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Cylinder>
      <Sphere args={[0.5, 32, 32]} position={[2, 0, 0]} scale={[1.2, 0.8, 1]} rotation={[0, 0, 0.2]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Sphere>
      <Cylinder args={[0.1, 0.1, 2.5]} position={[2.5, 1.25, 0]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Cylinder>
      <Box args={[4.2, 0.2, 0.1]} position={[0.5, 2.4, 0]}><meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} /></Box>
    </group>
  </Float>
);

const PianoKeys = ({ position, rotation }: any) => (
  <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
    <group position={position} rotation={rotation} scale={1.2}>
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <Box key={'w'+i} args={[0.35, 0.15, 1.5]} position={[i * 0.38 - 1.14, 0, 0]}>
          <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} />
        </Box>
      ))}
      {[0, 1, 3, 4, 5].map(i => (
        <Box key={'b'+i} args={[0.2, 0.25, 0.9]} position={[i * 0.38 - 0.95, 0.1, -0.3]}>
          <meshPhysicalMaterial color="#111111" roughness={0.1} clearcoat={1} />
        </Box>
      ))}
    </group>
  </Float>
);

const MusicScene = ({ isMobile }: { isMobile: boolean }) => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[0, 10, 5]} intensity={1.5} />
    <Environment preset="studio" />
    <ResponsiveWrapper isMobile={isMobile}>
      {/* Mobilde Y eksenleri 4.5 ve -4.5 olarak yazıya yaklaştırıldı */}
      <SingleNote position={isMobile ? [-2, 4.5, -1] : [-6, 2, -2]} rotation={[0.2, 0.5, 0.1]} color="#ff00a0" />
      <DoubleNote position={isMobile ? [2, 4.5, -1] : [6, 3, -3]} rotation={[-0.2, 0.6, -0.1]} color="#00ffcc" />
      <TripleNote position={isMobile ? [-2.5, -4.5, -1] : [5, -3, -1]} rotation={[-0.1, -0.4, -0.2]} color="#ffaa00" />
      <PianoKeys position={isMobile ? [1.5, -4.5, 0] : [-4, -3, 0]} rotation={[0.3, 0.5, 0.2]} />
    </ResponsiveWrapper>
  </>
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
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden font-questrial selection:bg-white/30 text-white bg-black">
      <motion.div
        className="w-full h-[300dvh] flex flex-col"
        animate={{ y: `-${currentSection * 100}dvh` }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }} 
      >
        
        {/* SECTION 1 */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-[#ff2a5f] overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
               <RubiksCubeScene isMobile={isMobile} />
            </Canvas>
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 0 ? "visible" : "hidden"} className="w-full">
              <motion.h1 variants={itemVariant} className="text-[9.5vw] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase mb-2 drop-shadow-lg leading-none break-words">Merhaba, ben Mert.</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-cyan-300 tracking-tight mb-8 drop-shadow-md leading-none">eğitim teknolojileri</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-sm md:text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/95">Eğitim teknolojileri üzerine alışılagelmişin dışında uygulamalar geliştiriyorum. Amacım, öğrenme süreçlerini sıkıcı ezber kalıplarından kurtararak teknolojinin sunduğu imkanlarla interaktif bir hale getirmek.</motion.p>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-8 text-xs sm:text-sm font-bold tracking-widest opacity-80">2012/2026</div>
          <div className="absolute bottom-8 right-8 text-xs sm:text-sm font-bold tracking-widest opacity-80">01/03</div>
        </section>

        {/* SECTION 2 */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-[#5e00ff] overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <NumbersScene isMobile={isMobile} />
            </Canvas>
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 1 ? "visible" : "hidden"} className="w-full">
              <motion.h1 variants={itemVariant} className="text-[9vw] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase mb-2 drop-shadow-lg leading-none break-words">Oyunlaştırılmış</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-yellow-300 tracking-tight mb-8 drop-shadow-md leading-none">özel ürünler</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-sm md:text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/95">İngilizce, müzik, bilişim teknolojileri, matematik ve yaratıcı kodlama alanlarında prototipler tasarlıyorum. Sıradan arayüzlerin aksine akılda kalıcı, sade ama etkileşimli metotları tercih ediyorum.</motion.p>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-8 text-xs sm:text-sm font-bold tracking-widest opacity-80">2012/2026</div>
          <div className="absolute bottom-8 right-8 text-xs sm:text-sm font-bold tracking-widest opacity-80">02/03</div>
        </section>

        {/* SECTION 3 */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center bg-[#009dff] overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <MusicScene isMobile={isMobile} />
            </Canvas>
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
            <motion.div variants={containerVariant} initial="hidden" animate={currentSection === 2 ? "visible" : "hidden"} className="w-full">
              <motion.h1 variants={itemVariant} className="text-[9.5vw] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase mb-2 drop-shadow-lg leading-none break-words">Mikro Seviyede</motion.h1>
              <motion.h2 variants={itemVariant} className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#ff00a0] tracking-tight mb-8 drop-shadow-md leading-none">öğrenme</motion.h2>
              <motion.p variants={itemVariant} className="text-xs sm:text-sm md:text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/95">Geliştirdiğim ürünler genelde mikro seviyede kavramların öğrenilmesi üzerine kurulu yaratıcı örneklerdir. Kullanıcının kafasının karışmaması adına ürünlerimi minimal ölçütte tutmayı tercih ediyorum.</motion.p>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-8 text-xs sm:text-sm font-bold tracking-widest opacity-80">2012/2026</div>
          <div className="absolute bottom-8 right-8 text-xs sm:text-sm font-bold tracking-widest opacity-80">03/03</div>
        </section>

      </motion.div>
    </div>
  );
};

export default Index;