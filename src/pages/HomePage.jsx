/* 
TO DO:
1. Images of each service
2. Hover effect for images
3. contact form?

*/

import { Link } from 'react-router-dom'
import '../App.css'

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
          <article key={service.to} className="service-card">
            <h2>
              <Link className="card-link" to={service.to}>
                {service.title}
              </Link>
            </h2>
            <p>{service.copy}</p>
            <Link className="card-cta" to={service.to}>
              learn more →
            </Link>
          </article>
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
