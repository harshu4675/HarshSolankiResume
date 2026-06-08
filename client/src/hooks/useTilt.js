import { useRef, useCallback } from "react";

export function useTilt(intensity = 8) {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateX = (-mouseY / (rect.height / 2)) * intensity;
      const rotateY = (mouseX / (rect.width / 2)) * intensity;

      ref.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
      ref.current.style.transition = "transform 0.1s ease";
    },
    [intensity],
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
    ref.current.style.transition =
      "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
