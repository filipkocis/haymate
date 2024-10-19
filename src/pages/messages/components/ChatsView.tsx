import { useState } from "react"
import { cn } from "/src/lib/utils"
import ChatSwitch from "./ChatSwitch"
import type { Selected } from "./ChatSwitch"
import MessagesView from "./MessagesView"
import RequestsView from "./RequestsView"
import XView from "./XView"
import { useParams } from "react-router-dom"

export default function ChatsView({ className }: { className?: string }) {
  const [selected, setSelected] = useState<Selected>("messages")
  const { userId: chatWith } = useParams();

  return (
    <div className={cn("flex flex-col gap-6 lg:w-[30vw]", className)}>
      <div className="relative grid grid-cols-3 gap-4 text-sm font-semibold">
        <div 
          className={cn(
            "-z-10 transition-all duration-500 absolute h-full rounded-md bg-primary",
            "w-[calc((100%-2rem)/3)] min-w-[110px]",
            selected === "messages" && "left-0",
            selected === "requests" && "left-[calc((100%-2rem)/3+1rem)]",
            selected === "x" && "left-[calc(2*(100%-2rem)/3+2rem)]",
          )}
        ></div>

        <ChatSwitch selected={selected} setSelected={setSelected} variant="messages" />
        <ChatSwitch selected={selected} setSelected={setSelected} variant="requests" />
        <ChatSwitch selected={selected} setSelected={setSelected} variant="x" />
      </div>
    
      {selected === "messages" && <MessagesView />} 
      {selected === "requests" && <RequestsView />} 
      {selected === "x" && <XView />}
    </div>
  )
}
