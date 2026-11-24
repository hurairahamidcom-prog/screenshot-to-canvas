import { useEffect, useRef } from "react";

/** Subtle floating particles drawn on a canvas, colored from the theme's primary token. */
export function Particles({ count = 55 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.05,
      a: Math.random() * 0.6 + 0.2,
    }));

    const color = () => getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const c = color();
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -5) {
          d.y = height + 5;
          d.x = Math.random() * width;
        }
        if (d.x < -5) d.x = width + 5;
        if (d.x > width + 5) d.x = -5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.globalAlpha = d.a;
        ctx.shadowBlur = 8;
        ctx.shadowColor = c;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
