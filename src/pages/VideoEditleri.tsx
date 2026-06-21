"use client";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function VideoEditleri() {
  const navigate = useNavigate();

  // NOT: Bu verileri ileride "src/data/videoeditleme.ts" gibi bir dosyaya taşıyıp oradan import edebilirsin.
  // Şimdilik tasarımın nasıl durduğunu görmen için örnek videolar ekledim.
  const longVideos = [
    { id: 1, src: "/ornek-uzun-video1.mp4" },
    { id: 2, src: "/ornek-uzun-video2.mp4" },
    { id: 3, src: "/ornek-uzun-video3.mp4" },
  ];

  const shortVideos = [
    { id: 1, src: "/ornek-kisa-video1.mp4" },
    { id: 2, src: "/ornek-kisa-video2.mp4" },
    { id: 3, src: "/ornek-kisa-video3.mp4" },
    { id: 4, src: "/ornek-kisa-video4.mp4" },
  ];

  return (
    <section id="video-editleme" className="relative z-0 py-5">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        
        {/* Başlık Alanı */}
        <div className="font-forma text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-wide">
            Video Editörlüğü
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uzun ve kısa formatlı kurgu ve edit çalışmalarımı buradan inceleyebilirsiniz.
          </p>
        </div>

        {/* Geri Dön Butonu */}
        <div className="flex justify-center mb-16">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-forma px-6 py-3 text-lg flex items-center gap-2 hover:bg-accent/10 transition"
          >
            <span className="text-xl">←</span>
            Geri Dön
          </Button>
        </div>

        {/* --- UZUN VİDEOLAR BÖLÜMÜ --- */}
        <div className="mb-20">
          <h3 className="text-3xl  text-foreground mb-8 border-b border-muted pb-4 font-forma">
            Uzun Videolar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {longVideos.map((video) => (
              <div
                key={video.id}
                // Uzun videolar için 16:9 oranı
                className="overflow-hidden rounded-xl bg-muted group aspect-video"
              >
                <video
                  src={video.src}
                  controls
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- KISA VİDEOLAR BÖLÜMÜ --- */}
        <div>
          <h3 className="text-3xl  text-foreground mb-8 border-b border-muted pb-4 font-forma">
            Kısa Videolar 
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shortVideos.map((video) => (
              <div
                key={video.id}
                // Kısa videolar (Reels/Tiktok) için 9:16 oranı
                className="overflow-hidden rounded-xl bg-muted group aspect-[9/16]"
              >
                <video
                  src={video.src}
                  controls
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}