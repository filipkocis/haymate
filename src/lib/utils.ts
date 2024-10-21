import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce(fn: (...args: any[]) => any, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
  timeStyle: "short"
})

export function formatTime(time?: number) {
  if (!time) return ''

  const date = new Date(time)
  return formatter.format(date) 
}
