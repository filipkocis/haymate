import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/app/Layout'
import NoPage from './pages/NoPage'
import Home from './pages/home/page'
import Match from './pages/match/page'
import Messages from './pages/messages/page'
import ThemeProvider from './context/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="match" element={<Match />} />
            <Route path="messages" element={<Messages />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
