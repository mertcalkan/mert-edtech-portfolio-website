"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  type: "image" | "video";
  category?: string;
}

interface ImageGalleryPopupProps {
  items: GalleryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageGalleryPopup({
  items,
  initialIndex,
  isOpen,
  onClose,
}: ImageGalleryPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true); // Otomatik başlasın
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    // Video otomatik başlasın
    if (currentItem?.type === "video" && videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch(console.error);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
      if (event.key === " " && currentItem?.type === "video") {
        event.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    if (currentItem?.type === "video") {
      togglePlayPause();
    }
  };

  const getFileName = (src: string) => {
    return src.split("/").pop()?.split(".")[0] || "";
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0 bg-gray/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 z-50 bg-white/10 text-white hover:bg-white/20 w-14 h-14"
            onClick={onClose}
          >
            <X className="w-8 h-8" />
          </Button>

          {/* Previous Button */}
          {items.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 w-16 h-16"
              onClick={goToPrevious}
            >
              <ChevronLeft className={isMobile ? "w-8 h-8" : "w-16 h-16"} />
            </Button>
          )}

          {/* Media Display */}
          <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
            <div className="max-h-[90vh] max-w-[80%] flex items-center justify-center">
              {currentItem.type === "image" ? (
                <img
                  src={currentItem.src || "/placeholder.svg"}
                  alt={currentItem.alt}
                  className="max-h-[90vh] max-w-[80%] object-contain rounded-lg"
                />
              ) : (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={currentItem.src}
                    className="max-h-[90vh] max-w-[80%] object-contain rounded-lg cursor-pointer"
                    onClick={handleVideoClick}
                    muted={false} // Sesli olsun
                    autoPlay // Otomatik başlasın
                    loop
                    playsInline
                  />
                  {/* Video Control Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-4 left-4 bg-white/10 text-white hover:bg-white/20 w-12 h-12"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Next Button */}
          {items.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 w-16 h-16"
              onClick={goToNext}
            >
              <ChevronRight className={isMobile ? "w-8 h-8" : "w-16 h-16"} />
            </Button>
          )}

          {/* Media Counter */}
          {items.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm text-center space-y-1">
              <div>{currentIndex + 1} / {items.length}</div>
              <div className="text-xs opacity-80">{getFileName(currentItem.src)}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}