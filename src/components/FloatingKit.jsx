import { useLocation } from 'react-router-dom'
import amp from '../assets/kit-images/amp.png'
import cameraBrownie from '../assets/kit-images/camera-brownie.png'
import cameraSlr from '../assets/kit-images/camera-slr.png'
import headphones from '../assets/kit-images/headphones.png'
import laptop from '../assets/kit-images/laptop.png'
import midiController from '../assets/kit-images/midi-controller.png'
import tapeRecorder from '../assets/kit-images/tape-recorder.png'
import '../App.css'

const kitSets = {
  '/': [
    { src: tapeRecorder, name: 'audio', drift: 'a', driftDuration: 17, driftDelay: 0 },
    { src: laptop, name: 'web', drift: 'b', driftDuration: 20, driftDelay: -4 },
    { src: cameraBrownie, name: 'photo', drift: 'c', driftDuration: 22, driftDelay: -8 },
  ],
  '/audio': [
    { src: tapeRecorder, name: 'audio', drift: 'a', driftDuration: 17, driftDelay: 0 },
    { src: headphones, name: 'audio-2', drift: 'b', driftDuration: 19, driftDelay: -3 },
    { src: amp, name: 'audio-3', drift: 'c', driftDuration: 21, driftDelay: -7 },
    { src: midiController, name: 'audio-4', drift: 'd', driftDuration: 18, driftDelay: -11 },
  ],
  '/web-design': [
    { src: laptop, name: 'web', drift: 'b', driftDuration: 20, driftDelay: 0 },
  ],
  '/photo': [
    { src: cameraBrownie, name: 'photo', drift: 'c', driftDuration: 22, driftDelay: 0 },
    { src: cameraSlr, name: 'photo-2', drift: 'd', driftDuration: 19, driftDelay: -6 },
  ],
}

function getKitItems(pathname) {
  return kitSets[pathname] ?? kitSets['/']
}

function KitImage({ src, name, drift, driftDuration, driftDelay }) {
  return (
    <div className={`kit-wrap kit-wrap-${name}`}>
      <div className="kit-float">
        <div
          className={`kit-drift kit-drift-${drift}`}
          style={{
            '--kit-drift-duration': `${driftDuration}s`,
            '--kit-drift-delay': `${driftDelay}s`,
          }}
        >
          <img src={src} alt="" />
        </div>
      </div>
    </div>
  )
}

export default function FloatingKit() {
  const { pathname } = useLocation()
  const items = getKitItems(pathname)

  return (
    <div className={`floating-kit${pathname === '/photo' ? ' floating-kit--photo' : ''}`} aria-hidden="true">
      {items.map((item) => (
        <KitImage key={`${pathname}-${item.name}`} {...item} />
      ))}
    </div>
  )
}
