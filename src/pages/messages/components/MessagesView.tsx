import ChatCard from "./ChatCard";
import ChatCardsWrapper from "./ChatCardsWrapper";

export default function MessagesView() {
  return (
    <ChatCardsWrapper>
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
    </ChatCardsWrapper>
  )
}
