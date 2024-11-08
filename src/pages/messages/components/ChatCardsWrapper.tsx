export default function ChatCardsWrapper({ children }: { children?: React.ReactNode[] }) {
  return (
    <div className="flex flex-col gap-3">
      {children}
    </div>
  )
}
