import ChatCard from "./ChatCard";
import ChatCardsWrapper from "./ChatCardsWrapper";
import { Chat } from "../types";

export default function MessagesView({ chats, chatWith }: { chats: Chat[], chatWith: string | undefined }) {
  return (
    <ChatCardsWrapper>
      {chats.filter(chat => !!chat.lastMessage).map(chat => (
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
