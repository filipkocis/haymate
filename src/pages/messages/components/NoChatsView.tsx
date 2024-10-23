import Flushed from "@/assets/flushed_nobg.png";

export default function NoChatsView({ label }: { label: string }) {
  return (
    <div className="animate-fade-in-page flex gap-8 items-center justify-center flex-col grow">
      <img 
        src={Flushed} 
        alt="Flushed emoji" 
        className="w-20 h-20 animate-goofball"
      />
      <p className="text-xl">{label}</p> 
    </div>
  )
}
