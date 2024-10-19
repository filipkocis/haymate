import { LucideAtom, LucideCog, LucideHeart, LucideMessageCircle } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "/src/lib/utils"
import UnicornIcon from "/src/assets/svg/UnicornIcon"
import useAnimation from "/src/hooks/useAnimation"
import ThemeToggle from "/src/components/ThemeToggle"

const SIZE = 24
const ROUTES = [
  {
    name: 'Home',
    href: '/',
    icon: <LucideAtom size={SIZE} />,
  },
  {
    name: 'Match',
    href: '/match',
    icon: <LucideHeart size={SIZE} />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <UnicornIcon size={SIZE + 4} />,
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: <LucideMessageCircle size={SIZE} />,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: <LucideCog size={SIZE} />,
  }
]

export default function Navigation({ open }: { open: boolean }) {
  const animation = useAnimation({ duration: 300, deps: [open] }) 
  const location = useLocation()

  const fullyOpen = animation.state !== "entered"

  return (
    <div className={cn(
      "grid grid-rows-[1fr,auto]",
      "max-md:w-[220px] max-md:bg-background max-md:border-r max-md:rounded-none max-md:bottom-0 max-md:z-50 max-md:transition-transform max-md:absolute max-md:left-0 max-md:top-[3rem] ",
      fullyOpen ? "max-md:-translate-x-full" : "max-md:translate-x-0",
    )}>
      <nav>
        <ul className="px-6 py-3 flex flex-col gap-3">
          {ROUTES.map((route) => (
            <li key={route.href}>
              <Link 
                to={route.href} 
                className={cn(
                  "flex items-center hover:text-primary/80 transition-all px-2 py-1",
                  open && "text-primary",
                  location.pathname === route.href && "text-primary hover:text-primary/80 font-bold scale-110",
                )}
              >
                <div className="w-max">
                  {route.icon}
                </div>
                {animation.visible && 
                  <span
                    className={cn(
                      "ml-6",
                      animation.state == "entering" && "animate-nav-fade-in",
                      animation.state == "exiting" && "animate-nav-fade-out",
                  )}>
                    {route.name}
                  </span>
                } 
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className={cn(
        "flex justify-center gap-2 px-4 py-2 flex-col",
        fullyOpen ? "items-center" : "items-start"
      )}>
        <ThemeToggle short={fullyOpen} />
        <p className={cn("text-sm text-foreground/80", fullyOpen && "w-0 overflow-hidden whitespace-nowrap")}>© 2024 Filip LLC</p>
      </footer>
    </div>
  )
}
