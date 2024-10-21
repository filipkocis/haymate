import Store from "./store.ts";

type User = {
  id: string
  name: string
  avatar: string
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
