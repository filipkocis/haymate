import { cn } from "/src/lib/utils";
import { useEffect, useState } from "react";
import MatchCard from "./components/MatchCard";
import MatchButtons from "./components/MatchButtons";

export default function Match() {
  const [switcheroo, setSwitcheroo] = useState(true)
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState(1)

  function cancelHandler() {
    setSwitcheroo(true)
  }

  useEffect(() => {
    if (!switcheroo) return
    
    const timer = setTimeout(() => {
      setNext(next => {
        setCurrent(next);
        return next + 1
      })

      setSwitcheroo(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [switcheroo])

  return (
    <div className="relative flex flex-col sm:grid grid-rows-[1fr,auto] justify-between sm:justify-center sm:px-6 pt-2 sm:pt-6 overflow-hidden">
      <MatchCard className={cn(
        "absolute opacity-0 scale-0 justify-self-center self-center top-2 sm:top-6 -z-10",
        !switcheroo && "visibility-none",
        switcheroo && "duration-1000 opacity-100 scale-100"
      )} />
      <MatchCard 
        className={cn(
          switcheroo && "duration-500 transition-all opacity-0 -translate-x-1/3 z-10 rotate-[-30deg]",
        )} 
      />
      <MatchButtons onCancel={cancelHandler} className="z-0 bg-background" />
    </div>
  )
}
