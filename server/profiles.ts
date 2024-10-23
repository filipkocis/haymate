import Store from "./store.ts";
import profileData from "./profiles/data.json" with { type: "json" }

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
  hobbies: string[]
  interests: string[] 
  photos: string[]

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

export default class ProfileStore extends Store<string, Profile> {
  constructor() {
    super()
  }

  getAny(): Profile | undefined {
    const keys = Array.from(this.keys())
    if (keys.length === 0) return;
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    return this.get(randomKey)
  }

  getUser(id: string): User | undefined {
    const profile = this.get(id)
    if (!profile) return;

    return {
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar
    }
  }

  load() {
    for (const profile of profileData) {
      profile.avatar = '/' + profile.avatar
      for (let i = 0; i < profile.photos.length; i++) {
        profile.photos[i] = '/' + profile.photos[i]
      }

      this.set(profile.id, profile)
    }
  }
}
