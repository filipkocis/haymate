import ChatCard from "./ChatCard";
import ChatCardsWrapper from "./ChatCardsWrapper";
import { Chat } from "../types";
import NoChatsView from "./NoChatsView";

export default function MessagesView({ chats, chatWith }: { chats: Chat[], chatWith: string | undefined }) {
  const filteredChats = chats.filter(chat => !!chat.lastMessage);

  if (!filteredChats.length) return <NoChatsView label="No Chats Found" />

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
