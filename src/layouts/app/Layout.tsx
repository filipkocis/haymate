import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <div>
        <h1>Layout</h1>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
