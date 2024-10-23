import { useSession } from "@/context/SessionProvider";
import Avatar from "@/components/Avatar";

export default function UserMenu() {
  const { session } = useSession()

  if (!session) return null;

  return (
    <div className="flex gap-3 items-center">
      <p>Hi, Guest!</p>
      <Avatar size={40} src="/SxAMojJiDmojqhTfUGxO4.png" />
    </div>
  )
}
