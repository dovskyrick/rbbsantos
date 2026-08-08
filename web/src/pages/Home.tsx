import { useRef, useState } from 'react';
import './Home.css';

/* Scenario walkthrough videos. Labels are Ricardo's own numbering — the
   YouTube titles themselves have not been cross-checked. */
const SCENARIOS = [
  { id: 'x_21B58FHzg', label: 'Scenario 1' },
  { id: 'blCW6i9CYAE', label: 'Scenario 2' },
  { id: 'inyNI8Lz66k', label: 'Scenario 3' },
  { id: '4FveXdBdEG4', label: 'Scenario 4' },
  { id: 'QIdz9ci8aXY', label: 'Scenario 5' },
];

const ACADEMIC_PROJECTS = [
  {
    title: 'Real-time digital signal processing on a dsPIC33',
    course: 'Electronics · Instituto Superior Técnico',
    note: 'Team of three — with Joana Mariano and Susana Azevedo',
    desc: 'A complete real-time DSP chain built and validated on a Microchip dsPIC33CK64MC105: an ADC/DAC sample loop, a second-order Butterworth IIR bandpass derived from an analog prototype via the bilinear transform, an 11-tap FIR compared across rectangular and Hamming windows, and a digital amplitude detector driving a four-LED threshold display. Integrated with an infrared emitter and phototransistor front end for distance detection, with every stage verified on an oscilloscope against the theoretical prediction.',
    tools: ['C', 'MATLAB', 'dsPIC33CK64MC105', 'Oscilloscope / FFT'],
  },
  {
    title: 'Gravity-compensated fluid antenna',
    course: 'Antennas and Propagation · Instituto Superior Técnico',
    note: 'Team of two',
    desc: 'An antenna that keeps itself pointed. Two immiscible liquids inside the structure redistribute under buoyancy as it tilts, passively steering the main beam back toward vertical — no motors, no control loop. Modelled in CST Studio Suite, covering radiation-pattern behaviour across tilt angles and S11 return-loss analysis.',
    tools: ['CST Studio Suite'],
  },
  {
    title: 'Evolution of cooperation and adversarial behaviour',
    course: 'Network Science · Instituto Superior Técnico',
    desc: 'An agent-based simulation of evolutionary dynamics over graph structures, where cooperative and adversarial strategies spread and compete according to interaction outcomes and the topology connecting them, examining the conditions under which cooperation survives exploitation. This is evolutionary and social dynamics on networks, not telecommunications network engineering.',
    tools: ['Simulation', 'Graph theory'],
  },
  {
    title: 'Satellite visibility and GNSS positioning',
    course: 'Navigation Systems · Instituto Superior Técnico',
    desc: 'MATLAB implementations of the core geometry behind satellite tracking and GNSS: a visibility-window predictor on an ellipsoidal Earth model, ECEF↔ECI frame transformations, azimuth/elevation to Cartesian conversion, and receiver position solved from pseudorange measurements. Implemented from the underlying mathematics rather than called from a library.',
    tools: ['MATLAB'],
  },
];

const PERSONAL_PROJECTS = [
  {
    title: '2D platformer prototype',
    desc: 'A playable game prototype built in Unity, covering real-time rendering, the game loop, player input handling and interaction mechanics.',
    tools: ['Unity', 'C#'],
  },
  {
    title: 'Animation work',
    desc: 'Self-directed animation and motion design, published to a genuine audience and exceeding 2.9 million total views on YouTube.',
    tools: ['Animation', 'Motion design'],
  },
  {
    title: 'Mobile language lesson audio app',
    desc: 'A small mobile prototype created to explore structured audio-based language learning.',
    tools: ['Prototype'],
  },
];

const SKILLS = {
  'Aerospace and satellite operations': [
    'Satellite operations',
    'Orbital visualization',
    'Telemetry interpretation',
    'Attitude context',
    'Ground station visibility',
    'Uncertainty visualization',
    'Digital twin concepts',
  ],
  'Software': [
    'TypeScript',
    'React',
    'Grafana plugin development',
    'CesiumJS',
    'JavaScript',
    'Python',
    'MATLAB',
    'C',
    'Git',
  ],
  'Engineering and simulation': [
    'Simulink',
    'SolidWorks',
    'Altium',
    'Cadence',
    'CST',
    'LTSpice',
    'Xilinx',
  ],
  'Visualization and interface design': [
    '3D visualization',
    'Dashboard design',
    'Time-linked interaction',
    'Scenario-based evaluation',
    'Human–computer interaction',
    'User-centered design',
  ],
};

/* Click-to-load facade: the YouTube iframe is only mounted once the user
   asks for it, so five embeds cost nothing on first paint. */
function VideoCard({ id, label }: { id: string; label: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="video-card">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-facade"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${label}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="video-play" aria-hidden="true" />
          </button>
        )}
      </div>
      <figcaption className="video-caption">
        <span className="video-label">{label}</span>
        <a
          href={`https://youtu.be/${id}`}
          target="_blank"
          rel="noreferrer"
          className="video-link"
        >
          YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}

/* The strip is always wider than the section, so the dots are shown
   unconditionally — they are what tells a visitor it scrolls at all. */
function ScenarioStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const cardsOf = (el: HTMLDivElement) => Array.from(el.children) as HTMLElement[];

  const handleScroll = () => {
    const el = stripRef.current;
    if (!el) return;
    const stripLeft = el.getBoundingClientRect().left;
    let nearest = 0;
    let shortest = Infinity;
    cardsOf(el).forEach((card, i) => {
      const distance = Math.abs(card.getBoundingClientRect().left - stripLeft);
      if (distance < shortest) {
        shortest = distance;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const goTo = (i: number) => {
    const el = stripRef.current;
    if (!el) return;
    const cards = cardsOf(el);
    if (!cards[i]) return;
    el.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
  };

  return (
    <>
      <div className="video-strip" ref={stripRef} onScroll={handleScroll}>
        {SCENARIOS.map((s) => (
          <VideoCard key={s.id} id={s.id} label={s.label} />
        ))}
      </div>
      <div className="video-dots">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="video-dot"
            aria-label={`Go to ${s.label}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="home">

      {/* ─── NAV ─── */}
      <nav className="home-nav">
        <a href="#top" className="home-nav-name">Ricardo Santos</a>
        <ul className="home-nav-links">
          <li><a href="#project">Project</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* ─── HERO ─── */}
      <section className="home-section home-section--hero" id="top">
        <p className="section-label">Aerospace Engineering</p>
        <h1 className="hero-name">Ricardo Santos</h1>
        <p className="hero-tagline">
          Master's student focused on satellite operations software and visualization.
        </p>
        <p className="hero-body">
          I build tools that connect telemetry, orbital geometry, attitude context,
          uncertainty, and ground station visibility into clearer operational interfaces
          for satellite analysis.
        </p>
        <div className="hero-buttons">
          <a
            href="https://satellite-visualizer-demo.fly.dev"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            View satellite demo
          </a>
          <a href="/cv.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
            Download CV
          </a>
          <a
            href="https://github.com/dovskyrick"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
          <a href="mailto:ricardo.santos.engin@gmail.com" className="btn btn-outline">
            Contact
          </a>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── VISUAL PREVIEW ─── */}
      <section className="home-section" id="preview">
        <p className="section-label">Satellite visualization</p>
        <div className="preview-frame">
          <img
            src="/scenario3-anomalous-pass.png"
            alt="Screenshot of a satellite operations visualization dashboard combining Grafana time series with a Cesium spatial view."
            className="preview-img"
          />
        </div>
        <p className="preview-caption">
          Satellite operations dashboard prototype integrating Grafana time series
          with a Cesium-based spatial view.
        </p>
        <div className="preview-buttons">
          <a
            href="https://satellite-visualizer-demo.fly.dev"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Open live demo
          </a>
          <a
            href="https://github.com/dovskyrick/grafana-satellite-visualizer"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            View repository
          </a>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── SCENARIO WALKTHROUGHS ─── */}
      <section className="home-section" id="walkthroughs">
        <p className="section-label">Scenario walkthroughs</p>
        <h2 className="section-title">See the tool in use</h2>
        <p className="section-intro">
          Five recorded walkthroughs of the visualization tool. They introduce how the
          dashboard works and served as the exercise material for the scenario-based
          user study.
        </p>
        <ScenarioStrip />
      </section>

      <hr className="section-divider" />

      {/* ─── FEATURED PROJECT ─── */}
      <section className="home-section" id="project">
        <p className="section-label">Featured project</p>
        <h2 className="section-title">Satellite operations visualization dashboard</h2>
        <div className="project-card">
          <p className="project-card-title">Satellite operations visualization dashboard</p>
          <p className="project-card-desc">
            A thesis project exploring how satellite operators can interpret telemetry together
            with orbital position, attitude, ground station geometry, uncertainty, and observation
            status in a unified dashboard.
          </p>
          <ul className="project-features">
            <li>
              Visualizes satellite trajectories, observed and predicted segments,
              uncertainty ellipsoids, attitude, fields of view, and ground station context.
            </li>
            <li>Synchronizes time series inspection with a 3D spatial scene.</li>
            <li>Supports interpretation under sparse contact and partial observability.</li>
            <li>Built as a Grafana panel plugin using React, TypeScript, and Cesium.</li>
            <li>
              Evaluated through scenario-based tasks with engineering users and an ISTSat operator.
            </li>
          </ul>
          <div className="project-links">
            <a
              href="https://satellite-visualizer-demo.fly.dev"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Live demo
            </a>
            <a
              href="https://github.com/dovskyrick/grafana-satellite-visualizer"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              GitHub
            </a>
            <a
              href="/Master-Thesis-Ricardo-Santos.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Thesis PDF
            </a>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── EXPERIENCE ─── */}
      <section className="home-section" id="experience">
        <p className="section-label">Experience</p>
        <h2 className="section-title">Work experience</h2>
        <div className="exp-list">

          <div className="exp-item">
            <div className="exp-main">
              <p className="exp-role">Software Engineering Intern</p>
              <p className="exp-org">Six Floor Solutions</p>
              <p className="exp-desc">
                Developed internal data analysis software, improved an existing Raspberry Pi
                project using JavaScript, and worked on an audio processing project using
                Python and Bash scripts.
              </p>
            </div>
            <span className="exp-period">Summer 2024</span>
          </div>

          <div className="exp-item">
            <div className="exp-main">
              <p className="exp-role">Electronics Assembler</p>
              <p className="exp-org">Inforlandia</p>
              <p className="exp-desc">
                Worked in the assembly of computers and electronic devices.
              </p>
            </div>
            <span className="exp-period">2023</span>
          </div>

          <div className="exp-item">
            <div className="exp-main">
              <p className="exp-role">Programming Teacher</p>
              <p className="exp-org">Happy Code Portugal</p>
              <p className="exp-desc">
                Prepared programming lessons and guided students through coding projects.
              </p>
            </div>
            <span className="exp-period">2019</span>
          </div>

        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── EDUCATION ─── */}
      <section className="home-section" id="education">
        <p className="section-label">Education</p>
        <h2 className="section-title">Academic background</h2>
        <div className="edu-list">

          <div className="edu-item">
            <div className="edu-main">
              <p className="edu-degree">MSc in Aerospace Engineering</p>
              <p className="edu-institution">Instituto Superior Técnico</p>
              <p className="edu-gpa">GPA 17 / 20</p>
            </div>
            <span className="edu-period">2024 – present</span>
          </div>

          <div className="edu-item">
            <div className="edu-main">
              <p className="edu-degree">BSc in Aerospace Engineering</p>
              <p className="edu-institution">Instituto Superior Técnico</p>
              <p className="edu-gpa">GPA 15.58 / 20</p>
            </div>
            <span className="edu-period">2016 – 2019</span>
          </div>

        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── OTHER PROJECTS ─── */}
      <section className="home-section" id="other">
        <p className="section-label">Other projects</p>
        <h2 className="section-title">Academic and personal work</h2>

        <div className="proj-list">
          {ACADEMIC_PROJECTS.map((p) => (
            <article className="proj-card" key={p.title}>
              <span className="proj-tag">Academic project</span>
              <p className="proj-title">{p.title}</p>
              <p className="proj-course">{p.course}</p>
              {p.note && <p className="proj-note">{p.note}</p>}
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tools">
                {p.tools.map((t) => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="proj-group-label">Personal projects</p>
        <div className="proj-list">
          {PERSONAL_PROJECTS.map((p) => (
            <article className="proj-card" key={p.title}>
              <p className="proj-title">{p.title}</p>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tools">
                {p.tools.map((t) => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── SKILLS ─── */}
      <section className="home-section" id="skills">
        <p className="section-label">Skills</p>
        <h2 className="section-title">Technical skills</h2>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([group, tags]) => (
            <div key={group}>
              <p className="skill-group-label">{group}</p>
              <div className="skill-tags">
                {tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── ABOUT ─── */}
      <section className="home-section" id="about">
        <p className="section-label">About</p>
        <h2 className="section-title">About me</h2>
        <p className="about-text">
          I am a Master's student in Aerospace Engineering at Instituto Superior Técnico.
          My current work focuses on visualization for satellite digital twins, especially
          the connection between time series telemetry and spatial operational context.
          I am interested in aerospace software, mission operations tools, data visualization,
          human–computer interaction, and satellite systems.
        </p>
      </section>

      <hr className="section-divider" />

      {/* ─── CONTACT ─── */}
      <section className="home-section" id="contact">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Get in touch</h2>
        <p className="contact-intro">
          Open to opportunities related to aerospace software, satellite operations tools,
          visualization, and mission analysis interfaces.
        </p>
        <div className="contact-links">
          <a href="mailto:ricardo.santos.engin@gmail.com" className="btn btn-primary">
            Email
          </a>
          <a
            href="https://linkedin.com/in/rbbsantos"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/dovskyrick"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
          <a href="/cv.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
            Download CV
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="home-footer">
        <a href="/visual-experiments" className="home-footer-art">
          Art and visual experiments →
        </a>
      </footer>

    </div>
  );
}
