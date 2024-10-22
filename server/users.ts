import Store from "./store.ts";

export type User = {
  id: string
  name: string
  avatar: string
}

export type Profile = {
  id: string
  name: string
  avatar: string

  bio: string
  hobbies?: string[]
  interests?: string[] 
  photos?: string[]

  details: {
    location?: string
    work?: string
    education?: string
    age: number
    personality: string
    sign: string
    lookingFor: string
  }

  stats: {
    matches: number
    loves: number
    haybales: number
  }
}

export default class UserStore extends Store<string, User> {
  constructor() {
    super()
  }

  mock() {
    for (let i = 1; i <= 10; i++) {
      const user = { id: i.toString(), name: 'User ' + i, avatar: 'https://i.pravatar.cc/150?img=' + i }
      this.set(user.id, user)
    }
  }
}
