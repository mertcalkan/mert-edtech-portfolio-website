import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"

// Sayfaları daha sonra oluşturacağız, şimdilik Index'i Hakkımda olarak kullanabiliriz
import Index from "./pages/Index" 
import NotFound from "./pages/NotFound"
// import Projects from "./pages/Projects" // Projeler sayfası hazır olunca açarız
// import Contact from "./pages/Contact"   // İletişim sayfası hazır olunca açarız

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Navigation her sayfada üstte sabit kalacak */}
        <Navigation />
        <Routes>
          {/* Ana sayfa -> Hakkımda */}
          <Route path="/" element={<Index />} />
          
          {/* Yeni Sayfalar (Dosyaları oluşturdukça buraları Index yerine kendi componentleriyle değiştireceğiz) */}
          <Route path="/projeler" element={<Index />} /> 
          <Route path="/iletisim" element={<Index />} />

          {/* 404 sayfası */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App