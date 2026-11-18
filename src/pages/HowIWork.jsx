import './HowIWork.css';

const steps = [
  {
    title: 'get in touch.',
    body: 'every project starts with an enquiry. the more details you can give me early on, the better I can plan and manage my workload.',
  },
  {
    title: 'meet with me.',
    body: "we can meet in person or over a video call to discuss your project in more detail. this is a great opportunity to make sure we're on the same page before starting the work. I'll ask for any info that I need to get started, and you can ask me any questions you have about the process.",
  },
  {
    title: 'doing the work.',
    body: "once I have everything I need, I'll start working. I'll keep you updated as I go, and send you any drafts/prototypes once they're ready. this way, you can give feedback during the process and add any extra ideas or thoughts that you have along the way.",
  },
  {
    title: 'handing over the keys.',
    body: "once the project is complete, if it's a website, I'll give you everything you need to take ownership and independently manage the site content. if it's an audio or photo project, I'll send you the files digitally. I'll retain a backup, just in case you need me to send it to you again in the future.",
  },
];

export default function HowIWork() {
  return (
    <main className="how-page">
      <header className="how-intro">
        <h1>how I work</h1>
        <p className="how-lead">
          I like to work directly with people to make sure that they're happy with the final product.
          Every project is different, so I like to create a plan together that works for both of us.
        </p>
      </header>

      <section className="process" aria-label="project process">
        <ol className="process-list">
          {steps.map((step, index) => (
            <li key={step.title} className="process-step">
              <p className="process-step-label">step {index + 1}</p>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="process-afterwards">
          <h2>
            <em>afterwards</em>
          </h2>
          <p>
            for website projects, I'm always happy to make future changes that you need me to make. I like to
            build things in a way that allows you to make changes yourself, without having to rely on me. for
            any bigger changes, I'll let you know how much time it will likely take and you can pay what you
            can, just like the initial project.
          </p>
        </div>
      </section>

      <section className="how-pwyc" aria-labelledby="pwyc-heading">
        <h2 id="pwyc-heading">
          why <span className="emphasis">
            <em>pay what you can</em>
          </span>
          ?
        </h2>
        <p className="how-pwyc-intro">
          website builders are easy until you have a creative idea for how you want it to look. and then the
          monthly fees and ads show up. :(
        </p>
        <p>
          my goal is to help make the internet a better place. I know that bespoke websites can be expensive,
          and I want to help make them more accessible to more people. the more websites I can build from
          scratch for people, the less the internet gets clogged up with unnecessary tracking, third-party
          cookies, ads and clunky bloated code.
        </p>
        <p>
          no matter what your budget is, I want to help build you a website that you're proud of owning.
        </p>
        <h2>
          <em>how does PWYC work?</em>
        </h2>
        <p>
          Pay What You Can means you pay what makes sense for you. once we've started working on your project,
          it's up to you to pay me what you can, when you can. if you can't afford too much, don't worry! I just
          ask that you support me by spreading the word and helping me continue to build websites for people.
          the more projects that come my way, the more the PWYC model becomes sustainable for me as a business.
        </p>
        <p>
          if you're not sure how much makes sense to pay, just ask! I will always be honest about how much time
          I've spent working on a project, so you can make a decision based on an hourly rate.
        </p>
      </section>
    </main>
  );
}
