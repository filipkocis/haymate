import ChatsView from "./components/ChatsView"
import OpenChatView from "./components/OpenChatView"

export default function Messages() {
  return (
    <div className="relative animate-fade-in-page grid lg:grid-cols-[auto,1fr] gap-6 overflow-hidden">
      <ChatsView className="overflow-auto overflow-x-hidden p-2" /> 
      <OpenChatView className="overflow-hidden p-2" />
    </div>
  )
}
