import { LucideHeart, LucideHeartPulse, LucideX } from "lucide-react";
import { cn } from "@/lib/utils";

const SIZE = 34;
export default function MatchButtons(
  { onNext, onLike, onLove, className }: 
  { onNext: () => void, onLike: () => void, onLove: () => void, className?: string }
) {
  return (
    <div className={cn(
      "pt-2 sm:pt-10 pb-3 sm:pb-10",
      "[&_button]:shadow-[0_0_1rem_0.2rem_hsl(var(--border))] [&_svg]:duration-300 [&>*]:transition-all [&_button]:h-auto [&_button]:rounded-full [&_button]:p-3 [&_button]:border flex gap-5 justify-center",
      className
    )}>
      <button onClick={onNext} className="group text-red-400 hover:bg-red-400/10">
        <LucideX size={SIZE} className="group-hover:scale-110" />
      </button>
      <button onClick={onLike} className="group text-pink-400 hover:bg-pink-400/10">
        <LucideHeart size={SIZE} className="group-hover:scale-110" />
      </button>
      <button onClick={onLove} className="group text-primary hover:bg-primary/10">
        <LucideHeartPulse size={SIZE} className="group-hover:scale-110" />
      </button>
    </div>
  )
}
