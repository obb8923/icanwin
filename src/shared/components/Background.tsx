import { useEffect, useRef, useState } from "react";
import img1 from "../../assets/imgs/1.webp";
import img2 from "../../assets/imgs/2.webp";
import img3 from "../../assets/imgs/3.webp";
import img4 from "../../assets/imgs/4.webp";
import img5 from "../../assets/imgs/5.webp";

const images = [img1, img2, img3, img4, img5];
const INTERVAL = 5000; // ms
const FADE_DURATION = 1000; // ms

export const Background = ({ children }: { children?: React.ReactNode }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, INTERVAL);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: idx === current ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
};

