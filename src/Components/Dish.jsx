import { useLayoutEffect, useRef } from "react";

export const Dish = ({ img, name, description, iter }) => {
  const containerRef = useRef(null);
  const descRef = useRef(null);
  const fullTextRef = useRef(description);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const descEl = descRef.current;

    if (!container || !descEl) return;

    const dotText = () => {
        descEl.textContent = fullTextRef.current;

        

        const maxIterations = 500;
        let count = 0;

        while (container.scrollHeight > container.clientHeight && count < maxIterations) {
            let text = descEl.textContent;

            if (text.length <= 4) {
                descEl.textContent = "...";
                break;
            }

            descEl.textContent = text.replace(/\s*\S+\s*$/, "...");

            count++;
        }
    }
    

    const imgEl = container.querySelector("img");
    if (imgEl) {
      if (imgEl.complete) {
        dotText();
      } else {
        imgEl.addEventListener("load", dotText, { once: true });
        imgEl.addEventListener("error", dotText, { once: true });
      }
    }

    window.addEventListener("resize", dotText);

    return () => {
      if (imgEl) {
        imgEl.removeEventListener("load", dotText);
        imgEl.removeEventListener("error", dotText);
      }
    };
  }, []);

  return (
    <div className="dish" ref={containerRef}>
      <img src={img} alt="dish-img" />
      <h2 className="dish-name">{`${iter}. ${name}`}</h2>
      <div ref={descRef} className="description">
        {description}
      </div>
    </div>
  );
};
