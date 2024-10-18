import { Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";

export default function Layout() {
  return (
    <div className="grid md:grid-cols-[auto,1fr] grid-rows-[auto,1fr] h-screen overflow-hidden">
      <AppLayout />
      <main className="grid overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
