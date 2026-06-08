import { useRef, useCallback } from "react";
import { useSpring } from "framer-motion";
import { clamp } from "@lib/utils";

export function useMagneticEffect(intensity = 0.4) {
  const ref = useRef(null);

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxMove = 20;
      const moveX = clamp((e.clientX - centerX) * intensity, -maxMove, maxMove);
      const moveY = clamp((e.clientY - centerY) * intensity, -maxMove, maxMove);
      x.set(moveX);
      y.set(moveY);
    },
    [x, y, intensity],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x, y, handleMouseMove, handleMouseLeave };
}
