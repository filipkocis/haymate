import { Message } from "../types";
import { cn } from "@/lib/utils";

export default function MessageCard({ right = false, message }: { right?: boolean, message: Message }) {
  return (
    <div style={{ wordBreak: "break-word" }} className={cn(
      "min-h-[1rem] items-center border px-3 py-2 rounded-[2rem] max-w-[80%] whitespace-pre-wrap",
      right ? "bg-primary text-primary-foreground" : "bg-foreground/10 text-foreground",
      right ? "self-end" : "self-start"
    )}>
      <p className="">{message.text}</p>
    </div>
  )
}
