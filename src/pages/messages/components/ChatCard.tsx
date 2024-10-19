export default function ChatCard() {
  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-4 p-3 rounded-md shadow-[0_0_0.5rem_1px_hsl(var(--border))]">
      <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" className="aspect-[1/1] h-full w-full object-cover object-center" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="font-semibold">John Doe</p>
          <p className="text-xs text-foreground/60">2h</p>
        </div>
        <p style={{ wordBreak: "break-word" }} className="text-foreground/60 text-ellipsis rounded-none line-clamp-2">
          Hello, how are you?
        </p>
      </div>
    </div>
  )
}
