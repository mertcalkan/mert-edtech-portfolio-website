import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Box, Center, Text3D, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

// Fontu internetten çekmek yerine garanti olması için doğrudan lokal Three.js paketinden alıyoruz
// @ts-ignore
import fontData from "three/examples/fonts/helvetiker_bold.typeface.json";

// --- 3D ARKA PLAN SAHNELERİ ---

// 1. Section: Çözülmüş Zeka Küpü (Rubik's Cube) Bileşeni
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
  
  // Arka plan rengiyle (#ff2a5f) karışan pembe yüzey, Zümrüt Yeşili (#10b981) ile değiştirildi
  const colors = [
    '#10b981', // Yeşil (Yeni renk)
    '#ffaa00', // Turuncu
    '#ffffff', // Beyaz
    '#eaff00', // Sarı
    '#00e5ff', // Camgöbeği
    '#8b5cf6'  // Mor
  ];
  const black = '#111111'; 

  for(let x=-1; x<=1; x++) {
    for(let y=-1; y<=1; y++) {
      for(let z=-1; z<=1; z++) {
        const mats = [
          x === 1 ? colors[0] : black,
          x === -1 ? colors[1] : black,
          y === 1 ? colors[2] : black,
          y === -1 ? colors[3] : black,
          z === 1 ? colors[4] : black,
          z === -1 ? colors[5] : black,
        ];

        cubes.push(
          <mesh key={`${x}-${y}-${z}`} position={[x * offset, y * offset, z * offset]}>
            <boxGeometry args={[1, 1, 1]} />
            {mats.map((c, i) => (
              // Renk değiştirme illüzyonunu engellemek için mat ve stabil materyal kullanıldı
              <meshStandardMaterial 
                key={i} 
                attach={`material-${i}`} 
                color={c} 
                roughness={0.6} 
                metalness={0.1} 
              />
            ))}
          </mesh>
        );
      }
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>
        {cubes}
      </group>
    </Float>
  );
};

const RubiksCubeScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Environment preset="city" />
      <RubiksCube position={[-6, 3, -2]} rotation={[0.5, 0.5, 0]} scale={0.45} />
      <RubiksCube position={[6, -3, -1]} rotation={[-0.2, 0.8, 0]} scale={0.55} />
    </>
  );
};

// 2. Section: Gerçek 3D ve Parlak Sayılar
const NumbersScene = () => {
  const numbers = [
    { num: '0', pos: [-6, 3, -2], color: '#00e5ff' },
    { num: '1', pos: [5, -3, 1], color: '#eaff00' },
    { num: '3', pos: [-5, -3, 0], color: '#ff0055' },
    { num: '5', pos: [6, 3, -3], color: '#00e5ff' },
    { num: '8', pos: [0, 5, -1], color: '#eaff00' },
    { num: '9', pos: [3, -4, -2], color: '#ff0055' },
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[-5, 5, 5]} intensity={2} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        {numbers.map((item, i) => (
          <Float key={i} speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
            <Center position={item.pos as [number, number, number]}>
              <Text3D 
                font={fontData as any}
                size={2.5}
                height={0.6}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.06}
                bevelSize={0.04}
                bevelOffset={0}
                bevelSegments={5}
              >
                <meshPhysicalMaterial 
                  color={item.color} 
                  roughness={0.05} 
                  metalness={0.7} 
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              </Text3D>
            </Center>
          </Float>
        ))}
      </Suspense>
    </>
  );
};

// 3. Section: 3D Müzik Notaları ve Piyano

const SingleNote = ({ position, rotation, color }: any) => (
  <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
    <group position={position} rotation={rotation} scale={0.8}>
      <Sphere args={[0.6, 32, 32]} position={[-0.6, 0, 0]} scale={[1.2, 0.8, 1]} rotation={[0, 0, 0.2]}>
        <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} />
      </Sphere>
      <Cylinder args={[0.1, 0.1, 2.5, 16]} position={[0, 1.25, 0]}>
        <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} />
      </Cylinder>
      <Box args={[0.8, 0.2, 0.1]} position={[0.4, 2.4, 0]} rotation={[0, 0, -0.3]}>
        <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.5} clearcoat={1} />
      </Box>
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

// Piyano Klavyesi
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

const MusicScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1.5} />
      <Environment preset="studio" />
      
      <SingleNote position={[-6, 2, -2]} rotation={[0.2, 0.5, 0.1]} color="#ff00a0" />
      <DoubleNote position={[6, 3, -3]} rotation={[-0.2, 0.6, -0.1]} color="#00ffcc" />
      <TripleNote position={[5, -3, -1]} rotation={[-0.1, -0.4, -0.2]} color="#ffaa00" />
      <PianoKeys position={[-4, -3, 0]} rotation={[0.3, 0.5, 0.2]} />
    </>
  );
};


// --- ANA SAYFA BİLEŞENİ ---

const Index = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="font-questrial overflow-x-hidden selection:bg-white/30 text-white">
      
      {/* SECTION 1: Zeka Küpü */}
      <section className="relative h-screen w-full flex items-center justify-center bg-[#ff2a5f] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <RubiksCubeScene />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ amount: 0.4 }}>
            <motion.h1 variants={itemVariant} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase mb-2 drop-shadow-lg">
              Merhaba, ben Mert.
            </motion.h1>
            <motion.h2 variants={itemVariant} className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-cyan-300 tracking-tight mb-8 drop-shadow-md">
              eğitim teknolojileri
            </motion.h2>
            <motion.p variants={itemVariant} className="text-base md:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/95">
              Eğitim teknolojileri üzerine alışılagelmişin dışında uygulamalar geliştiriyorum. Amacım, öğrenme süreçlerini sıkıcı ezber kalıplarından kurtararak teknolojinin sunduğu imkanlarla interaktif bir hale getirmek.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-8 text-sm font-bold tracking-widest opacity-80">2012/2026</div>
        <div className="absolute bottom-8 right-8 text-sm font-bold tracking-widest opacity-80">01/03</div>
      </section>

      {/* SECTION 2: Sayılar */}
      <section className="relative h-screen w-full flex items-center justify-center bg-[#5e00ff] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <NumbersScene />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ amount: 0.4 }}>
            <motion.h1 variants={itemVariant} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase mb-2 drop-shadow-lg">
              Oyunlaştırılmış
            </motion.h1>
            <motion.h2 variants={itemVariant} className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-yellow-300 tracking-tight mb-8 drop-shadow-md">
              özel ürünler
            </motion.h2>
            <motion.p variants={itemVariant} className="text-base md:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/95">
              İngilizce, müzik, bilişim teknolojileri, matematik ve yaratıcı kodlama alanlarında prototipler tasarlıyorum. Sıradan arayüzlerin aksine akılda kalıcı, sade ama etkileşimli metotları tercih ediyorum.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-8 text-sm font-bold tracking-widest opacity-80">2012/2026</div>
        <div className="absolute bottom-8 right-8 text-sm font-bold tracking-widest opacity-80">02/03</div>
      </section>

      {/* SECTION 3: Müzik Notaları & Piyano */}
      <section className="relative h-screen w-full flex items-center justify-center bg-[#009dff] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <MusicScene />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ amount: 0.4 }}>
            <motion.h1 variants={itemVariant} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase mb-2 drop-shadow-lg">
              Mikro Seviyede
            </motion.h1>
            <motion.h2 variants={itemVariant} className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-[#ff00a0] tracking-tight mb-8 drop-shadow-md">
              öğrenme
            </motion.h2>
            <motion.p variants={itemVariant} className="text-base md:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed tracking-wide text-white/95">
              Geliştirdiğim ürünler genelde mikro seviyede kavramların öğrenilmesi üzerine kurulu yaratıcı örneklerdir. Kullanıcının kafasının karışmaması adına ürünlerimi minimal ölçütte tutmayı tercih ediyorum.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-8 text-sm font-bold tracking-widest opacity-80">2012/2026</div>
        <div className="absolute bottom-8 right-8 text-sm font-bold tracking-widest opacity-80">03/03</div>
      </section>

    </div>
  );
};

export default Index;