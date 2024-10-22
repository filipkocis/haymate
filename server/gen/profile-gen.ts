import type { Profile } from "../users.ts";
import { generateSession } from "../utils.ts";
import combos from "./combos.json" with { type: "json" }

function getImagePaths() {
  const paths: string[] = []

  for (const entry of Deno.readDirSync("../images/")) {
    if (entry.isFile) {
      paths.push(entry.name)
    }
  }

  return paths
}

generateProfilesSeq()

function generateProfilesSeq() {
  const profiles: Profile[] = []
  const paths = getImagePaths()

  for (const path of paths) {
    const profile: Profile = {
      id: generateSession(),
      name: randItem(combos.names),
      avatar: path,

      bio: randItem(combos.bios),
      hobbies: randItemsUnique(combos.hobbies, rand(1, 10)),
      interests: randItemsUnique(combos.interests, rand(1, 10)),
      photos: [path],

      details: {
        location: randItem(combos.locations),
        work: randItem(combos.workplaces),
        education: randItem(combos.educations),
        age: rand(3, 33),
        personality: randItem(combos.myersBriggsTypes),
        sign: randItem(combos.zodiacSigns),
        lookingFor: randItem(combos.lookingFor),
      },

      stats: {
        matches: rand(0, 1000),
        loves: rand(0, 250),
        haybales: rand(0, 150),
      }
    }

    if (profile.stats.loves > profile.stats.matches) {
      profile.stats.matches += profile.stats.loves
    } 

    profiles.push(profile)
  }

  const json = JSON.stringify(profiles, null, 2)
  Deno.writeTextFileSync("../profiles/data.json", json)
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randItem<T>(items: T[]) {
  return items[rand(0, items.length - 1)]
}

function randItems<T>(items: T[], count: number) {
  const result: T[] = []
  for (let i = 0; i < count; i++) {
    result.push(randItem(items))
  }
  return result
}

function randItemsUnique<T>(items: T[], count: number) {
  const result: T[] = []
  for (let i = 0; i < count; i++) {
    const item = randItem(items)
    if (!result.includes(item)) {
      result.push(item)
    } else {
      i--
    }
  }

  return result
}
