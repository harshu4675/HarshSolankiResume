import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

export function useScrollReveal(options = {}) {
  const controls = useAnimation();
  const { threshold = 0.15, rootMargin = "-60px", once = true } = options;

  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [inView, controls, once]);

  return { ref, controls, inView };
}
