import Flushed from "@/assets/flushed_nobg.png";
import { useEffect, useState } from "react";
import { User } from "../messages/types";
import Loader from "@/components/Loader";

export default function Explore() {
  const [search, setSearch] = useState<string>("");
  const [resultSearch, setResultSearch] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.length) {
      setResults([])
      setResultSearch("")
      setLoading(false)
      return;
    }

    setLoading(true)
    const controller = new AbortController()
    let timer: number;

    function query(search: string) {
      clearTimeout(timer)  
      timer = setTimeout(async () => {
        const res = await fetch(`${import.meta.env.VITE_HOST}/api/search?q=${search}`, { 
          signal: controller.signal 
        })

        if (!res.ok) return;
        const data = await res.json();

        setResults(data.results)
        setResultSearch(search)
        setLoading(false)
      }, 500)
    }
    query(search)
    
    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [search])

  return (
    <div className="animate-fade-in-page flex flex-col p-2 overflow-hidden rounded-none">
      <div className="overflow-auto rounded-none flex flex-col items-center w-full gap-16">
        <div className="pt-[20vh] pb-8 text-center place-items-center grid grid-rows-2 gap-8 lg:gap-14 w-full">
          <p className="text-5xl flex items-end">
            Expl
            <img src={Flushed} alt="flushed" className="w-10 h-10" />
            re
          </p>
          <input 
            type="text" 
            placeholder="Search" 
            className="text-[1rem] max-w-[1000px]" 
            onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
          />
        </div>

        {loading && (
          <Loader />
        )}

        {!!resultSearch.length && (
          <div className="flex flex-col gap-4 w-full max-w-[1000px] pt-[15vh]">
            <p className="text-lg">
              <span className="font-semibold">{results.length}</span> result{results.length === 1 ? "" : "s"} for <span className="font-semibold">{resultSearch}</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 p-2">
              {results.map(user => (
                <div key={user.id} className="relative flex rounded-lg">
                  <div className="before:shadow-[0_0_0.8rem_0.15rem_hsl(var(--foreground)/0.2)] before:rounded-xl before:bg-gradient-to-t before:from-black/30 before:via-transparent before:to-transparent before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0">
                    <img 
                      src={user.avatar}
                      alt={user.name}
                      className="aspect-[2/3] h-full w-full object-cover object-center rounded-xl"
                    />
                  </div>

                  <p 
                    style={{
                      textShadow: '0 0 0.3rem black'
                    }} 
                    className="absolute bottom-0 left-0 p-2 font-semibold text-white"
                  >
                    {user.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
