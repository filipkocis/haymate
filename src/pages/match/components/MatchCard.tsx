import { cn } from "@/lib/utils";
import MatchCardDetails from "./MatchCardDetails";
import MatchCardProfile from "./MatchCardProfile";
import { Profile } from "../types";

export default function MatchCard({ profile, className, style }: { profile: Profile, className?: string, style?: any }) {
  return (
    <div style={style} className={cn("max-sm:px-2 flex rounded-none flex-col sm:gap-4 xl:grid xl:grid-cols-2 overflow-auto xl:overflow-hidden w-full sm:w-fit", className)}>
      <MatchCardProfile profile={profile} />
      <MatchCardDetails profile={profile} />
    </div>
  )
}
