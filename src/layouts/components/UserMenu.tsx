import { useSession } from "@/context/SessionProvider";
import Avatar from "@/components/Avatar";

export default function UserMenu() {
  const { session } = useSession()

  if (!session) return null;

  return (
    <div className="flex gap-3 items-center">
      <p>Hi, John Doe!</p>
      <Avatar size={40} src="https://randomuser.me/api/portraits/men/1.jpg" />
    </div>
  )
}
