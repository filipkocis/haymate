import { useState } from "react";
import { cn } from "@/lib/utils";
import { LucideUser } from "lucide-react";

export default function Avatar(
  { src, alt = "Avatar", size = 40, className, fallbackText, fallbackImage }: 
  { src: string, alt?: string, size?: number, className?: string, fallbackText?: string, fallbackImage?: React.ReactNode }
) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false)
    setHasError(false)
  };

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
  };

  return (
    <div 
      className={cn("rounded-full overflow-hidden shadow-lg", className)}
      style={{ width: size, height: size }}
    >
      <img 
        src={src}
        alt={alt}
        className="aspect-[1/1] h-full w-full object-cover object-center" 
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {isLoading && <p>{fallbackText}</p>}
      {hasError && (
        fallbackImage ?? <LucideUser size={size} className="text-primary" />
      )}
    </div>
  )
}
