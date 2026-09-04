import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Plus, X, Loader2, Send, CheckCircle2 } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const compressImage = (
  base64Str: string,
  maxWidth = 400,
  maxHeight = 400,
  quality = 0.6,
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

export function WishlistScreen({ t }: { key?: string; t: any }) {
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [compressingCount, setCompressingCount] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim() || compressingCount > 0) return;

    // Optimistic transition
    setIsSubmitted(true);
    const submittedSuggestion = suggestion;
    const submittedImages = images;
    setSuggestion("");
    setImages([]);

    // Background firestore write
    const writeToFirestore = async () => {
      try {
        await addDoc(collection(db, "product_requests"), {
          userId: "anonymous",
          userName: "User",
          text: submittedSuggestion,
          imageUrls: submittedImages,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Wishlist background error:", error);
      }
    };
    writeToFirestore();
  };

  const handleImageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesCount = files.length;
    setCompressingCount((prev) => prev + filesCount);

    for (let i = 0; i < filesCount; i++) {
      const file = files[i];
      if (!file) continue;

      const reader = new FileReader();
      reader.onloadend = async () => {
        const rawBase64 = reader.result as string;
        try {
          // Compress to 400x400 jpeg quality 0.5 (typically 15-25KB)
          const compressed = await compressImage(rawBase64, 400, 400, 0.5);

          if (compressed.length > 200000) {
            // If it's still surprisingly large (e.g. over 200KB), super-compress it
            const superCompressed = await compressImage(rawBase64, 250, 250, 0.4);
            setImages((prev) => [...prev, superCompressed]);
          } else {
            setImages((prev) => [...prev, compressed]);
          }
        } catch (err) {
          console.error("Compression failed, using extreme low-res fallback to stay under size limits:", err);
          try {
            const fallback = await compressImage(rawBase64, 200, 200, 0.3);
            setImages((prev) => [...prev, fallback]);
          } catch {
            // If even that fails, we only append if the raw data is under 150KB to protect Firestore size limits
            if (rawBase64.length < 150000) {
              setImages((prev) => [...prev, rawBase64]);
            } else {
              console.warn("Skipping image: Too large and compression failed.");
            }
          }
        } finally {
          setCompressingCount((prev) => Math.max(0, prev - 1));
        }
      };
      reader.readAsDataURL(file);
    }

    // Reset value so user can upload same photo again if deleted
    e.target.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="px-6 py-2 h-full flex flex-col"
    >
      <header className="mb-4 text-center">
        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Heart size={28} className="text-brand-primary" fill="currentColor" />
        </div>
        <h1 className="text-xl font-serif italic text-brand-primary mb-1">
          {t.wishlist.title}
        </h1>
        <p className="text-[10px] text-gray-500 font-medium leading-normal max-w-[280px] mx-auto">
          {t.wishlist.description}
        </p>
      </header>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="relative group flex-1 flex flex-col overflow-hidden">
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder={t.wishlist.placeholder}
              className="w-full flex-1 p-5 bg-[#FAF9F6] border border-gray-100 rounded-t-[2.5rem] text-[12px] text-gray-800 focus:outline-none placeholder:text-gray-300 leading-relaxed italic resize-none"
            />
            <div className="bg-[#FAF9F6] border-x border-b border-gray-100 rounded-b-[2.5rem] p-4 flex flex-wrap gap-2 items-center">
              {/* Existing compressed images */}
              {images.map((img, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 relative group/img bg-white"
                >
                  {img && (
                    <img src={img} className="w-full h-full object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                    title="Remove Photo"
                  >
                    <X size={10} className="stroke-[3]" />
                  </button>
                </div>
              ))}

              {/* Compressing placeholders */}
              {Array.from({ length: compressingCount }).map((_, idx) => (
                <div
                  key={`compressing-${idx}`}
                  className="w-12 h-12 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center"
                >
                  <Loader2 className="animate-spin text-brand-primary" size={14} />
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer"
              >
                <Plus size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageAdd}
                className="hidden"
                accept="image/*"
                multiple
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!suggestion.trim() || isSubmitting || compressingCount > 0}
            className="mt-6 w-full py-4 bg-gray-900 text-white rounded-full font-black text-xs shadow-xl shadow-gray-200 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={14} />
            ) : compressingCount > 0 ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                <span>Processing photos...</span>
              </>
            ) : (
              <>
                <span>{t.wishlist.submit}</span>
                <Send size={14} className="text-brand-primary" />
              </>
            )}
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1.5">
            {t.wishlist.success.split("!")[0]}!
          </h2>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-8">
            {t.wishlist.success}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Add Another Request
          </button>
        </motion.div>
      )}

      <div className="mt-8 mb-4 text-center opacity-30">
        <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.4em]">
          Community Driven Design
        </p>
      </div>
    </motion.div>
  );
}
