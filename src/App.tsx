import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/app/Layout'
import NoPage from './pages/NoPage'
import Home from './pages/home/page'
import Match from './pages/match/page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="match" element={<Match />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
