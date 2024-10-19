import { useParams } from "react-router-dom";
import ChatCard from "./ChatCard";
import ChatCardsWrapper from "./ChatCardsWrapper";

const random = () => (Math.random() * 100).toFixed(0)

export default function MessagesView() {
  const { userId: chatWith } = useParams();

  return (
    <ChatCardsWrapper>
      <ChatCard userId={random()} openChatId={chatWith} />
      <ChatCard userId={random()} openChatId={chatWith} />
      <ChatCard userId={random()} openChatId={chatWith} />
      <ChatCard userId={random()} openChatId={chatWith} />
    </ChatCardsWrapper>
  )
}
