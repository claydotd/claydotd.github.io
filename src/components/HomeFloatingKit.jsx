import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import cameraBrownie from '../assets/kit-images/camera-brownie.png'
import laptop from '../assets/kit-images/laptop.png'
import tapeRecorder from '../assets/kit-images/tape-recorder.png'
import '../App.css'

const loadedSrcs = new Set()

const items = [
  { src: tapeRecorder, name: 'audio' },
  { src: laptop, name: 'web' },
  { src: cameraBrownie, name: 'photo' },
]

function KitImage({ src, name }) {
  const imgRef = useRef(null)
  const [ready, setReady] = useState(() => loadedSrcs.has(src))

  useLayoutEffect(() => {
    const img = imgRef.current
    if (!img || ready) return

    if (img.complete && img.naturalHeight > 0) {
      loadedSrcs.add(src)
      setReady(true)
    }
  }, [src, ready])

  const onReady = () => {
    loadedSrcs.add(src)
    setReady(true)
  }

  return (
    <div className={`kit-wrap kit-wrap-${name}${ready ? ' kit-wrap--ready' : ''}`}>
      <img
        ref={imgRef}
        src={src}
        alt=""
        onLoad={onReady}
        onError={onReady}
      />
    </div>
  )
}

export default function HomeFloatingKit() {
  const { pathname } = useLocation()
  const visible = pathname === '/'

  return (
    <div
      className={`floating-kit${visible ? ' floating-kit--visible' : ''}`}
      aria-hidden={!visible}
    >
      {items.map((item) => (
        <KitImage key={item.src} src={item.src} name={item.name} />
      ))}
    </div>
  )
}
