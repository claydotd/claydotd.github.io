import { Link } from 'react-router-dom'
import './WebDesignPage.css'
import JossSite from '../assets/web-portfolio/joss-site.gif'
import BeanData from '../assets/web-portfolio/beandata.gif'
import WeatherMusic from '../assets/web-portfolio/weathermusic.gif'
import AnitaSite from '../assets/web-portfolio/anita-site.gif'
import AnitaSite2 from '../assets/web-portfolio/anita-site2.gif'
import Digillama1 from '../assets/web-portfolio/digillama1.png'
import Digillama2 from '../assets/web-portfolio/digillama2.png'

const modules = [
  {
    span: 'wide',
    label: '01',
    title: 'planning pages',
    text: 'design is always the first step. I\'ll work with you to create a plan for your website including colours, fonts, look & feel, and content structure.',
  },
  {
    span: 'tall',
    label: '02',
    title: 'ongoing management',
    text: 'I can manage updates, hosting coordination, and small improvements so your site stays current without you becoming a part-time web person.',
  },
  {
    span: 'standard',
    label: '03',
    title: 'performance & care',
    text: 'creating something that\'s nice to use across all devices and browsers is the goal. I\'ll make sure your site is accessible and easy to maintain.',
  },
  {
    span: 'standard',
    label: '04',
    title: 'content & structure',
    text: 'let your users or customers know what you\'re all about. the combination of look & feel, and the information on the site is key to getting the message across.',
  },
]

export default function WebDesignPage() {
  return (
    <main className="web-page">
      <div className="web-top">
        <Link className="web-back" to="/">
          ← home
        </Link>
        <p className="web-tag">tactile & simple</p>
      </div>

      <header className="web-hero">
        <h1 className="web-title">
          web
          <br />
          design
        </h1>
        <div className="web-lead">
          <p>truly personalised websites built to express a <strong>feeling</strong> and a <strong>story</strong>.
          no more templates and generic designs.</p>
          <p className="rates">
            £15 per hour <span>+ hosting fees</span>
        </p>
        </div>
      </header>

      <section className="web-grid reveal-stagger" aria-label="Services">
        {modules.map((mod) => (
          <article key={mod.label} className={`web-module web-module--${mod.span}`}>
            <span className="web-module-label">{mod.label}</span>
            <h2>{mod.title}</h2>
            <p>{mod.text}</p>
          </article>
        ))}
      </section>
      <section className='web-portfolio'>
        <h1>portfolio</h1>
        <article className='web-module'>
              <span className="web-module-label">react/typescript</span>
              <h2>digillama</h2>
              <p>an artist portfolio website that I'm working on. The artist can easily add new portfolio items and update the text and images directly through Github, but without any code.</p>
              <p>The design started with the simple concept <i>"morphing blobs like a lava lamp"</i>.</p>
              <Link className="web-cta" to="https://analoguegonedigital.co.uk/digillama" target='_blank'>visit the site →</Link>
              <div className='web-imgs'>
                <img className='web-img' src={Digillama1} />
                <img className='web-img' src={Digillama2} />
              </div>
              <div className='web-grid'>
              <div>
                <h3>How much did it cost?</h3>
                <p>Initial design & setup: £45</p>
                <p>Hosting setup: £5</p>
                <p>Total: <strong>£50</strong></p>
              </div>
              <div>
                <h3>Ongoing costs</h3>
                <p>Hosting: <strong>free</strong></p>
              </div>
              </div>
            </article>
        <article className='web-module'>
              <span className="web-module-label">react/typescript</span>
              <h2>anitabhadani.com</h2>
              <p>a writing/journalism portfolio website that I built and manage. it's built in a way that allows anita to easily edit the text and portfolio examples through github.</p>
              <Link className="web-cta" to="https://anitabhadani.com" target='_blank'>visit the site →</Link>
              <div className='web-imgs'>
                <img className='web-img' src={AnitaSite} />
                <img className='web-img' src={AnitaSite2} />
              </div>
              <div className='web-grid'>
              <div>
                <h3>How much did it cost?</h3>
                <p>Initial design & setup: £30</p>
                <p>Additional updates & requests: £15</p>
                <p>Hosting & domain setup: £15</p>
                <p>Total: <strong>£60</strong></p>
              </div>
              <div>
                <h3>Ongoing costs</h3>
                <p>Hosting: <strong>free</strong></p>
                <p>Domain name: £12 per year</p>
              </div>
              </div>
            </article>
          <article className='web-module'>
              <span className="web-module-label">react/typescript</span>
              <h2>my portfolio</h2>
              <p>this is my front-end development portfolio. I built this whole website as a react app, containing pages for other react apps that I've made.</p>
              <Link className="web-cta" to="https://claydotd.netlify.app" target='_blank'>visit the site →</Link>
              <div className='web-imgs'>
                <img className='web-img' src={BeanData} />
                <img className='web-img' src={WeatherMusic} />
              </div>
            </article>
          <article className='web-module'>
            <span className="web-module-label">shopify liquid</span>
            <h2>joss designs</h2>
            <p>I'm currently managing this site and building new page components using liquid code.</p>
            <Link className="web-cta" to="https://jossdesigns.com" target='_blank'>visit the site →</Link>
            <div className='web-imgs'>
              <img className='web-img' src={JossSite} />
            </div>
          </article>
      </section>
      <aside className="web-aside">
        <p>
          I can build a website from scratch and coordinate hosting and updates, or I can build custom components for shopify websites.
          whatever you need, I'm here to help make it happen.
        </p>
        <Link className="web-cta" to="/#contact">
          get in touch →
        </Link>
      </aside>
    </main>
  )
}
