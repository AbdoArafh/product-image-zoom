import { HTMLAttributes } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import styles from "./ProductImage.module.css";
import { constrain } from "../lib/utils";

export default function ProductImage(props: HTMLAttributes<HTMLImageElement>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (wrapperRef.current && canvasRef.current && imageRef.current) {
      canvasRef.current.width = imageRef.current.offsetWidth;
      canvasRef.current.height = imageRef.current.offsetHeight;
      const ctx = canvasRef.current.getContext("2d");
      const img = imageRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        if (ctx && img) {
          const size = { width: img?.offsetWidth!, height: img?.offsetHeight! };

          const showRect = {
            width: size.width / 2.5,
            height: size.height / 2.5,
          };

          ctx.clearRect(0, 0, size.width, size.height);

          const sx = constrain(
            e.offsetX - showRect.width / 2,
            0,
            size.width - showRect.width
          );

          const sy = constrain(
            e.offsetY - showRect.height / 2,
            0,
            size.height - showRect.height
          );

          const sw = showRect.width;

          const sh = showRect.height;

          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size?.width, size?.height);

          if (e.type === "click") {
            wrapperRef.current?.classList.add(styles["clicked"]);
          } else {
            wrapperRef.current?.classList.remove(styles["clicked"]);
          }
        }
      };

      const handleImageLoad = () => {
        wrapperRef.current?.addEventListener("mousemove", handleMouseMove);
        wrapperRef.current?.addEventListener("click", handleMouseMove);
      };

      img.addEventListener("load", handleImageLoad);

      return () => {
        img.removeEventListener("load", handleImageLoad);
        wrapperRef.current?.removeEventListener("mousemove", handleMouseMove);
        wrapperRef.current?.removeEventListener("click", handleMouseMove);
      };
    }
  }, []);

  return (
    <>
      <div class={styles["image-wrapper"]} ref={wrapperRef}>
        <img {...props} ref={imageRef} />
        <canvas className={styles["canvas"]} ref={canvasRef} />
      </div>
    </>
  );
}
