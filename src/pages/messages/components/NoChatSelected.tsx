import Flushed from "/src/assets/flushed_nobg.png";

export default function NoChatSelected() {
  return (
    <div className="animate-fade-in-page flex gap-8 items-center justify-center flex-col grow">
      <img 
        src={Flushed} 
        alt="Flushed emoji" 
        className="w-28 h-28 animate-goofball"
      />
      <p className="text-2xl">No Chat Selected</p> 
    </div>
  )
}
