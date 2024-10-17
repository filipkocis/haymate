import Flushed from "/src/assets/flushed_nobg.png";

export default function NoPage() {
  return (
    <div className="flex gap-8 items-center justify-center flex-col grow">
      <img 
        src={Flushed} 
        alt="Flushed emoji" 
        className="w-40 h-40 animate-goofball"
      />
      <p className="text-4xl">404: Page Not Found</p>
    </div>
  )
}
