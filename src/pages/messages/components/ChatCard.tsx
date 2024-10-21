import { Link } from "react-router-dom";
import { cn, formatTime } from "@/lib/utils";
import { Message, User } from "../types";

export default function ChatCard({ user, openChatWith, lastMessage }: { user: User, openChatWith: string | undefined, lastMessage?: Message }) {
  const selected = openChatWith === user.id;

  return (
    <Link to={`/messages/${user.id}`} className={cn(
      "transition-colors grid grid-cols-[auto,1fr] items-center gap-4 p-3 rounded-md shadow-[0_0_0.5rem_1px_hsl(var(--border))]",
      selected ? 
        "bg-primary text-primary-foreground hover:bg-primary/90" :
        "hover:bg-foreground/10"
    )}>
      <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg">
        <img src={user.avatar} className="aspect-[1/1] h-full w-full object-cover object-center" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs opacity-60">{formatTime(lastMessage?.timestamp)}</p>
        </div>
        <p style={{ wordBreak: "break-word" }} className={cn(
          "text-ellipsis rounded-none line-clamp-2",
          selected ? "text-primary-foreground/80" : "opacity-60"
        )}>
          {lastMessage?.text || "No messages yet"}
        </p>
      </div>
    </Link>
  )
}
