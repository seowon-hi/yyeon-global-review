import React, { useState } from "react";
import { motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function ImageGalleryModal({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-10 right-6 text-white p-2 bg-white/10 rounded-full backdrop-blur-md"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <div
        className="relative w-full max-w-[375px] aspect-[4/5] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-full max-h-full object-contain shadow-2xl shadow-black/50"
          referrerPolicy="no-referrer"
        />

        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 p-3 bg-black/20 rounded-full text-white backdrop-blur-sm border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 p-3 bg-black/20 rounded-full text-white backdrop-blur-sm border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-[-40px] text-white/50 text-[10px] font-black tracking-widest uppercase">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
