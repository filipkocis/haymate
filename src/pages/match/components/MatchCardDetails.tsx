import { LucideHeart, LucideHeartPulse } from "lucide-react";
import HayIcon from "@/assets/svg/HayIcon";
import { Profile } from "../types";

export default function MatchCardDetails({ profile }: { profile: Profile }) {
  return (
    <div className="sm:w-[29rem] flex flex-col gap-8 xl:overflow-auto rounded-none p-4">
      <div className="grid grid-cols-3 gap-6 [&>*]:shadow-[0_0_0.8rem_0.15rem_hsl(var(--border))]">
        <div className="card px-3 py-2 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <LucideHeart size={20} strokeWidth="2" className="text-pink-400" />
            <span className="font-bold">{profile.stats.matches}</span>
          </div>
          <p className="text-sm">Matches</p>
        </div>

        <div className="card px-3 py-2 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <LucideHeartPulse size={20} strokeWidth="2" className="text-red-400" />
            <span className="font-bold">{profile.stats.loves}</span>
          </div>
          <p className="text-sm">Loves</p>
        </div>

        <div className="card px-3 py-2 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <HayIcon size={20} className="text-primary" />
            <span className="font-bold">{profile.stats.haybales}</span>
          </div>
          <p className="text-sm">Haybales</p>
        </div>
      </div>
      
      <div className="card px-4 py-3 shadow-[0_0_0.8rem_0.15rem_hsl(var(--border))]">
        <h2 className="text-lg font-semibold">Bio</h2>
        <p className="text-sm">
          {profile.bio}
        </p>
      </div>

      <div className="card px-4 py-3 shadow-[0_0_0.8rem_0.15rem_hsl(var(--border))] flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Hobbies</h2>
        <div className="flex flex-wrap gap-2 text-sm text-black [&_span]:bg-primary [&_span]:rounded-xl [&_span]:px-2 [&_span]:py-0.5">
          {profile.hobbies?.map((hobby, i) => {
            return <span key={i}>{hobby}</span>
          })}
        </div>
      </div>

      <div className="card px-4 py-3 shadow-[0_0_0.8rem_0.15rem_hsl(var(--border))] flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Interests</h2>
        <div className="flex flex-wrap gap-2 text-sm text-black [&_span]:bg-primary [&_span]:rounded-xl [&_span]:px-2 [&_span]:py-0.5">
          {profile.interests?.map((interest, i) => {
            return <span key={i}>{interest}</span>
          })}
        </div>
      </div>
    </div>
  )
}
