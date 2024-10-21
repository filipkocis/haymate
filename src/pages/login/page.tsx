import Button from "@/components/Button";
import GoogleIcon from "@/assets/google.png";
import EmailIcon from "@/assets/email.png";
import GithubIcon from "@/assets/github.png";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/SessionProvider";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { session, setSession } = useSession();

  useEffect(() => {
    if (session) navigate("/");
  }, [session])

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_HOST}/api/auth/guest`, { method: "POST" })
      if (!res.ok) {
        setSession(null)
        console.error(res.statusText)
        return
      }

      const data = await res.json()
      const userId = data?.userId
      
      if (!userId) {
        setSession(null)
        console.error("Failed to login as guest")
        return
      }

      setSession(userId as string)
      navigate("/")
    } catch (error) {
      setSession(null)
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center p-2">
      <div className="w-[90dvw] max-w-[400px] flex flex-col gap-4 border px-8 py-6 shadow-[0_0_1rem_0.2rem_hsl(var(--border))]">
        <div className="flex gap-2 items-center pb-[15vh]">
          <img src="/hay.png" alt="logo" width={50} height={50} />
          <p className="text-2xl font-semibold">Welcome to Hay!</p> 
        </div>
        <LoginButton text="Google" icon={GoogleIcon} />
        <LoginButton text="Github" icon={GithubIcon} />
        <LoginButton text="Email" icon={EmailIcon} />
        <Separator />
        <Button variant="secondary" onClick={handleLogin}>Continue as Guest</Button>
      </div>
    </div>
  )
}

function LoginButton({ text, icon }: { text: string, icon: string }) {
  return (
    <Button className="cursor-not-allowed grid grid-cols-[auto,1fr] text-center items-center h-auto">
      <img src={icon} alt={text} width={25} height={25}  />
      {text}
    </Button> 
  )
}

function Separator() {
  return (
    <div className="relative flex items-center justify-center gap-4 py-4">
      <div className="h-[1px] w-full bg-foreground/20"></div>
      <p className="px-1 w-min text-sm bg-background text-foreground/50 absolute">OR</p>
    </div>
  )
}
