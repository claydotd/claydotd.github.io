/* 
TO DO:
1. Images to represent each service at floating at the sides of the hero section and the rest of the page.
2. Hover effect for images (colourise/warmth effect).
3. contact/inquiry form

images are contained at ../assets/kit-images
camera-brownie.png
camera-slr.png
headphones.png
laptop.png
midi-controller.png
tape-recorder.png
amp.png

*/

import { Link } from 'react-router-dom'
import '../App.css'

//Image imports
import cameraBrownie from '../assets/kit-images/camera-brownie.png'
import cameraSlr from '../assets/kit-images/camera-slr.png'
import headphones from '../assets/kit-images/headphones.png'
import laptop from '../assets/kit-images/laptop.png'
import midiController from '../assets/kit-images/midi-controller.png'
import tapeRecorder from '../assets/kit-images/tape-recorder.png'
import amp from '../assets/kit-images/amp.png'

const floatingKit = [
  { src: tapeRecorder, className: 'kit kit-audio' },
  { src: laptop, className: 'kit kit-web' },
  { src: cameraBrownie, className: 'kit kit-photo' },
]

const services = [
  {
    to: '/audio',
    title: 'audio',
    copy: 'warm sounds, organic production, character and texture.',
  },
  {
    to: '/web-design',
    title: 'web design',
    copy: 'beautifully simple and tactile webpages.',
  },
  {
    to: '/photo',
    title: 'photo',
    copy: 'haze, grain, and soft light for telling stories.',
  },
]

export default function HomePage() {
  return (
    <main className="site">
      <div className="floating-kit">
        {floatingKit.map((img) => (
          <img key={img.src} src={img.src} alt="" className={img.className} />
        ))}
      </div>
      <section className="hero">
        <p className="eyebrow">analogue gone digital</p>
        <h1>
          <Link className="title-link" to="/audio">
            audio
          </Link>
          {' | '}
          <Link className="title-link" to="/web-design">
            web design
          </Link>
          {' | '}
          <Link className="title-link" to="/photo">
            photo
          </Link>
        </h1>
        <p className="lead">
          analogue gone digital is a creative services and website management company based
          in leith, specialising in creating a distinctly analogue feel.
        </p>
        <p className="lead">
          embracing warmth and warble in audio, movement and organic interactions on websites, and haze and grain in photography is all part of the ethos while moving
          into an increasingly digital world.
        </p>
        <p className="lead lead-close">
          these are digital services made for analogue humans.
        </p>
        <div className="cta-row">
          <Link className="button" to="/#contact">
            get in touch
          </Link>
        </div>
      </section>

      <section id="services" className="services">
        {services.map((service) => (
          <Link
            key={service.to}
            to={service.to}
            className="service-card"
          >
            {service.to === '/audio' && (
              <img src={headphones} alt="" className="card-image" />
            )}

            {service.to === '/web-design' && (
              <img src={laptop} alt="" className="card-image" />
            )}

            {service.to === '/photo' && (
              <img src={cameraSlr} alt="" className="card-image" />
            )}

            <h2>{service.title}</h2>

            <p>{service.copy}</p>

            <span className="card-cta">learn more →</span>
          </Link>
        ))}
      </section>

      <section id="contact" className="contact">
        <h2>let&apos;s create something together</h2>
        <p>
          Email{' '}
          <a href="mailto:hello@analoguegonedigital.co.uk">hello@analoguegonedigital.co.uk</a> with a
          quick description of your project and timeline.
        </p>

      </section>
    </main>
  )
}
