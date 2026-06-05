/* 
TO DO:
1. pictures of equipment: tape recorder, amp, AKAI, headphones
2. audio player: ballad of A&C, bleu groove, blue, something new and synthy, something new and acoustic

*/

import { Link } from 'react-router-dom'
import './AudioPage.css'

const tracks = [
  {
    id: '01',
    title: 'pre-production',
    detail:
      'good planning is the key to getting the sound you\'re looking for. we\'ll chat through what feel you\'re chasing and plan how to create it.',
  },
  {
    id: '02',
    title: 'recording',
    detail:
      'picking the right place and approach for tracking can help chase that feeling. whether it\'s in a studio, a bedroom, or miner\'s club, I love to record in a location that feels right.',
  },
  {
    id: '03',
    title: 'editing',
    detail:
      'I don\'t believe in over-refining tracks. it\'s important to preserve elements in audio that make tracks feel natural and human. I approach editing through the lens of cleaning things up while maintaining everything that makes it feel real.',
  },
  {
    id: '04',
    title: 'mixing & mastering',
    detail:
    'starting from the focal point of a track and building the atmosphere to support it is how I apporach mixing.'
  }
]

export default function AudioPage() {
  return (
    <main className="audio-page">
      <Link className="audio-back" to="/">
        ← home
      </Link>

      <header className="audio-hero">
        <p className="audio-eyebrow">warmth & warble</p>
        <h1 className="audio-title">audio</h1>
        <p className="audio-lead">
          holistic audio production. digital audio that feels human.
        </p>
      </header>

      <div className="audio-console" aria-hidden="true">
        {/*Audio player for portfolio tracks goes here*/}
      </div>

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

      <footer className="audio-footer">
        <p className="audio-note">songs, albums, podcasts, soundscapes.</p>
        <Link className="audio-cta" to="/#contact">
          get in touch
        </Link>
      </footer>
    </main>
  )
}
