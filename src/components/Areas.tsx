const Areas = () => (
  <section id="areas" className="py-20 bg-portfolio-section-bg border-b border-white/50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-forma font-bold text-foreground mb-8 tracking-wide">
          Çalıştığım Alanlar
        </h2>
      </div>
      
      <div className="font-forma max-w-4xl mx-auto tracking-wide">
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div className="space-y-4 text-muted-foreground text-lg">
            <div>Grafik Tasarım</div>
            <div>Fotoğraf Düzenleme</div>
            <div>Video Editleme & Kurgu</div>
            <div>İllüstrasyon & Dijital Çizim</div>
            <div>Web Tasarım</div>
          </div>
          <div className="space-y-4 text-muted-foreground text-lg">
            <div>Kurumsal Kimlik Tasarım</div>
            <div>Post-prodüksiyon</div>
            <div>Sosyal Medya İçerik Üretimi & Yönetimi</div>
            <div>3D Tasarım</div>
            <div>Video Çekim & Kamera</div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Areas