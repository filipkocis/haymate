export type User = {
  id: string,
  name: string,
  avatar: string
}
export type Chat = {
  id: string
  user: User
  lastMessage?: Message 
}

export type Message = {
  id: string,
  text: string,
  timestamp: number,
  author: string
}
