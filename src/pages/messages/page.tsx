import ChatsView from "./components/ChatsView"
import OpenChatView from "./components/OpenChatView"

export default function Messages() {
  return (
    <div className="animate-fade-in-page grid lg:grid-cols-[auto,1fr] gap-6 overflow-hidden">
      <ChatsView className="border overflow-auto overflow-x-hidden p-1" /> 
      <OpenChatView className="border overflow-auto p-1" />
    </div>
  )
}
