/* 
TO DO:
1. pictures of equipment scattered around the page at the sides, not getting in the way of content.: tape recorder, amp, AKAI, headphones

images are contained at ../assets/kit-images
headphones.png
midi-controller.png
tape-recorder.png
amp.png

*/
import { Link } from 'react-router-dom'
import AudioPlayer from './AudioPlayer'
import './AudioPage.css'

const tracks = [
  {
    id: '01',
    title: 'pre-production',
    detail:
      "good planning is the key to getting the sound you're looking for. we'll chat through what feel you're chasing and plan how to create it.",
  },
  {
    id: '02',
    title: 'recording',
    detail:
      "picking the right place and approach for tracking can help chase that feeling. whether it's in a studio, a bedroom, or miner's club, I love to record in a location that feels right.",
  },
  {
    id: '03',
    title: 'editing',
    detail:
      "I don't believe in over-refining tracks. it's important to preserve elements in audio that make tracks feel natural and human. I approach editing through the lens of cleaning things up while maintaining everything that makes it feel real.",
  },
  {
    id: '04',
    title: 'mixing & mastering',
    detail:
      "starting from the focal point of a track and building the atmosphere to support it is how I approach mixing.",
  },
]

export default function AudioPage() {
  return (
    <main className="audio-page">
      <Link className="audio-back" to="/">
        ← home
      </Link>

      <header className="audio-hero">
        <p className="audio-eyebrow">holistic audio production. digital audio that feels human.</p>
        <h1 className="audio-title">audio</h1>
        <p className="audio-lead">
          I produce music, edit podcasts, and would love to take on any audio production/editing work you have for me.
        </p>
        <p className="rates">
            £20 per hour <span>+ room hire costs</span>
          </p>
        <a className="jump-to-portfolio" href="#portfolio">
          jump to portfolio ↓
        </a>
      </header>

      <div className="audio-content">
        <section className="audio-tracks" aria-label="Services">
          {tracks.map((track) => (
            <article key={track.id} className="audio-track">
              <span className="audio-track-id">{track.id}</span>
              <div className="audio-track-body">
                <h2>{track.title}</h2>
                <p>{track.detail}</p>
              </div>
            </article>
          ))}
        </section>

        <section id="portfolio" className="audio-portfolio">
          <h2>Podcast Portfolio</h2>
            <Link className="audio-cta" to="https://picturebooksummit.libsyn.com">Picture Book Summit Podcast</Link>
            <Link className="audio-cta" to="https://sites.libsyn.com/603895">12X12 Project Podcast</Link>
            <br /><br />
          <h2>Music Portfolio</h2>
          <AudioPlayer />
        </section>
      </div>

      <footer className="audio-footer">
        <p className="audio-note">songs, albums, podcasts, soundscapes.</p>
        <Link className="audio-cta" to="/#contact">
          get in touch
        </Link>
      </footer>
    </main>
  )
}