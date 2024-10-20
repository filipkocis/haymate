import { cn } from "/src/lib/utils";

export default function MessageCard({ right = false }: { right?: boolean }) {
  return (
    <div style={{ wordBreak: "break-word" }} className={cn(
      "min-h-[1rem] items-center border px-3 py-2 rounded-[2rem] max-w-[80%] whitespace-pre-wrap",
      right ? "bg-primary text-primary-foreground" : "bg-foreground/10 text-foreground",
      right ? "self-end" : "self-start"
    )}>
      <p className="">Hello, how are you?</p>
    </div>
  )
}
