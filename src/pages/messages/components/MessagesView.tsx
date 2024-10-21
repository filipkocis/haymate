import { useParams } from "react-router-dom";
import ChatCard from "./ChatCard";
import ChatCardsWrapper from "./ChatCardsWrapper";
import { useEffect, useState } from "react";
import { Chat } from "../types";

export default function MessagesView() {
  const { userId: chatWith } = useParams();
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${import.meta.env.VITE_HOST}/api/chats`)
        if (!res.ok) return
        const data = await res.json()
        setChats(data)
      } catch (error) {
        console.error(error)
      }
    }
    load()
  }, [])

  return (
    <ChatCardsWrapper>
      {chats.map(chat => (
        <ChatCard 
          key={chat.id} 
          user={chat.user} 
          openChatWith={chatWith} 
          lastMessage={chat.lastMessage}
        />
      ))}
    </ChatCardsWrapper>
  )
}
