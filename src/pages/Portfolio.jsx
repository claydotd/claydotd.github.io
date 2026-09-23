import { Link } from 'react-router-dom'
import AudioPlayer from './AudioPlayer'
import './Portfolio.css'

import digillama2 from '../assets/web-portfolio/digillama2.png'
import anitaSite2 from '../assets/web-portfolio/anita-site2.gif'
import beanData from '../assets/web-portfolio/beandata.gif'
import weatherMusic from '../assets/web-portfolio/weathermusic.gif'
import cleslieAuthor from '../assets/web-portfolio/cmleslie.png'
import groundedPresence from '../assets/web-portfolio/groundedpresence.png'

import canoe from '../assets/photo-portfolio/canoe.jpeg'
import london from '../assets/photo-portfolio/london.jpeg'
import pittenweem from '../assets/photo-portfolio/pittenweem.jpeg'
import architecture from '../assets/photo-portfolio/architecture.jpeg'
import golden1 from '../assets/photo-portfolio/golden1.jpg'
import golden2 from '../assets/photo-portfolio/golden2.jpg'
import party from '../assets/photo-portfolio/party.jpeg'

const sections = [
  { id: 'web', label: 'web' },
  { id: 'audio', label: 'audio' },
  { id: 'photo', label: 'photo' },
]

// set `live: false` on a site that isn't published yet
const webProjects = [
  {
    title: 'c+c artworks',
    stack: 'react / typescript / github pages',
    blurb:
      'an artist portfolio built around one idea: morphing blobs, like a lava lamp. new pieces go up through github without touching any code.',
    url: 'https://analoguegonedigital.co.uk/digillama/',
    live: true,
    shots: [digillama2],
  },
  {
    title: 'Grounded Presence',
    stack: 'react / typescript ',
    blurb: 'a portfolio site for a photographer. for this one, I recreated (and upgraded) a design that they had on Webflow. Claire is able to easily add photo collections by uploading folders, and edit/add pages by editing markdown files.',
    url: 'https://groundedpresence.online',
    live: true,
    shots: [groundedPresence],
  },
  {
    title: 'c. m. leslie, author',
    stack: 'react / typescript / github pages',
    blurb: 'an author website for a writing portfolio, blog, and bio. they add blog posts and can edit page content using markdown straight from github.',
    url: 'https://analoguegonedigital.co.uk/cleslieauthor/',
    live: true,
    shots: [cleslieAuthor],
  },
  {
    title: 'anitabhadani.com',
    stack: 'react / typescript / github pages',
    blurb:
      'a writing and journalism portfolio. anita adds her own examples and edits pages using markdown straight from github.',
    url: 'https://anitabhadani.com',
    live: true,
    shots: [anitaSite2],
  },
  {
    title: "clay's portfolio",
    stack: 'react / javascript / netlify',
    blurb:
      'my front-end playground: a react app full of other react apps, updated whenever I have a new idea for something bite sized to build.',
    url: 'https://claydotd.netlify.app/',
    live: true,
    shots: [beanData, weatherMusic],
  },
]

const podcasts = [
  {
    title: 'picture book summit',
    detail: 'editing for weekly podcast episodes. sometimes multitrack, usually single zoom call recordings.',
    episodes: '100-current',
    url: 'https://picturebooksummit.libsyn.com',
  },
  {
    title: '12x12 project',
    detail: 'editing for weekly podcast episodes. usually single zoom call recordings.',
    episodes: '24-current',
    url: 'https://sites.libsyn.com/603895',
  },
  {
    title: 'picture book submissions',
    detail: 'editing for weekly podcast episodes. usually single zoom call recordings.',
    episodes: '1-current',
    url: 'https://picturebooksubmissions.com/podcast/',
  },
]

const photos = [
  { src: london, alt: 'Street scene shot on film in London' },
  { src: pittenweem, alt: 'Harbour at Pittenweem, Fife' },
  { src: canoe, alt: 'Canoe on still water' },
  { src: architecture, alt: 'Architecture in Edinburgh' },
  { src: golden1, alt: 'Golden hour in the countryside' },
  { src: golden2, alt: 'Golden hour in the countryside' },
  { src: party, alt: 'Party on film' },
]

function WebCard({ project }) {
  return (
    <article className="folio-card">
      <div className="folio-shots">
        {project.shots.length > 0 ? (
          project.shots.map((shot) => (
            <img key={shot} className="folio-shot" src={shot} alt={`${project.title} website`} />
          ))
        ) : (
          <div className="folio-shot folio-shot--empty" aria-hidden="true" />
        )}
      </div>
      <div className="folio-card-body">
        <span className="folio-stack">{project.stack}</span>
        <h3 className="folio-card-title">{project.title}</h3>
        <p>{project.blurb}</p>
        {project.live ? (
          <a className="folio-link" href={project.url} target="_blank" rel="noreferrer">
            visit the site →
          </a>
        ) : (
          <span className="folio-soon">coming soon</span>
        )}
      </div>
    </article>
  )
}

export default function Portfolio() {
  return (
    <main className="folio-page">
      <header className="folio-hero">
        <h1 className="folio-title">portfolio</h1>
        <nav className="folio-jump" aria-label="Portfolio sections">
          {sections.map((section) => (
            <a key={section.id} className="folio-jump-link" href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>
        <p className="folio-lead">
          this is some of the work I've done for others (and in some cases, for myself). have a look through and if something inspires you, <Link to="/contact">drop me a message</Link>.
        </p>

      </header>

      <section id="web" className="folio-section" aria-labelledby="web-heading">
        <div className="folio-section-head">
          <h2 id="web-heading">web</h2>
          <Link className="folio-section-link" to="/web-design">
            how it works →
          </Link>
        </div>
        <div className="folio-cards reveal-stagger">
          {webProjects.map((project) => (
            <WebCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section id="audio" className="audio-section" aria-labelledby="audio-heading">
        <div className="folio-section-head">
          <h2 id="audio-heading">audio</h2>
          <Link className="folio-section-link" to="/audio">
            how it works →
          </Link>
        </div>
        <div className="audio-section-content">
          <div className="audio-section-content-left">
        <h3 className="folio-subheading">music</h3>
        <AudioPlayer />
        </div>
        <div className="audio-section-content-right">
        <h3 className="folio-subheading">podcasts</h3>
        <ul className="folio-list" role="list">
          {podcasts.map((podcast) => (
            <li key={podcast.title}>
              <a className="folio-list-item" href={podcast.url} target="_blank" rel="noreferrer">
                <span className="folio-list-title">{podcast.title}</span>
                <span className="folio-list-episodes">episodes: {podcast.episodes}</span>
                <span className="folio-list-detail">{podcast.detail}</span>
                <span className="folio-list-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        </div>
        </div>
      </section>

      <section id="photo" className="folio-section" aria-labelledby="photo-heading">
        <div className="folio-section-head">
          <h2 id="photo-heading">photo</h2>
          <Link className="folio-section-link" to="/photo">
            how it works →
          </Link>
        </div>
        <div className="folio-gallery">
          {photos.map((photo) => (
            <img key={photo.src} className="folio-photo" src={photo.src} alt={photo.alt} />
          ))}
        </div>
      </section>

      <footer className="folio-footer">
        <p>got something you want made? let&apos;s make it happen.</p>
        <Link className="button button-solid" to="/contact">
          get in touch
        </Link>
      </footer>
    </main>
  )
}
