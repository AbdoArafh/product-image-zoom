import { HTMLAttributes } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./ProductImage.module.css";
import { constrain } from "../lib/utils";

export default function ProductImage(props: HTMLAttributes<HTMLImageElement>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>();

  const startTrackingMouse = (
    ctx: CanvasRenderingContext2D | null,
    img: HTMLImageElement | null
  ) => {
    if (!wrapperRef.current) return;
    const wrapper = wrapperRef.current;
    wrapper.addEventListener("mousemove", (e) => {
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
      }
    });
  };

  useEffect(() => {
    if (wrapperRef.current) {
      setSize({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
      });
    }

    if (canvasRef.current && imageRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const img = imageRef.current;
      img.onload = () => {
        startTrackingMouse(ctx, imageRef.current);
      };
    }
  }, []);

  return (
    <>
      <div class={styles["image-wrapper"]} ref={wrapperRef}>
        <img {...props} ref={imageRef} />
        <canvas
          className={styles["canvas"]}
          width={size?.width}
          height={size?.height}
          ref={canvasRef}
        />
      </div>
    </>
  );
}
