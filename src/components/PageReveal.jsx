import { useLocation } from 'react-router-dom'
import './PageReveal.css'

export default function PageReveal({ children }) {
  const { pathname } = useLocation()

  return (
    <div key={pathname} className="page-reveal">
      {children}
    </div>
  )
}
