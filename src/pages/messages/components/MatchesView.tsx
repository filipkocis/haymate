import { Chat } from "../types";
import ChatCard from "./ChatCard";
import ChatCardsWrapper from "./ChatCardsWrapper";

export default function MatchesView({ chats, chatWith }: { chats: Chat[], chatWith: string | undefined }) {
  return (
    <ChatCardsWrapper>
      {chats.filter(chat => !chat.lastMessage).map(chat => (
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
