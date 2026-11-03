import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import './HomePage.css'

import cameraSlr from '../assets/kit-images/camera-slr.webp'
import headphones from '../assets/kit-images/headphones.webp'
import laptop from '../assets/kit-images/laptop.webp'

const phrases = [
  'record your album',
  'launch your podcast',
  'showcase your art',
  'start your blog',
  'share your writing',
]

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
    copy: 'band pictures, portraits, outings, events, and weddings across scotland.',
  },
]

const comparisons = [
  {
    feature: 'hosting fees',
    builders: 'monthly subscription',
    analogue: 'none',
  },
  {
    feature: 'cookies & tracking',
    builders: 'yes',
    analogue: 'none',
  },
  {
    feature: 'ads',
    builders: 'upsells to get rid of ads',
    analogue: 'none',
  },
  {
    feature: 'design',
    builders: 'stuck with templates',
    analogue: 'made with you',
  },
  {
    feature: 'typical cost',
    builders: '£8–40 / month, forever',
    analogue: 'pay what you can afford',
  },
  {
    feature: 'audio, photo & web',
    builders: 'website only',
    analogue: 'all three',
  },
]

function RotatingPhrases() {
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)

    media.addEventListener('change', sync)

    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduceMotion) return undefined

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length)
    }, 1400)

    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <section className="rotator" aria-label="What we can help you make">
      {reduceMotion ? (
        <p className="rotator-static">{phrases.join(' · ')}</p>
      ) : (
        <>
          <p className="rotator-stage" aria-hidden="true">
            {phrases.map((phrase, phraseIndex) => (
              <span
                key={phrase}
                className={phraseIndex === index ? 'is-active' : undefined}
              >
                {phrase}
              </span>
            ))}
          </p>
          <span className="visually-hidden">{phrases.join(', ')}</span>
        </>
      )}
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="site">
      <section className="hero home-hero">
        {/* <p className="eyebrow">analogue gone digital</p> */}
        <h1>
          you could have a website like <em>this</em> with{' '}
          <span className="hero-no">no hosting fees</span>.
        </h1>
        <p className="lead">
        analogue gone digital is <Link className="link-underline" to="/about"><em>clay leslie</em></Link>'s website development, audio production, and photography service, based in leith, helping people create a complete and unique digital presence at a cost they can afford.
        </p>
        <p className="lead lead-close">
          analogue gone digital is aimed at giving musicians, artists, writers, and other creatives a one-stop-shop
          for everything they need to showcase their work online.<br /><strong><em>let's make it happen</em></strong>.
        </p>
        <div className="cta-row">
          <Link className="button button-solid" to="/contact">
            get in touch
          </Link>
          <Link className="button" to="/portfolio">
            check out the portfolio
          </Link>
        </div>
      </section>

      <RotatingPhrases />

      <section className="compare" aria-labelledby="compare-heading">
        <h2 id="compare-heading">why get <em>analogue gone digital</em> to do it?</h2>
        <p className="compare-intro">
          diy website builders are easy until you have a creative idea for how you want it to look. and then the monthly fees and ads show up. :(
        </p>
        <div className="compare-wrap">
          <table className="compare-table">
            <caption className="visually-hidden">
              Comparison of template website builders, traditional agencies, and analogue gone digital
            </caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">feature</span>
                </th>
                <th scope="col">template builders</th>
                <th scope="col">analogue gone digital</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td>{row.builders}</td>
                  <td>{row.analogue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="compare-note">
          say <strong>no</strong> to cookies, tracking, and ads on your website and help make the internet a better place. don't let your website be ruined by big tech companies harvesting data.
        </p>
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
              <img src={laptop} alt="Websites made in Scotland" className="card-image" />
            )}

            {service.to === '/photo' && (
              <img src={cameraSlr} alt="Film photography in Edinburgh, Scotland" className="card-image" />
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
          Fill in the <Link className="link-underline" to="/contact">enquiry form</Link> with a quick description of your project and timeline, or email <a className="link-underline" href="mailto:hello@analoguegonedigital.co.uk">hello@analoguegonedigital.co.uk</a> directly.
        </p>
      </section>
    </main>
  )
}
