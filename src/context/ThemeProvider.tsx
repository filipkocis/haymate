import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light"
export type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

function useThemeLogic() {
  const [theme, setTheme] = useState<Theme>(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const stored = localStorage.getItem("theme") === "dark" ? "dark" : "light"
    return stored || (prefersDark ? "dark" : "light")
  })

  const setAndStoreTheme = (theme: "dark" | "light") => {
    localStorage.setItem("theme", theme)
    setTheme(theme)

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // apply theme on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return [theme, setAndStoreTheme] as const
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useThemeLogic()

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
