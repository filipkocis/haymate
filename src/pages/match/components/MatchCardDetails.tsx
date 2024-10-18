import { LucideHeart, LucideHeartPulse } from "lucide-react";
import HayIcon from "/src/assets/svg/HayIcon";

export default function MatchCardDetails() {
  return (
    <div className="sm:w-[29rem] flex flex-col gap-8 xl:overflow-auto rounded-none p-4">
      <div className="grid grid-cols-3 gap-6 [&>*]:shadow-[0_0_0.8rem_0.15rem_hsl(var(--border))]">
        <div className="card px-3 py-2 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <LucideHeart size={20} strokeWidth="2" className="text-pink-400" />
            <span className="font-bold">20</span>
          </div>
          <p className="text-sm">Matches</p>
        </div>

        <div className="card px-3 py-2 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <LucideHeartPulse size={20} strokeWidth="2" className="text-red-400" />
            <span className="font-bold">20</span>
          </div>
          <p className="text-sm">Loves</p>
        </div>

        <div className="card px-3 py-2 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <HayIcon size={20} className="text-primary" />
            <span className="font-bold">20</span>
          </div>
          <p className="text-sm">Haybales</p>
        </div>
      </div>
      
      <div className="card px-4 py-3 shadow-[0_0_0.8rem_0.15rem_hsl(var(--border))]">
        <h2 className="text-lg font-semibold">Bio</h2>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        </p>
      </div>

      <div className="card px-4 py-3 shadow-[0_0_0.8rem_0.15rem_hsl(var(--border))] flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Hobbies</h2>
        <div className="flex flex-wrap gap-2 text-sm text-black [&_span]:bg-primary [&_span]:rounded-xl [&_span]:px-2 [&_span]:py-0.5">
          <span>Reading</span>
          <span>Coding</span>
          <span>Gaming</span>
          <span>Computer building</span>
          <span>Counting stars</span>
          <span>Movies</span>
        </div>
      </div>
    </div>
  )
}
