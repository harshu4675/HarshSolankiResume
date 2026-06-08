import React, { useEffect, useRef, useState } from "react";

export default function CounterAnimation({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  isText = false,
  className = "",
}) {
  const numericValue = typeof value === "number" ? value : parseFloat(value);
  const isValidNumber = !isText && !isNaN(numericValue);

  const [displayValue, setDisplayValue] = useState(() => {
    if (isText || !isValidNumber) return value;
    return 0;
  });

  const rafRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (isText || !isValidNumber) {
      setDisplayValue(value);
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const startDelay = setTimeout(() => {
      const startTime = performance.now();
      const startValue = 0;
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOut(progress);
        const current = Math.round(
          startValue + (numericValue - startValue) * easedProgress,
        );
        setDisplayValue(current);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(numericValue);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(startDelay);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isText, isValidNumber, numericValue, value, duration]);

  return (
    <span className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
