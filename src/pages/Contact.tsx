import { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Sphere, Cylinder, Torus } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "../hooks/use-mobile";

const ResponsiveWrapper = ({ children, isMobile }: { children: React.ReactNode, isMobile: boolean }) => {
  const { viewport } = useThree();
  // Mobilde boyut %25 oranında küçültüldü (* 0.75)
  const scale = isMobile ? Math.min(1, viewport.width / 8) * 0.75 : Math.min(1, viewport.width / 18);
  return <group scale={scale}>{children}</group>;
};

// --- 3D KİMYA OBJELERİ ---
const Atom = ({ position, rotation }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group position={position} rotation={rotation} ref={groupRef} scale={1.2}>
        <Sphere args={[0.4, 32, 32]}><meshPhysicalMaterial color="#ff0055" roughness={0.1} clearcoat={1} /></Sphere>
        <Torus args={[1, 0.04, 16, 64]} rotation={[Math.PI / 2, 0, 0]}><meshStandardMaterial color="#00e5ff" /></Torus>
        <Torus args={[1, 0.04, 16, 64]} rotation={[0, Math.PI / 2, 0]}><meshStandardMaterial color="#eaff00" /></Torus>
        <Torus args={[1, 0.04, 16, 64]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#10b981" /></Torus>
        <Sphere args={[0.15]} position={[1, 0, 0]}><meshStandardMaterial color="#00e5ff" /></Sphere>
        <Sphere args={[0.15]} position={[0, 1, 0]}><meshStandardMaterial color="#eaff00" /></Sphere>
        <Sphere args={[0.15]} position={[0, 0, 1]}><meshStandardMaterial color="#10b981" /></Sphere>
      </group>
    </Float>
  );
};

const Flask = ({ position, rotation }: any) => (
  <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
    <group position={position} rotation={rotation} scale={1.2}>
      <Cylinder args={[0.2, 0.8, 1.5, 32]} position={[0, -0.5, 0]}>
        <meshPhysicalMaterial color="#8b5cf6" roughness={0.1} metalness={0.1} transmission={0.9} thickness={0.5} clearcoat={1} />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 0.8, 32]} position={[0, 0.6, 0]}>
        <meshPhysicalMaterial color="#8b5cf6" roughness={0.1} metalness={0.1} transmission={0.9} thickness={0.5} clearcoat={1} />
      </Cylinder>
      <Torus args={[0.25, 0.05, 16, 32]} position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} />
      </Torus>
    </group>
  </Float>
);

const TestTube = ({ position, rotation }: any) => (
  <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
    <group position={position} rotation={rotation} scale={1.2}>
      <Cylinder args={[0.25, 0.25, 2, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#00e5ff" roughness={0.1} metalness={0.1} transmission={0.9} thickness={0.5} clearcoat={1} />
      </Cylinder>
      <Sphere args={[0.25, 32, 16]} position={[0, -1, 0]}>
        <meshPhysicalMaterial color="#00e5ff" roughness={0.1} metalness={0.1} transmission={0.9} thickness={0.5} clearcoat={1} />
      </Sphere>
      <Torus args={[0.3, 0.05, 16, 32]} position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} />
      </Torus>
    </group>
  </Float>
);

const Molecule = ({ position, rotation }: any) => (
  <Float speed={1.4} rotationIntensity={1} floatIntensity={0.9}>
    <group position={position} rotation={rotation} scale={1.2}>
      <Sphere args={[0.4]} position={[0, 0, 0]}><meshPhysicalMaterial color="#ffaa00" roughness={0.2} clearcoat={1} /></Sphere>
      <Sphere args={[0.25]} position={[1, 1, 0]}><meshPhysicalMaterial color="#ff0055" roughness={0.2} clearcoat={1} /></Sphere>
      <Sphere args={[0.25]} position={[-1, 0.5, 0.8]}><meshPhysicalMaterial color="#10b981" roughness={0.2} clearcoat={1} /></Sphere>
      <Cylinder args={[0.05, 0.05, 1.5]} position={[0.5, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}><meshStandardMaterial color="#ffffff" /></Cylinder>
      <Cylinder args={[0.05, 0.05, 1.4]} position={[-0.5, 0.25, 0.4]} rotation={[Math.PI / 4, 0, Math.PI / 3]}><meshStandardMaterial color="#ffffff" /></Cylinder>
    </group>
  </Float>
);

const ChemistryScene = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Environment preset="studio" />
      <ResponsiveWrapper isMobile={isMobile}>
        {/* Mobilde 4 Asset: 2'si üstte, 2'si altta, Y eksenleri yazıya yaklaştırıldı */}
        <Atom position={isMobile ? [-2, 6, -1] : [-8, 4, -2]} rotation={[0.2, 0.5, 0]} />
        <Flask position={isMobile ? [2, 6.5, -1] : [8, -4, -3]} rotation={[-0.2, 0, 0.3]} />
        <TestTube position={isMobile ? [-2.5, -6, 1] : [-7, -4, 1]} rotation={[0, 0, -0.5]} />
        <Molecule position={isMobile ? [2, -6, -2] : [7, 5, -2]} rotation={[0.5, -0.4, 0.2]} />
      </ResponsiveWrapper>
    </>
  );
};

// --- İLETİŞİM SAYFASI ---
const Contact = () => {
  const isMobile = useIsMobile();
  
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden font-questrial selection:bg-white/30 text-white bg-black">
      <section className="relative h-[100dvh] w-full flex items-center justify-center bg-[#0f766e] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ChemistryScene isMobile={isMobile} />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
          <motion.div variants={containerVariant} initial="hidden" animate="visible" className="w-full">
            <motion.h1 variants={itemVariant} className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-4 drop-shadow-lg leading-none break-words">
              BENİMLE İLETİŞİME GEÇ
            </motion.h1>
            
            <motion.p variants={itemVariant} className="text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/95 mb-8">
              Benimle aşağıdaki yöntemler ile iletişime geçebilirsin.
            </motion.p>
            
            <motion.a 
              href="mailto:mertcalkan2001@gmail.com" 
              variants={itemVariant} 
              className="text-[5vw] sm:text-2xl md:text-4xl font-serif italic text-[#eaff00] tracking-tight mb-12 drop-shadow-md hover:text-white transition-colors duration-300 block"
            >
              mertcalkan2001@gmail.com
            </motion.a>

            <motion.div variants={itemVariant} className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-base font-bold tracking-widest uppercase">
              {['Linkedin', 'Gmail', 'Instagram', 'Youtube'].map((social) => (
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