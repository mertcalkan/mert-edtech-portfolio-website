import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { scrollToSection } from "@/utils/scrollToSection";

const AboutSection = () => (
  <section
    id="about"
    className="portfolio-hero flex items-center justify-center px-6 border-b border-white/50"
  >
    <div className="container max-w-3xl mx-xl py-24">
      <div className="portfolio-fade-in flex flex-col md:flex-row items-center gap-12">
        <div className="flex-shrink-0">
          {/* <img
            src={profilePhoto}
            alt="Mustafa Yiğit Bilal"
            className="w-48 h-48 rounded-full object-cover profile-image"
          /> */}
        </div>
        <div className="font-forma flex-1 text-left">
          <div className="mb-2">
            <span className="text-muted-foreground text-m tracking-wide">
              Grafik Tasarım • Dijital Sanat • İllüstrasyon • Fotoğrafçılık • Video Editörlüğü
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-forma font-bold mb-6 text-foreground tracking-wide">
            Mustafa Yiğit Bilal
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed mb-6 tracking-wide">
            Lisede Grafik ve Fotoğrafçılık eğitimi aldım.
            <br />
            4 yıl boyunca farklı tasarım ajanslarında görev yaptım.
            <br />
            Bu süreçte 3D tasarım ve geliştirici tasarım projelerime katkı
            sağladım.
            <br />
            Markalar için kimlik tasarımı ve kurumsal görsel çalışmalar
            ürettim.
            <br />
            Ayrıca 1 yıl boyunca NFT sektörü, dijital çizim, oyun tasarımı ve
            çizgi roman alanlarında aktif olarak üretimler yaptım.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
