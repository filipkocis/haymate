import { Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";

export default function Layout() {
  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] h-screen">
      <AppLayout />
      <main className="grid">
        <Outlet />
      </main>
    </div>
  )
}
