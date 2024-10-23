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
