import { LucideMenu } from "lucide-react"
import { useState } from "react"
import Navigation from "./Navigation"
import { cn } from "/src/lib/utils"

export default function AppLayout() {
  const [open, setOpen] = useState(true)

  return (
    <>
      <div className="col-span-full grid grid-cols-[auto,1fr,auto] px-3 py-2">
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setOpen(!open)} className="ml-4">
            <LucideMenu size={30} className={cn("h-[30px] w-[30px] transition-colors", open && "text-primary")} />
          </button>
          <h1 className="text-2xl font-extrabold">HAY</h1>
        </div>
      </div>
      <Navigation open={open}/>
    </>
  )
}
