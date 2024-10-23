import { LucideHardHat, LucideSchool } from "lucide-react";
import LocationIcon from "@/assets/svg/LocationIcon";
import { Profile } from "../types";

export default function MatchCardProfile({ profile }: { profile: Profile }) {
  return (
    <div className="xl:overflow-auto p-4 sm:w-fit rounded-none">
      <div className="relative sm:w-[29rem]">
        <div className="before:shadow-[0_0_0.8rem_0.15rem_hsl(var(--foreground)/0.2)] before:rounded-xl before:bg-gradient-to-t before:from-black/30 before:via-transparent before:to-transparent before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0">
          <img 
            src={profile.photos[0]}
            className="aspect-[2/3] h-full w-full object-cover object-center rounded-xl"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 grid grid-rows-[auto,auto] gap-3">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
            <img src={profile.avatar} className="aspect-[1/1] h-full w-full object-cover object-center" />
          </div>

          <div className="grid grid-rows-[auto,auto] gap-2">
            <h1 
              className="font-bold text-2xl text-white leading-none" 
              style={{
                textShadow: '0 0 8px rgba(0,0,0,0.8)'
              }}
            >
              {profile.name}
            </h1>

            <div className="text-white">
              <p className="flex items-center gap-1">
                <LucideHardHat size={20} />
                {profile.details.work}
              </p>
              <p className="flex items-center gap-1">
                <LucideSchool size={20} />
                {profile.details.education}
              </p>
              <p className="flex items-center gap-1">
                <LocationIcon size={20} />
                {profile.details.location}
              </p>
            </div>

            <div className="flex gap-2 [&>*]:s text-black">
              <span className="bg-primary rounded-xl px-2 py-0.5 text-sm">{profile.details.age}</span>
              <span className="bg-primary rounded-xl px-2 py-0.5 text-sm">{profile.details.personality}</span>
              <span className="bg-primary rounded-xl px-2 py-0.5 text-sm">{profile.details.sign}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
