import '../App.css'
import './About.css'
import { Link } from 'react-router-dom'
import aboutImage from '../assets/about/about-image.png'
import bottomImage from '../assets/about/bottom-image.png'

export default function About() {
  return (
    <main className="about-page">
      <header className="about-hero">
        <div className="about-hero-text">
          <h1 className="about-title">about</h1>
          <h2 className="name">clay leslie</h2>
        </div>
        <div className="about-hero-image">
          <img src={aboutImage} alt="Clay Leslie" />
        </div>
      </header>
      <section className="about-content">
        <div className="about-text">
          <p>I'm a website developer, audio producer, and photographer based in Leith. I've been working with all sorts of creatives since I was at uni, and I moved to Edinburgh for the unique and thriving arts and culture scene.</p>
          <h2>where I started</h2>
          <p>I studied Music and Computer Science at the University of Victoria, in Canada from 2014-2020. I took an extra couple of years to finish my undergrad mostly because I was having such a good time with student life.</p>
          <p>I volunteered and hosted a show at 101.9 CFUV (Victoria's campus and community radio station), helped organise gigs and open mic nights with the Live Music Club, played in a couple local bands, and got involved in many creative projects.{' '}
            Through all of that, I learned and practiced many skills from graphic design to project manangement and even some product development.
          </p>
          <p>In my actual coursework, I learned about software development, UI/UX design, audio production, and how to use technology creatively.{' '}
            For my coursework, I focused a lot on creating interfaces for musicians to create music with, some you could classify as instruments, others were a lot less... musical. Either way, it got me practicing lots of front-end development with JavaScript.{' '}
            This was a great foundation for starting my career, and led me into the realm of edtech and coding education.
          </p>
          <h2>where I'm at now</h2>
          <p>After working for 6 years in the edtech industry, I got tired of working within the corporate model, where speed and profitability were prioritised over quality and user experience.{' '}
            This led me to start my own business, where I can build products that I'm proud and that clients are proud of too.</p>
            <p>Rather than balancing the ideas of many investors and stakeholders, I can stay true to the original vision and goals of a project. If you have a creative idea, <em>let's make it happen</em>.</p>
        </div>
        <div className="about-image-container">
          <img src={aboutImage} alt="About" className="about-image" />
        </div>
      </section>
      <div className="about-cta">
        <Link to="/contact" className="button button-solid">get in touch</Link>
      </div>
      <div className="bottom-image">
        <img src={bottomImage} alt="About" className="about-image" />
      </div>
    </main>
  );
}