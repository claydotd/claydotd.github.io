import { Link } from 'react-router-dom'
import './PhotoPage.css'
import canoe from '../assets/photo-portfolio/canoe.jpeg'
//import architecture from '../assets/photo-portfolio/architecture.jpeg'
import london from '../assets/photo-portfolio/london.jpeg'
import pittenweem from '../assets/photo-portfolio/pittenweem.jpeg'

const frames = [
  {
    ratio: 'landscape',
    caption: 'choosing the right film',
    text: 'deciding which type of film to use is essential for getting the right feel for your photos. I\'ll always use a selection of film with the right contrast, grainyness, colour response, and sharpness for your project.',
    image: london,
    layout: 'image-left',
  },
  {
    ratio: 'square',
    caption: 'mood & moment',
    text: 'whether you\'re looking for a more candid feel or a purposeful stare through the lens, timing is everything when it comes to film. setting the mood, reading the moment, then opening the shutter just at the right second makes for a great image.',
    image: pittenweem,
    layout: 'image-right',
  },
  {
    ratio: 'square',
    caption: 'developed and scanned',
    text: 'once we\'re finished shooting, I\'ll develop and scan your film, do some light editing to fix any brightness issues and cropping, then deliver high quality digital files and give you the roll of film.',
    image: canoe,
    layout: 'image-left',
  },
]

export default function PhotoPage() {
  return (
    <main className="photo-page">
      <nav className="photo-nav">
        <Link className="photo-back" to="/">← home</Link>
        <span className="photo-roll">roll 01 / 03</span>
      </nav>
      <header className="photo-hero">
        <h1 className="photo-title">photo</h1>
        <p className="photo-eyebrow">haze & grain</p>
        {/** new text added here */}
        <div className="photo-intro">
          <p>
            band pictures, portraits, outings, events, and weddings.
            I'm looking to expand my portfolio, so I'm charging budget-friendly
            rates.
          </p>

          <p className="rates">
            £25 per hour <span>+ film & development at cost</span>
          </p>
        </div>
        <blockquote className="photo-quote">
        <strong>digital</strong> and <strong>analogue</strong> photography. I shoot digitally or on film with a canon AE-1, pentax K-1000, yashica mat TLR, and kodak hawkeye brownie.
        </blockquote>
      </header>
      <section className="photo-strip reveal-stagger" aria-label="Services">
        {frames.map((frame) => (
          <article 
              key={frame.caption}
              className={`
                photo-frame
                photo-frame--${frame.ratio}
                photo-frame--${frame.layout}
              `}
          >
            <img
              className="photo-frame-image"
              src={frame.image}
              alt={frame.caption}
            />
            <div className="photo-frame-caption">
              <h2>{frame.caption}</h2>
              <p>{frame.text}</p>
            </div>
          </article>
        ))}
      </section>
      <footer className="photo-footer">
        <p className="photo-process">film feel · natural light · capturing a moment</p>
        <Link className="photo-cta" to="/#contact">get in touch</Link>
      </footer>
    </main>
  )
}