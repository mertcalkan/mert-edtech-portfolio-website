import { useNavigate } from "react-router-dom";

export const Works = () => {
  const navigate = useNavigate();

  const categories = [
    {
      path: "/fotograf-duzenleme",
      image: "/fotoduzenleme.png",
    },
    {
      path: "/sosyal-medya",
      image: "/sosyalmedya.png",
    },
    {
      path: "/dijital-cizim",
      image: "/dijitalcizerlik.png",
    },
    {
      path: "/video-editleri",
      image: "/videoeditleme1.png",
    },
  ];

  return (
    <section id="works" className="py-16 px-6">
      <div className="font-forma container mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
          Çalışmalarım
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Kategorilere tıklayarak ilgili galeriye ulaşabilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(cat.path);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            // Hover efekti için "group" class'ı buraya eklendi
            className="cursor-pointer overflow-hidden rounded-xl relative aspect-[4/3] bg-neutral-900 group"
          >
            <img
              src={cat.image}
              alt="Çalışma Kategorisi"
              // transition ve hover durumundaki scale değerleri eklendi
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};