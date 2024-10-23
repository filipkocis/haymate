import { useState } from "react"
import { cn } from "@/lib/utils"
import ChatSwitch from "./ChatSwitch"
import type { Selected } from "./ChatSwitch"
import MessagesView from "./MessagesView"
import RequestsView from "./RequestsView"
import MatchesView from "./MatchesView"

export default function ChatsView({ className }: { className?: string }) {
  const [selected, setSelected] = useState<Selected>("messages")

  return (
    <div className={cn("flex flex-col gap-6 lg:w-[30vw]", className)}>
      <div className="relative grid grid-cols-3 gap-4 text-sm font-semibold">
        <div 
          className={cn(
            "-z-10 transition-all duration-500 absolute h-full rounded-md bg-primary",
            "w-[calc((100%-2rem)/3)] min-w-[110px]",
            selected === "messages" && "left-0",
            selected === "matches" && "left-[calc((100%-2rem)/3+1rem)]",
            selected === "requests" && "left-[calc(2*(100%-2rem)/3+2rem)]",
          )}
        ></div>

        <ChatSwitch selected={selected} setSelected={setSelected} variant="messages" />
        <ChatSwitch selected={selected} setSelected={setSelected} variant="matches" />
        <ChatSwitch selected={selected} setSelected={setSelected} variant="requests" />
      </div>
    
      {selected === "messages" && <MessagesView />} 
      {selected === "matches" && <MatchesView />}
      {selected === "requests" && <RequestsView />} 
    </div>
  )
}
