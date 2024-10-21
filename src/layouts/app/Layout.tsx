import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import { useSession } from "@/context/SessionProvider";
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session } = useSession()
  const noSession = session === null

  useEffect(() => {
    if (noSession && location.pathname !== "/login") navigate("/login")
  }, [session, location.pathname])

  return (
    <div className="grid md:grid-cols-[auto,1fr] grid-rows-[auto,1fr] h-screen overflow-hidden">
      <AppLayout />
      <main className="grid overflow-hidden">
        {session && <Outlet />}
        {(noSession && location.pathname === "/login") && <Outlet />}
      </main>
    </div>
  )
}
