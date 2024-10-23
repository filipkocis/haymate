import type ProfileStore from "./profiles.ts";
import Store from "./store.ts";

export default class MatchStore extends Store<string, string[]> {
  #profiles: ProfileStore

  constructor(profiles: ProfileStore) {
    super()
    this.#profiles = profiles
  }

  previous(id: string) {
    let matches = this.get(id)

    if (!matches) {
      this.set(id, [])
      this.next(id)
      this.next(id)
      matches = this.get(id)
    }
    if (!matches) return null;

    if (!matches.length) this.next(id);
    if (matches.length === 1) this.next(id);
    if (matches.length === 1) this.next(id); // this.next can reset matches, so check it again
    if (matches.length < 2) return null;
    
    const match = matches[matches.length - 2]
    return this.#profiles.get(match) || null
  }

  current(id: string) {
    const matches = this.get(id)

    if (!matches) {
      this.set(id, [])
      return this.next(id)
    }

    if (!matches.length) {
      return this.next(id)
    }

    const match = matches[matches.length - 1]
    return this.#profiles.get(match) || null
  }

  next(id: string) {
    let profile = this.#profiles.getAny()
    const matches = this.get(id)
    if (!profile || !matches) return null;

    if (matches.length >= Math.floor(this.#profiles.length() / 2)) {
      this.set(id, [profile.id])
      return profile
    }

    let i = 0;
    while (matches.includes(profile.id)) {
      profile = this.#profiles.getAny()
      if (!profile) return null;
      if (i++ > 500) break;
    }

    matches.push(profile.id)
    return profile
  }
}
