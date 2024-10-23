// @deno-types="npm:@types/express"
import express from "npm:express"
import cookieParser from "npm:cookie-parser"
import * as path from "jsr:@std/path";
import { auth, generateSession } from "./utils.ts";
import SessionStore, { type Session } from "./sessions.ts";
import ChatStore from "./messages.ts";
import ProfileStore, { type User } from "./profiles.ts";
import MatchStore from "./matches.ts";

const sessions = new SessionStore()
const chats = new ChatStore()
const profiles = new ProfileStore()
profiles.load()
const matches = new MatchStore(profiles)

const app = express()
const port = Deno.env.get("PORT") || 3000

app.use(express.static(path.join(Deno.cwd(), "./images")));
app.use(express.static(path.join(Deno.cwd(), "./dist")));
app.use(express.json())
app.use(cookieParser())

function deleteGuest(session: Session) {
  console.log("Deleting guest:", session.userId)

  sessions.delete(session.id)
  matches.delete(session.userId)

  for (const chatId of chats.allChats(session.userId)) {
    chats.delete(chatId)
  }
}

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

app.get('/api/search', (req, res) => {
  const query = req.query.q?.toString().toLowerCase() 

  if (!query) {
    res.status(400).send()
    return
  }

  const results: User[] = []
  for (const profile of profiles.values()) {
    if (profile.name.toLowerCase().includes(query)) {
      results.push({ 
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar
      })
    }
  }

  res.status(200).send({ results: results.slice(0, 15) })
})

const btoi = (b: boolean) => b ? 1 : 0
app.get('/api/match', async (req, res) => {
  const userId = sessions.get(auth(req))?.userId
  if (!userId) {
    res.status(401).send()
    return
  }

  let wantsNext = !!req.query.next?.toString() 
  const didLike = !!req.query.like?.toString() 
  const didLove = !!req.query.love?.toString() 

  if (btoi(wantsNext) + btoi(didLike) + btoi(didLove) > 1) {
    res.status(400).send()
    return
  }

  if (didLike || didLove) {
    const previous = matches.previous(userId)
    if (!previous) { res.status(404).send(); return }

    const chatId = chats.id(previous.id, userId)
    chats.get(chatId)

    previous.stats.matches++
    if (didLove) {
      previous.stats.loves++

      // 75% chance to get a reply with a love
      if (Math.random() > 0.25) {
        await chats.generateMessage(chatId, previous)
      }
    } else {
      // 25% chance to get a reply with a like
      if (Math.random() > 0.75) {
        await chats.generateMessage(chatId, previous)
      }
    }

    wantsNext = true // we need to skip the current match
  }

  if (wantsNext) {
    const next = matches.next(userId)
    if (!next) { res.status(404).send(); return }

    res.status(200).send({ next })
    return
  }

  const previous = matches.previous(userId)
  const current = matches.current(userId)

  if (!previous || !current) {
    res.status(404).send()
    return
  }

  res.status(200).send({ previous, current })
})

app.get('/api/profile', (req, res) => {
  const id = req.query.id?.toString() 
  if (!id) { res.status(400).send(); return; }

  const profile = profiles.get(id)
  if (!profile) { res.status(404).send(); return; }

  res.status(200).send(profile)
})

app.get('/api/user', (req, res) => {
  const id = req.query.id?.toString() 
  if (!id) { res.status(400).send(); return; }

  const user = profiles.getUser(id)
  if (!user) { res.status(404).send(); return; }

  res.status(200).send(user)
})

app.post('/api/send', async (req, res) => {
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

  const profileB = profiles.get(userIdB)
  if (!profileB) {
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
  const message = ChatStore.message(text, userId)
  
  chats.addMessage(id, message)

  const reply = await chats.generateMessage(id, profileB)
  res.status(200).send({ sent: message, reply })
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

  if (!profiles.get(userIdB)) {
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
    const otherUser = profiles.getUser(otherUserId)
    return {
      id: chatId,
      user: otherUser,
      lastMessage: chats.getLatestMessage(chatId)
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

  deleteGuest(session)
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
