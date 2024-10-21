// @deno-types="npm:@types/express"
import express from "npm:express"
import cookieParser from "npm:cookie-parser"
import * as path from "jsr:@std/path";
import { auth, generateSession } from "./utils.ts";
import SessionStore from "./sessions.ts";
import ChatStore, { type Message } from "./messages.ts";
import UserStore from "./users.ts";

const sessions = new SessionStore()
const chats = new ChatStore()
const users = new UserStore()
users.mock()

const app = express()
const port = Deno.env.get("PORT") || 3000

app.use(express.static(path.join(Deno.cwd(), "./dist")));
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(`[${req.ip}] ${req.method} ${req.url}`)
  const session = sessions.get(auth(req))

  if (req.url === "/login") {
    if (session) {
      return res.redirect("/")
    }
    return next()
  }

  if (!session && !req.url.startsWith("/api/auth/")) {
    return res.redirect('/login')
  }

  next()
})

app.get('/api/user', (req, res) => {
  const id = req.query.id?.toString() 

  if (!id) {
    res.status(400).send()
    return
  }

  const user = users.get(id)

  if (!user) {
    res.status(404).send()
    return
  }

  res.status(200).send(user)
})

app.post('/api/send', (req, res) => {
  const userId = sessions.get(auth(req))?.userId
  if (!userId) {
    res.status(401).send()
    return
  }

  const userIdB = req.body.userId?.toString() as string | undefined
  const text = req.body.text?.toString() as string | undefined
  
  if (!userIdB || !text) {
    res.status(400).send()
    return
  }

  if (!users.get(userIdB)) {
    res.status(404).send()
    return
  }

  if (userId === userIdB) {
    res.status(400).send()
    return
  }

  if (text.length > 1000 || text.trim().length === 1) {
    res.status(400).send()
    return
  }

  const id = chats.id(userId, userIdB)
  const message: Message = {
    id: Math.random().toString(36).substring(2, 15),
    text,
    timestamp: Date.now(),
    author: userId
  }
  
  chats.addMessage(id, message)
  res.status(200).send(message)
})

app.get('/api/messages', (req, res) => {
  const userId = sessions.get(auth(req))?.userId
  if (!userId) {
    res.status(401).send()
    return
  }

  const userIdB = req.query.userId?.toString()
  let cursor: number | string | undefined = req.query.cursor?.toString()
  let limit: number | string | undefined = req.query.limit?.toString()

  if (cursor !== undefined) cursor = parseInt(cursor)
  if (limit !== undefined) limit = parseInt(limit)

  if (!userIdB) {
    res.status(400).send()
    return
  }

  if (!users.get(userIdB)) {
    res.status(404).send()
    return
  }

  const chatId = chats.id(userIdB, userId)

  const messages = chats.getMessages(chatId, cursor, limit)
  res.status(200).send(messages)
})

app.get('/api/chats', (req, res) => {
  const userId = sessions.get(auth(req))?.userId
  if (!userId) {
    res.status(401).send()
    return
  }

  const userChats = chats.allChats(userId);
  const mappedChats = userChats.map(chatId => {
    const [userA, userB] = chatId.split(':')
    const otherUserId = userA === userId ? userB : userA
    const otherUser = users.get(otherUserId)
    return {
      id: chatId,
      user: otherUser,
      lastMessage: chats.getMessages(chatId, 0, 1).at(0)
    }
  })

  res.status(200).send(mappedChats)
})

app.post('/api/auth/logout', (req, res) => {
  const session = sessions.get(auth(req))

  if (!session) {
    res.status(401).send()
    return
  }

  console.log("Deleting session:", req.cookies.session)
  sessions.delete(session.id)
  res.clearCookie("session")
  res.status(200).send()
})

app.get('/api/auth/session', (req, res) => {
  const session = sessions.get(auth(req))
  if (session) {
    res.status(200).send({ userId: session.id})
    return
  } else {
    if (auth(req)) {
      console.log("Clearing client session:", req.cookies.session)
      res.clearCookie("session")
    }
  }

  res.status(401).send()
})

app.post('/api/auth/guest', (req, res) => {
  if (sessions.get(auth(req))) {
    res.status(403).send()
    return
  } else {
    if (req.cookies.session) {
      res.clearCookie("session")
    }
  }
  
  let tries = 0
  let session = generateSession()
  while (sessions.get(session)) {
    session = generateSession()
    if (tries++ > 10) {
      res.status(500).send()
      console.log("Failed to generate session")
      return
    }
  }

  let i = 0;
  for (const user of users.values()) {
    chats.getMessages(chats.id(user.id, session))

    if (i % 2 === 0) {
      const message: Message = {
        id: Math.random().toString(36).substring(2, 15),
        text: "Hello!",
        timestamp: Date.now(),
        author: user.id
      }
      chats.addMessage(chats.id(user.id, session), message)
    }

    i++
  }

  sessions.set(session, { id: session, userId: session })
  console.log("Generated session:", session)
  res.cookie("session", session, { httpOnly: true, secure: true, sameSite: "strict" })
  res.status(200).send({ userId: session })
})

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(Deno.cwd(), "./dist/index.html"));
})

app.listen(port, () => {
  console.log(`Deno server listening on port ${port}`)
})
