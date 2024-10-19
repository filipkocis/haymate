import { useState } from "react"
import { cn } from "/src/lib/utils"

export default function ChatsView({ className }: { className?: string }) {
  const [selected, setSelected] = useState<'messages' | 'requests' | 'x'>("messages")

  return (
    <div className={cn("flex flex-col gap-2 lg:w-max", className)}>
      <div className={cn(
        "relative grid grid-cols-3 gap-4 text-sm font-semibold",
        "[&_button]:p-2 [&_button]:text-center [&_button]:uppercase [&_button]:min-w-[110px] [&_button]:xl:w-[9vw] [&_button]:duration-300 [&_button]:transition-all"
      )}>
        <div 
          className={cn(
            "-z-10 transition-all duration-500 absolute h-full rounded-md bg-primary",
            "w-[calc((100%-2rem)/3)]",
            selected === "messages" && "left-0",
            selected === "requests" && "left-[calc((100%-2rem)/3+1rem)]",
            selected === "x" && "left-[calc(2*(100%-2rem)/3+2rem)]",
          )}
        ></div>

        <button className={cn(selected === "messages" && "text-black")} onClick={() => setSelected("messages")}>Messages</button>  
        <button className={cn(selected === "requests" && "text-black")} onClick={() => setSelected("requests")}>Requests</button>  
        <button className={cn(selected === "x" && "text-black")} onClick={() => setSelected("x")}>X</button>  
      </div>
    
      <div className="grid gap-2">
        <div className="h-24 border"></div>
        <div className="h-24 border"></div>
        <div className="h-24 border"></div>
      </div>
    </div>
  )
}
