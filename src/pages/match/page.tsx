import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import MatchCard from "./components/MatchCard";
import MatchButtons from "./components/MatchButtons";
import { Profile } from "./types";
import Loader from "@/components/Loader";

export default function Match() {
  const [switcheroo, setSwitcheroo] = useState(true)
  const [current, setCurrent] = useState<Profile>()
  const [next, setNext] = useState<Profile>()

  function cancelHandler() {
    setSwitcheroo(true)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const res1 = await fetch("/api/match", { signal: controller.signal })
        if (!res1.ok) return
        const res2 = await fetch("/api/match", { signal: controller.signal })
        if (!res2.ok) return
        const data1 = await res1.json()
        const data2 = await res2.json()

        setCurrent(data1.next)
        setNext(data2.next)
      } catch (error) {
        console.error(error)
      }
    }
    load()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!switcheroo) return;

    const controller = new AbortController()
    let timer: number;

    async function load() {
      try {
        const res = await fetch("/api/match", { signal: controller.signal })
        if (!res.ok) return
        const data = await res.json()

        timer = setTimeout(() => {
          setNext(next => {
            setCurrent(next);
            return data.next
          })

          setSwitcheroo(false)
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    }
    load()

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [switcheroo])

  if (!current || !next) return <Loader />

  return (
    <div className="animate-fade-in-page relative flex flex-col sm:grid grid-rows-[1fr,auto] justify-between sm:justify-center sm:px-6 pt-2 sm:pt-6 overflow-hidden">
      <MatchCard profile={next} className={cn(
        "absolute opacity-0 scale-0 justify-self-center self-center top-2 sm:top-6 -z-10",
        !switcheroo && "visibility-none",
        switcheroo && "duration-1000 opacity-100 scale-100"
      )} />
      <MatchCard 
        profile={current}
        className={cn(
          switcheroo && "duration-500 transition-all opacity-0 -translate-x-1/3 z-10 rotate-[-30deg]",
        )} 
      />
      <MatchButtons onCancel={cancelHandler} className="z-0 bg-background" />
    </div>
  )
}
