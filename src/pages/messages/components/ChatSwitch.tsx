import { cn } from "/src/lib/utils"

export type Selected = 'messages' | 'requests' | 'x'
export default function ChatSwitch({ selected, setSelected, variant }: { selected: Selected, setSelected: (selected: Selected) => void, variant: Selected }) {
  return (
    <button 
      className={cn(
        "p-2 text-center uppercase min-w-[110px] duration-300 transition-all",
        selected == variant && "text-black")
      } 
      onClick={() => setSelected(variant)}
    >
      {variant}
    </button>  
  )
}
