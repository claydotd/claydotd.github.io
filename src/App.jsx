import './App.css'

function App() {
  return (
    <main className="site">
      <section className="hero">
        <p className="eyebrow">analogue gone digital</p>
        <h1>audio | web design | photo</h1>
        <p className="lead">
          analogue gone digital is a creative services and website management company based
          in leith, specialising in creating a distinctly analogue feel.
        </p>
        <p className="lead">
          embracing warmth and warble in audio, distinctly tactile and beautifully simple
          websites, and haze and grain in photography is all part of the ethos while moving
          into an increasingly digital world.
        </p>
        <p className="lead lead-close">
          these are digital services made for analogue humans.
        </p>
        <div className="cta-row">
          <a className="button" href="#services">
            explore services
          </a>
          <a className="button" href="#contact">
            start a project
          </a>
        </div>
      </section>

      <section id="services" className="services">
        <article className="service-card">
          <h2>audio</h2>
          <p>warm production, editing, and mixing shaped by character and texture.</p>
        </article>
        <article className="service-card">
          <h2>web design</h2>
          <p>beautifully simple websites with tactile rhythm and thoughtful pacing.</p>
        </article>
        <article className="service-card">
          <h2>photo</h2>
          <p>haze, grain, and soft light crafted for brands and stories with soul.</p>
        </article>
      </section>

      <section id="contact" className="contact">
        <h2>let&apos;s build your next project</h2>
        <p>
          Email{' '}
          <a href="mailto:hello@analoguegonedigital.co.uk">hello@analoguegonedigital.co.uk</a> with a quick
          description of your project and timeline.
        </p>
      </section>
    </main>
  )
}

export default App
