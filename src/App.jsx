import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import HomePage from './pages/HomePage'
import AudioPage from './pages/AudioPage'
import WebDesignPage from './pages/WebDesignPage'
import PhotoPage from './pages/PhotoPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: false }}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="audio" element={<AudioPage />} />
          <Route path="web-design" element={<WebDesignPage />} />
          <Route path="photo" element={<PhotoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}