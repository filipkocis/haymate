import { Chat } from "../types";
import ChatCard from "./ChatCard";
import ChatCardsWrapper from "./ChatCardsWrapper";
import NoChatsView from "./NoChatsView";

export default function MatchesView({ chats, chatWith }: { chats: Chat[], chatWith: string | undefined }) {
  const filteredChats = chats.filter(chat => !chat.lastMessage);

  if (!filteredChats.length) return <NoChatsView label="No Matches Found" />

  return (
    <ChatCardsWrapper>
      {filteredChats.map(chat => (
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
