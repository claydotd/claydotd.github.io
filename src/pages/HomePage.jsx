/* 
TO DO:
1. contact/inquiry form

*/

import { Link } from 'react-router-dom'
import '../App.css'

//Image imports
import cameraSlr from '../assets/kit-images/camera-slr.png'
import headphones from '../assets/kit-images/headphones.png'
import laptop from '../assets/kit-images/laptop.png'

const services = [
  {
    to: '/audio',
    title: 'audio',
    copy: 'music, podcasts, soundscapes, and more. recording, mixing, mastering, and podcast editing.',
  },
  {
    to: '/web-design',
    title: 'web design',
    copy: 'no cookies, no tracking, no ads. just websites to show off who you are and what you do.',
  },
  {
    to: '/photo',
    title: 'photo',
    copy: 'band pictures, portraits, outings, events, and weddings in edinburgh, scotland.',
  },
]

export default function HomePage() {
  return (
    <main className="site">
      <section className="hero">
        <p className="eyebrow">analogue gone digital</p>
        <h1>
          <Link className="title-link" to="/audio">
            audio
          </Link>
          {' | '}
          <Link className="title-link" to="/web-design">
            websites
          </Link>
          {' | '}
          <Link className="title-link" to="/photo">
            photo
          </Link>
        </h1>
        <p className="lead">
          analogue gone digital is <strong>clay leslie</strong>'s audio production, website development, and photography service, based
          in leith, edinburgh, helping people across scotland create a complete and unique digital presence at a price they can afford.
        </p>
        <p className="lead">
          embracing warmth and warble in audio, movement and organic interactions on websites, and haze and grain in photography is all part of translating the analogue into the digital while making it feel real.
        </p>
        <p className="lead">
          analogue gone digital is aimed at giving musicians, artists, and creatives a one-stop-shop for everything they need to showcase their work. 
        </p>
        <p className="lead lead-close">
          get in touch to find out more about how we can work together!
        </p>
        <div className="cta-row">
          <Link className="button" to="/#contact">
            get in touch
          </Link>
        </div>
      </section>

      <section id="services" className="services reveal-stagger">
        {services.map((service) => (
          <Link
            key={service.to}
            to={service.to}
            className="service-card"
          >
            {service.to === '/audio' && (
              <img src={headphones} alt="Audio production in Leith, Scotland" className="card-image" />
            )}

            {service.to === '/web-design' && (
              <img src={laptop} alt="Web design in Edinburgh and Scotland" className="card-image" />
            )}

            {service.to === '/photo' && (
              <img src={cameraSlr} alt="Film photography in Leith, Scotland" className="card-image" />
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
