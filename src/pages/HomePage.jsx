import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FeaturedBubbles from '../components/FeaturedBubbles'
import '../App.css'
import './HomePage.css'

import cameraSlr from '../assets/kit-images/camera-slr.webp'
import headphones from '../assets/kit-images/headphones.webp'
import laptop from '../assets/kit-images/laptop.webp'
import efc1 from '../assets/web-portfolio/efc1.webp'
import elainaFielding from '../assets/web-portfolio/elainafielding.webp'
import weatherMusic from '../assets/web-portfolio/weathermusic.png'

const phrases = [
  'record your album',
  'launch your podcast',
  'showcase your art',
  'start your blog',
  'share your writing',
]

const services = [
  {
    to: '/portfolio#audio',
    title: 'audio',
    copy: 'music, podcasts, soundscapes, and more. recording, mixing, mastering, and podcast editing.',
  },
  {
    to: '/portfolio#web',
    title: 'web design',
    copy: 'no cookies, no tracking, no ads. just websites to show off who you are and what you do.',
  },
  {
    to: '/portfolio#photo',
    title: 'photo',
    copy: 'band pictures, portraits, outings, events, and weddings across scotland.',
  },
]

const featuredProjects = [
  {
    title: 'Edinburgh Folk Club',
    blurb:
      'event listings, members area, photo gallery, and a CMS so admins can update gigs and news without touching code.',
    url: 'https://efc1973.com',
    image: efc1,
  },
  {
    title: 'Elaina Fielding',
    blurb:
      'a clean sculpture portfolio with a custom CMS so new works can be added and edited independently.',
    url: 'https://elainafielding.co.uk',
    image: elainaFielding,
  },
  {
    title: 'Weather Music',
    blurb:
      'a synth that turns an 8-day weather forecast into a melody, with programmable drum and bass sequencers.',
    url: 'https://claydotd.netlify.app/weather-music',
    image: weatherMusic,
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
          <span className="emphasis">no hosting fees</span>.
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

      <section className="pwyc" aria-labelledby="pwyc-heading">
        <h2 id="pwyc-heading">why <span className="emphasis"><em>pay what you can</em></span>?</h2>
        <p className="pwyc-intro">
          website builders are easy until you have a creative idea for how you want it to look. and then the monthly fees and ads show up. :(
        </p>
        <p className="main-text">
          my goal is to help make the internet a better place. I know that bespoke websites can be expensive, and I want to help make
          them more accessible to more people. the more websites I can build from scratch for people, the less the internet gets clogged
          up with unnecessary tracking, third-party cookies, ads and clunky bloated code.
          </p>
          <p className="main-text">
          no matter what your budget is, I want to help build you a website that you're proud of owning.
        </p>
        <h2><em>how does PWYC work?</em></h2>
        <p className="main-text">
          Pay What You Can means you pay what makes sense for you. once we've started working on your project, it's up to you
          to pay me what you can, when you can. if you can't afford to much, don't worry! I just ask that you support me by
          spreading the word and helping me continue to build websites for people. the more projects that come my way, the more
          the PWYC model becomes sustainable for me as a business.
        </p>
        <p className="main-text">
        if you're not sure how much makes sense to pay, just ask! I will always be honest about how much time I've spent working on a project,
        so you can make a decision based on an hourly rate. 
        </p>
      </section>

      <section id="services" className="services reveal-stagger">
        {services.map((service) => (
          <Link
            key={service.to}
            to={service.to}
            className="service-card"
          >
            {service.to === '/portfolio#audio' && (
              <img src={headphones} alt="Audio production in Leith, Scotland" className="card-image" />
            )}

            {service.to === '/portfolio#web' && (
              <img src={laptop} alt="Websites made in Scotland" className="card-image" />
            )}

            {service.to === '/portfolio#photo' && (
              <img src={cameraSlr} alt="Photography in Edinburgh, Scotland" className="card-image" />
            )}

            <h2>{service.title}</h2>

            <p>{service.copy}</p>

            <span className="card-cta">learn more →</span>
          </Link>
        ))}
      </section>
      <section className="featured-projects" aria-labelledby="featured-heading">
        <div className="featured-head">
          <h2 id="featured-heading">featured projects</h2>
          <Link className="featured-all" to="/portfolio#web">
            see the full portfolio →
          </Link>
        </div>
        <FeaturedBubbles projects={featuredProjects} />
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
