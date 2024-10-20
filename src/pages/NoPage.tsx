import Flushed from "/src/assets/flushed_nobg.png";

export default function NoPage() {
  return (
    <div className="animate-fade-in-page flex gap-8 items-center justify-center flex-col grow">
      <img 
        src={Flushed} 
        alt="Flushed emoji" 
        className="w-32 sm:w-40 h-32 sm:h-40 animate-goofball"
      />
      <p className="text-2xl text-center sm:text-4xl">404: Page Not Found</p>
    </div>
  )
}
