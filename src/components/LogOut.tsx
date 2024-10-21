import { LucideLogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/context/SessionProvider";

export default function LogOut() {
  const { session, setSession } = useSession();

  const handleLogout = () => {
    if (!session) return;
    fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" })   
    setSession(false)
  }

  if (!session) return null;

  return (
    <button
      onClick={handleLogout}
      className={cn(
        "p-2 rounded-full transition-all text-red-600 hover:bg-red-600/20",
        "text-2xl rounded-full flex justify-start border-2",
      )}
    >
      <LucideLogOut size={19} strokeWidth={3} />
    </button>
  )
}
