"use client"
import ImageGalleryPopup from "@/components/ImageGalleryPopup"
import { useState } from "react"
import { photoEditing } from "@/data/fotografduzenleme.ts"
import Navigation from "@/components/Navigation"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";
export const FotografDuzenleme = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupIndex, setPopupIndex] = useState(0)
   const navigate = useNavigate()
  const openPopup = (index: number) => {
    setPopupIndex(index)
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <section id="fotografduzenleme" className="relative z-0 py-5">
         <Navigation /> 
      <div className="container mx-auto px-4 py-20">
        <div className="font-forma text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-wide">
            Fotoğraf Düzenleme
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fotoğraf düzenleme çalışmalarımı buradan inceleyebilirsiniz.
          </p>
        </div>
    <div className="flex justify-center mb-10">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" }); // Sayfanın en üstüne kaydır
            }}
            className="font-forma px-6 py-3 text-lg flex items-center gap-2 hover:bg-accent/10 transition"
          >
            <span className="text-xl">←</span>
            Geri Dön
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {photoEditing.map((art, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-muted cursor-pointer aspect-[3/4]"
              onClick={() => openPopup(index)}
            >
              <img
                src={art.image}
             
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

        <ImageGalleryPopup 
       items={photoEditing.map((art, idx) => ({
         id: idx,
         src: art.image,
         alt: "",
         type: art.type
       }))}
       initialIndex={popupIndex}
       isOpen={isPopupOpen}
       onClose={closePopup}
     />
    </section>
  )
}