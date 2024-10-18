import { useEffect, useState } from "react";
import { debounce } from "/src/lib/utils";

interface Size {
  width: number;
  height: number;
}

export default function useWindowSize(debounceDelay: number = 0) {
  const [size, setSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const debouncedResizeHandler = debounceDelay > 0 
      ? debounce(handleResize, debounceDelay)
      : handleResize;

    window.addEventListener("resize", debouncedResizeHandler);

    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, [debounceDelay]);

  return size;
}
