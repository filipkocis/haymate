import { LucideMoon, LucideSun } from "lucide-react"
import { cn } from "../lib/utils"
import { useTheme } from "/src/context/ThemeProvider"

export default function ThemeToggle({ short = false }: { short?: boolean }) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "text-2xl rounded-full text-white flex justify-start border-2",
        short ? "w-auto" : "w-[64px]",
      )}
    >
      <div className={cn(
        "p-2 rounded-full transition-all text-foreground",
        isDark ? "bg-muted" : "bg-primary",
        !short && isDark && "translate-x-[26px]"
      )}>
        {isDark ? <LucideMoon size={19} /> : <LucideSun size={19} />}
      </div>
    </button>
  )
}
