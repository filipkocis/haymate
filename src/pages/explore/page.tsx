import Flushed from "/src/assets/flushed_nobg.png";

export default function Explore() {
  return (
    <div className="animate-fade-in-page flex flex-col p-2 overflow-hidden rounded-none">
      <div className="overflow-auto rounded-none flex flex-col items-center w-full">
        <div className="pt-[20vh] pb-8 text-center place-items-center grid grid-rows-2 gap-8 lg:gap-14 w-full">
          <p className="text-5xl flex items-end">
            Expl
            <img src={Flushed} alt="flushed" className="w-10 h-10" />
            re
          </p>
          <input type="text" placeholder="Search" className="text-[1rem] max-w-[1000px]" />
        </div>
        
        
      </div>
    </div>
  )
}
