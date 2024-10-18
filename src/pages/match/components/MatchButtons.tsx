import { LucideHeart, LucideHeartPulse, LucideX } from "lucide-react";
import { cn } from "/src/lib/utils";

const SIZE = 34;
export default function MatchButtons({ onCancel, className }: any) {
  return (
    <div className={cn(
      "pt-2 sm:pt-10 pb-3 sm:pb-10",
      "[&_button]:shadow-[0_0_1rem_0.2rem_hsl(var(--border))] [&_svg]:duration-300 [&>*]:transition-all [&_button]:h-auto [&_button]:rounded-full [&_button]:p-3 [&_button]:border flex gap-5 justify-center",
      className
    )}>
      <button onClick={onCancel} className="group text-red-400 hover:bg-red-400/10">
        <LucideX size={SIZE} className="group-hover:scale-110" />
      </button>
      <button className="group text-pink-400 hover:bg-pink-400/10">
        <LucideHeart size={SIZE} className="group-hover:scale-110" />
      </button>
      <button className="group text-primary hover:bg-primary/10">
        <LucideHeartPulse size={SIZE} className="group-hover:scale-110" />
      </button>
    </div>
  )
}
