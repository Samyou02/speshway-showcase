import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxHeroProps {
  children: ReactNode;
  backgroundImage?: string;
  className?: string;
}

export const ParallaxHero = ({ children, backgroundImage, className }: ParallaxHeroProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} className={`relative h-screen w-full flex items-center justify-center overflow-hidden ${className || ""}`}>
      {backgroundImage && (
        <AnimatePresence mode="wait">
          <motion.div
            key={backgroundImage}
            className="absolute inset-0 z-0"
            style={{ y: bgY, backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat", willChange: "transform" }}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      )}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </section>
  );
};