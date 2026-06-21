import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface GalleryModalProps {
  images: Array<{
    src: string;
    alt: string;
    title: string;
    description: string;
  }>;
  children: React.ReactNode;
  initialIndex?: number;
}

export const GalleryModal = ({ images, children, initialIndex = 0 }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [open, setOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent 
        className="max-w-4xl w-full bg-black/95 border-none p-0"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={prevImage}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={nextImage}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Image */}
          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-[70%] object-contain rounded-lg"
            />
            
            {/* Image info */}
            <div className="mt-6 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">
                {images[currentIndex].title}
              </h3>
              <p className="text-gray-300 max-w-2xl">
                {images[currentIndex].description}
              </p>
              {images.length > 1 && (
                <p className="text-sm text-gray-400 mt-4">
                  {currentIndex + 1} / {images.length}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};