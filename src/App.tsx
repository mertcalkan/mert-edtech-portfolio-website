import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Loader } from "@react-three/drei"
import Navigation from "./components/Navigation"
import Projects from "./pages/Projects"
import Index from "./pages/Index"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

// Sadece Fade-In (Belirme) efekti. Eski sayfa anında silinir (kasmayı önler), yeni sayfa yumuşakça gelir.
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="absolute inset-0 w-full h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black">
      {/* AnimatePresence KALDIRILDI. Çift Canvas render edilmesinin ve kasmanın önüne geçildi. */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/hakkimda" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/iletisim" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/projeler" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>

    {/* 3D Modellerin yüklenmesini dinleyen Global Loader */}
    <Loader 
      containerStyles={{ backgroundColor: "#000000" }} 
      innerStyles={{ width: "300px" }} 
      barStyles={{ backgroundColor: "#eaff00", height: "4px" }} 
      dataStyles={{ color: "white", fontSize: "16px", fontFamily: "sans-serif", fontWeight: "bold" }} 
      dataInterpolation={(p) => `Modeller Hazırlanıyor... ${p.toFixed(0)}%`}
    />
  </QueryClientProvider>
)

export default App