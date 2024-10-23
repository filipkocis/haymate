import { generateMessage } from "./gen/message-gen.ts";
import type { Profile } from "./profiles.ts";
import Store from "./store.ts";

type ChatID = string
export type Message = {
  id: string
  text: string
  timestamp: number
  author: string
}

type MessageStore = Store<string, Message>

export default class ChatStore extends Store<ChatID, MessageStore> {
  constructor() {
    super()
  }

  override get(chatId: ChatID): MessageStore {
    const chat = super.get(chatId)
    if (!chat) {
      const chat = new Store<string, Message>()
      super.set(chatId, chat)
      return chat
    }
    return chat
  }

  getLatestMessage(chatId: ChatID): Message | udnefined {
    const chat = this.get(chatId)
    const messages = chat.values().toArray().toSorted((a, b) => a.timestamp - b.timestamp)
    return messages[messages.length - 1]
  }

  getMessages(chatId: ChatID, cursor = 0, limit = 50): Message[] {
    const chat = this.get(chatId)
    const messages = chat.values().toArray().toSorted((a, b) => a.timestamp - b.timestamp)
    return messages.slice(cursor, cursor + limit)
  }

  addMessage(chatId: ChatID, message: Message) {
    const chat = this.get(chatId)
    chat.set(message.id, message)
  }

  deleteMessage(chatId: ChatID, messageId: string) {
    const chat = this.get(chatId)
    chat.delete(messageId)
  }

  clearChat(chatId: ChatID) {
    const chat = this.get(chatId)
    chat.clear()
  }

  id(idA: string, idB: string): ChatID {
    return [idA, idB].toSorted().join(':')
  }

  allChats(userId: string): ChatID[] {
    return Array.from(this.keys())
      .filter(key => {
        const [idA, idB] = key.split(':')
        return idA === userId || idB === userId
      })
  }

  async generateMessage(chatId: ChatID, profile: Profile) {
    const generated = await generateMessage(chatId, profile, this)
    if (!generated) return undefined

    const message = ChatStore.message(generated, profile.id)
    this.addMessage(chatId, message)
    return message
  }

  static message(text: string, author: string, timestamp = Date.now()): Message {
    return {
      id: Math.random().toString(36).substring(2, 15),
      text,
      timestamp,
      author,
    }
  }
}
