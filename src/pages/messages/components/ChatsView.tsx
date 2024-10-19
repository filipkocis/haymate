import { useState } from "react"
import { cn } from "/src/lib/utils"

export default function ChatsView({ className }: { className?: string }) {
  const [selected, setSelected] = useState<'messages' | 'requests' | 'x'>("messages")

  return (
    <div className={cn("flex flex-col gap-6 lg:w-[30vw]", className)}>
      <div className={cn(
        "relative grid grid-cols-3 gap-4 text-sm font-semibold",
        "[&_button]:p-2 [&_button]:text-center [&_button]:uppercase [&_button]:min-w-[110px] [&_button]:duration-300 [&_button]:transition-all"
      )}>
        <div 
          className={cn(
            "-z-10 transition-all duration-500 absolute h-full rounded-md bg-primary",
            "w-[calc((100%-2rem)/3)] min-w-[110px]",
            selected === "messages" && "left-0",
            selected === "requests" && "left-[calc((100%-2rem)/3+1rem)]",
            selected === "x" && "left-[calc(2*(100%-2rem)/3+2rem)]",
          )}
        ></div>

        <button className={cn(selected === "messages" && "text-black")} onClick={() => setSelected("messages")}>Messages</button>  
        <button className={cn(selected === "requests" && "text-black")} onClick={() => setSelected("requests")}>Requests</button>  
        <button className={cn(selected === "x" && "text-black")} onClick={() => setSelected("x")}>X</button>  
      </div>
    
      <div className="flex flex-col gap-3">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
    </div>
  )
}

function ChatCard() {
  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-4 p-3 rounded-md shadow-[0_0_0.5rem_1px_hsl(var(--border))]">
      <div className="w-14 h-14 rounded-full shadow-lg">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" className="aspect-[1/1] h-full w-full object-cover object-center" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="font-semibold">John Doe</p>
          <p className="text-xs text-foreground/60">2h</p>
        </div>
        <p style={{ wordBreak: "break-word" }} className="text-foreground/60 text-ellipsis rounded-none line-clamp-2">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
        </p>
      </div>
    </div>
  )
}
