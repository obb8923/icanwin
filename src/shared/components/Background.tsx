import { useEffect, useRef, useState } from "react";
import img1 from "../../assets/imgs/1.png";
import img2 from "../../assets/imgs/2.png";
import img3 from "../../assets/imgs/3.png";
import img4 from "../../assets/imgs/4.png";
import img5 from "../../assets/imgs/5.png";

const images = [img1, img2, img3, img4, img5];
const INTERVAL = 7000; // ms
const FADE_DURATION = 1000; // ms

export const Background = ({ children }: { children?: React.ReactNode }) => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setFade(true);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
      setFade(false);
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

