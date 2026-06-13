import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
  title: string;
  image: string;
  gallery: string[];
  imageFit?: 'cover' | 'contain' | 'scale-down';
};

function getImageClass(imageFit: Props['imageFit']) {
  if (imageFit === 'contain') return 'object-contain bg-surface';
  if (imageFit === 'scale-down') return 'object-scale-down bg-surface';
  return 'object-cover';
}

export function ProjectMediaGallery({ title, image, gallery, imageFit = 'cover' }: Props) {
  const images = gallery.length > 0 ? gallery : [image];
  const [activeImage, setActiveImage] = useState(images[0] ?? image);

  return (
    <div className="glass-panel overflow-hidden rounded-[28px] border border-white/10">
      <div className="relative h-[260px] sm:h-[360px] lg:h-[440px] overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 pointer-events-none" />
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={title}
            className={`h-full w-full ${getImageClass(imageFit)}`}
            initial={{ opacity: 0.2, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-5">
          {images.map((item, index) => (
            <button
              key={`${item}-${index}`}
              type="button"
              onClick={() => setActiveImage(item)}
              className={`overflow-hidden rounded-2xl border transition-all ${
                activeImage === item
                  ? 'border-primary-container shadow-[0_0_24px_rgba(52,211,153,0.22)]'
                  : 'border-white/10 opacity-70 hover:opacity-100'
              }`}
              aria-label={`View ${title} screenshot ${index + 1}`}
            >
              <img src={item} alt="" className={`h-24 w-full ${getImageClass(imageFit)}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
