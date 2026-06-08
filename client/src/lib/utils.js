// ============================================
// UTILITY FUNCTIONS
// ============================================

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Smooth scroll to section
 */
export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // navbar height
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/**
 * Format phone number display
 */
export function formatPhone(phone) {
  return phone.replace(/(\+91)(\d{5})(\d{5})/, "$1 $2 $3");
}

/**
 * Clamp number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map value from one range to another
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Debounce function
 */
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function
 */
export function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Get tilt transform values from mouse position
 */
export function getTiltValues(e, element, intensity = 8) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;
  const rotateX = clamp(
    (-mouseY / (rect.height / 2)) * intensity,
    -intensity,
    intensity,
  );
  const rotateY = clamp(
    (mouseX / (rect.width / 2)) * intensity,
    -intensity,
    intensity,
  );
  return { rotateX, rotateY };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element, margin = 0) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight - margin && rect.bottom >= margin;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return false;
}

/**
 * Generate random ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Validate email
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Truncate text
 */
export function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
