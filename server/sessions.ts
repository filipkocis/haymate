import Store from "./store.ts";

type SessionID = string
type Session = {
  id: SessionID
  userId: string
}

export default class SessionStore extends Store<SessionID, Session> {
  constructor() {
    super()
  }
}
