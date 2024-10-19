import { LucideChevronLeft, LucideSend } from "lucide-react";
import { cn } from "/src/lib/utils";
import Button from "/src/components/Button";
import Textarea from "/src/components/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import NoChatSelected from "./NoChatSelected";

export default function OpenChatView({ className }: { className?: string }) {
  const { userId: chatWith } = useParams();
  const navigate = useNavigate();

  if (!chatWith) return <NoChatSelected />;

  return (
    <div className={cn("animate-fade-in-page max-lg:absolute grid grid-rows-[auto,1fr,auto] gap-4", className)}>
      <div className="flex gap-4 p-3 items-center">
        <button onClick={() => navigate('/messages')}>
          <LucideChevronLeft size={24} className="hover:scale-125 transition-transform" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" className="aspect-[1/1] h-full w-full object-cover object-center" />
        </div>
        <p className="font-semibold">{chatWith}</p>
      </div> 

      <div className="grid overflow-auto overflow-x-hidden rounded-none px-2">
        <div className="flex flex-col-reverse gap-2">
          <MessageCard />
          <MessageCard />
          <MessageCard right />
          <MessageCard />
          <MessageCard right />
          <MessageCard right />
          <MessageCard />
        </div> 
      </div>

      <div className="grid grid-cols-[1fr,auto] gap-4">
        <Textarea className="" placeholder="Type a message" /> 
        <Button>
          <LucideSend size={24} />
        </Button>
      </div> 
    </div>
  )
}

function MessageCard({ right = false }: { right?: boolean }) {
  return (
    <div className={cn(
      "min-h-[1rem] items-center border px-3 py-2 rounded-full",
      right ? "bg-primary text-primary-foreground" : "bg-foreground/10 text-foreground",
      right ? "self-end" : "self-start"
    )}>
      <p className="">Hello, how are you?</p>
    </div>
  )
}
