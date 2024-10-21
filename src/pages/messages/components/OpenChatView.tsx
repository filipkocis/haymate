import { LucideChevronLeft, LucideSend } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import NoChatSelected from "./NoChatSelected";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import { Message } from "../types";
import { useSession } from "@/context/SessionProvider";

export default function OpenChatView({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const { userId: chatWith } = useParams();
  const { session } = useSession();
  const navigate = useNavigate();
  const { width: windowWidth } = useWindowSize();
  const maxLg = windowWidth < 1024;

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messagesRef, messages])

  useEffect(() => {
    if (!chatWith) return setMessages([]);

    async function load() {
      try {
        const res = await fetch(`${import.meta.env.VITE_HOST}/api/messages?userId=${chatWith}`)
        if (!res.ok) return
        const data = await res.json()
        setMessages(data.reverse())
      } catch (error) {
        console.error(error)
      }
    }
    load()
  }, [chatWith])

  if (!chatWith) return <NoChatSelected />;

  async function handleSend() {
    if (!inputRef.current) return;

    const message = inputRef.current.value.trim();
    if (!message) return;
    if (message.length > 500) return;

    inputRef.current.value = "";
    const event = new Event('input', { bubbles: true })
    inputRef.current.dispatchEvent(event)

    try {
      const res = await fetch(`${import.meta.env.VITE_HOST}/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: chatWith,
          text: message
        })
      })

      if (!res.ok) {
        console.error("Failed to send message")
        return
      }

      const data = await res.json()
      setMessages([data, ...messages])
    } catch (error) {
      console.error(error)
    }
  }

  function handleCloseChat() {
    if (maxLg && chatRef.current) {
      chatRef.current.classList.remove("animate-slide-in-left")
      chatRef.current.classList.add("animate-slide-out-right")
      setTimeout(() => navigate('/messages'), 150)
    } else {
      navigate('/messages')
    }
  }

  return (
    <div ref={chatRef} className={cn(
      "grid grid-rows-[auto,1fr,auto] gap-4 bg-background",
      "max-lg:absolute max-lg:h-full max-lg:w-full",
      maxLg ? "animate-slide-in-left" : "animate-fade-in-page",
      className
    )}>
      <div className="flex gap-4 p-3 items-center">
        <button onClick={handleCloseChat}>
          <LucideChevronLeft size={24} className="hover:scale-125 transition-transform" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" className="aspect-[1/1] h-full w-full object-cover object-center" />
        </div>
        <p className="font-semibold">{chatWith}</p>
      </div> 

      <div ref={messagesRef} className="grid overflow-auto overflow-x-hidden rounded-none px-2">
        <div className="flex flex-col-reverse gap-2">
          {messages.map(message => (
            <MessageCard
              key={message.id}
              message={message}
              right={message.author === session}
            />
          ))}
        </div> 
      </div>

      <div className="grid grid-cols-[1fr,auto] gap-4">
        <Textarea ref={inputRef} className="" placeholder="Type a message" /> 
        <Button onClick={handleSend}>
          <LucideSend size={24} />
        </Button>
      </div> 
    </div>
  )
}
