import { useRef, useState } from 'react';
import { applyTheme, type ThemeName } from '../theme';
import { LIVE_DEMO_AVAILABLE, LIVE_DEMO_URL, demoFallbackBtn } from '../site';
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
    desc: 'Self-directed animation and motion design, published to a genuine audience and reaching 3.5 million+ cumulative views on YouTube.',
    tools: ['Animation', 'Motion design'],
  },
];

/* Side projects: small things built for fun, each linked to its public repo.
   `play` is a live GitHub Pages build; `image` is a screenshot in /public. */
type SideProject = {
  title: string;
  status: string;
  desc: string;
  tools: string[];
  repo: string;
  play?: string;
  image?: { src: string; alt: string };
  extra?: { label: string; href: string };
};

const SIDE_PROJECTS: SideProject[] = [
  {
    title: 'Babelon',
    status: 'Complete · built in a day',
    desc: "Borges' Library of Babel as an endless labyrinth, carved around you as you walk. Every text on the floor is a real page of the Library: a page's position maps to its text through an invertible scramble, so every page exists exactly once and any text can be located.",
    tools: ['React Three Fiber', 'JavaScript', 'Procedural generation'],
    repo: 'https://github.com/dovskyrick/babelon',
    play: 'https://dovskyrick.github.io/babelon/',
    image: {
      src: '/babelon.webp',
      alt: 'Top-down view of Babelon: a lamp-lit maze of ochre walls with a glowing page on the floor.',
    },
  },
  {
    title: 'Aldric: D&D combat trainer',
    status: 'Playable · built in a day, expanding',
    desc: 'A MOBA-style trainer for getting used to D&D 2024 combat by playing it. You control a level 6 Oath of Vengeance Paladin, and the rules are enforced as you go: action and bonus action economy, one spell slot per turn, concentration, movement. Next up: more classes and levels, with rules fetched from a proper rules database or API.',
    tools: ['React Three Fiber', 'TypeScript', 'Game rules modelling'],
    repo: 'https://github.com/dovskyrick/aldric',
    play: 'https://dovskyrick.github.io/aldric/',
    image: {
      src: '/aldric.webp',
      alt: 'Aldric trainer: a gridded arena with the paladin, an enemy, and a skill bar of spells and actions.',
    },
  },
  {
    title: 'Chess-playing robot arm',
    status: 'In progress · early stage',
    desc: "A physical chess opponent: a camera reads the board, Stockfish picks a reply, and an SO-101 arm moves the piece. The arm is built, and the next step is running pretrained policies for basic pick-and-place before working up to full chess moves. The learning side builds on my background in reinforcement learning and control theory.",
    tools: ['Python', 'LeRobot', 'PyTorch', 'OpenCV'],
    repo: 'https://github.com/dovskyrick/chess-arm',
    extra: { label: 'Paper I am reading', href: 'https://arxiv.org/abs/2510.12403' },
  },
  {
    title: 'Audio language-learning app',
    status: 'In progress · mid stage',
    desc: 'A mobile app for audio-first language lessons. The audio player and the Firebase storage and database layer behind it are in place. Current work is the speech-generation pipeline, adding slow, syllable-by-syllable pronunciation so lessons are easier to follow.',
    tools: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Text-to-speech'],
    repo: 'https://github.com/dovskyrick/language-learning',
  },
];

/* Mirrors the "Technical Skills" rows of the public CV (cv repo,
   public/cv.typ), plus interface-design skills evidenced by the thesis. */
const SKILLS = {
  'Programming': [
    'C',
    'Python',
    'JavaScript',
    'TypeScript',
    'React',
    'MATLAB',
    'Bash',
    'OOP fundamentals',
  ],
  'Tools and platforms': [
    'Git',
    'Linux',
    'Docker',
    'REST/JSON APIs',
    'CI/CD and unit testing (basics)',
    'LaTeX',
  ],
  'Data and visualization': [
    'Grafana',
    'CesiumJS (WebGL)',
    'Data analysis',
    'Signal processing',
  ],
  'Interface design': [
    'Dashboard design',
    'Time-linked interaction',
    'Scenario-based user evaluation',
    'Human–computer interaction',
  ],
  '3D and modelling': [
    'Unity',
    'Blender (Python API scripting)',
    'SolidWorks',
  ],
  'Engineering and simulation': [
    'Simulink',
    'CST',
    'LTSpice',
    'Cadence',
    'Xilinx',
  ],
};

const CURRENTLY_LEARNING = [
  'SQL fundamentals',
  'Recently read: Designing Data-Intensive Applications (Kleppmann)',
];

const LANGUAGES = [
  ['Portuguese', 'Native'],
  ['English', 'Fluent, C2'],
  ['Spanish', 'Conversational'],
  ['German', 'Beginner'],
  ['Greek', 'Beginner, currently learning'],
];

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

/* Lives in the nav row, which scrolls away with the rest of the header. */
function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(
    () => (document.documentElement.dataset.theme as ThemeName) ?? 'light',
  );
  const next: ThemeName = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={`Switch to ${next} theme`}
    >
      <span className="theme-toggle-dot" aria-hidden="true" />
      {next === 'light' ? 'Light' : 'Dark'}
    </button>
  );
}

export default function Home() {
  return (
    <div className="home">

      {/* ─── NAV ─── */}
      <nav className="home-nav">
        <a href="#top" className="home-nav-name">Ricardo Santos</a>
        <div className="home-nav-right">
          <ul className="home-nav-links">
            <li><a href="#project">Project</a></li>
            <li><a href="#side-projects">Side projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="home-section home-section--hero" id="top">
        <p className="section-label">Aerospace Engineering</p>
        <div className="hero-head">
          <img
            src="/portrait.webp"
            alt="Portrait of Ricardo Santos"
            className="hero-portrait"
            width={400}
            height={400}
          />
          <h1 className="hero-name">Ricardo Santos</h1>
        </div>
        <p className="hero-tagline">
          Aerospace engineer working on software, visualization and embedded systems.
        </p>
        <p className="hero-body">
          MSc thesis defended at Instituto Superior Técnico in June 2026. I build
          interpretable operator tooling: interfaces that bring telemetry, spacecraft
          attitude, uncertainty and ground station geometry together so operators can
          see what a system is doing and how far to trust it.
        </p>
        <div className="hero-buttons">
          {LIVE_DEMO_AVAILABLE && (
            <a
              href={LIVE_DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              View satellite demo
            </a>
          )}
          <a href="/cv.pdf" target="_blank" rel="noreferrer" className={demoFallbackBtn}>
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
          {LIVE_DEMO_AVAILABLE && (
            <a
              href={LIVE_DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Open live demo
            </a>
          )}
          <a
            href="https://github.com/dovskyrick/grafana-satellite-visualizer"
            target="_blank"
            rel="noreferrer"
            className={demoFallbackBtn}
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
            My MSc thesis: a visualization tool that helps satellite operators understand a
            spacecraft's status and how much to trust what they are seeing. Developed alongside
            the ISTSat student satellite team in their lab, and tested with ten users, including
            an operator of the ISTSat-1 spacecraft.
          </p>
          <ul className="project-features">
            <li>
              Time-synchronized temporal and spatial views: selecting an instant in a telemetry
              panel updates the 3D spacecraft state, and playback in the 3D view drives the
              dashboard time cursor.
            </li>
            <li>
              Attitude and pointing: spacecraft model, reference axes, and sensor fields of view
              projected onto Earth or a celestial map, with Sun and Moon exclusion regions for
              star-tracker diagnosis.
            </li>
            <li>
              Observed and propagated trajectory segments drawn differently, with positional
              uncertainty shown as labelled ellipsoids.
            </li>
            <li>
              Source reliability as its own operator-assigned quality attribute, separate from
              geometric uncertainty.
            </li>
            <li>A ground station sky plot linking pass geometry to antenna pointing.</li>
            <li>
              Built as a Grafana panel plugin with React, TypeScript and CesiumJS, extending an
              existing open-source Grafana/Cesium plugin.
            </li>
          </ul>
          <div className="project-links">
            {LIVE_DEMO_AVAILABLE && (
              <a
                href={LIVE_DEMO_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Live demo
              </a>
            )}
            <a
              href="https://github.com/dovskyrick/grafana-satellite-visualizer"
              target="_blank"
              rel="noreferrer"
              className={demoFallbackBtn}
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

      {/* ─── SIDE PROJECTS ─── */}
      <section className="home-section" id="side-projects">
        <p className="section-label">Side projects</p>
        <h2 className="section-title">Things I build for fun</h2>
        <p className="section-intro">
          Smaller projects outside the thesis, from one-day games to longer builds
          that are still in progress.
        </p>
        <div className="side-grid">
          {SIDE_PROJECTS.map((p) => (
            <article className="side-card" key={p.title}>
              {p.image && (
                <a
                  href={p.play ?? p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="side-shot"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img src={p.image.src} alt={p.image.alt} loading="lazy" width={1280} height={800} />
                </a>
              )}
              <div className="side-body">
                <span className="side-status">{p.status}</span>
                <p className="proj-title">{p.title}</p>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tools">
                  {p.tools.map((t) => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>
                <div className="side-links">
                  {p.play && (
                    <a href={p.play} target="_blank" rel="noreferrer" className="btn btn-primary">
                      Play in browser ↗
                    </a>
                  )}
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className={p.play ? 'btn btn-outline' : 'btn btn-primary'}
                  >
                    GitHub
                  </a>
                  {p.extra && (
                    <a href={p.extra.href} target="_blank" rel="noreferrer" className="btn btn-outline">
                      {p.extra.label}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
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
              <ul className="exp-points">
                <li>Developed internal data analysis tools to support operational workflows.</li>
                <li>
                  Deployed, debugged and documented fixes for an existing Raspberry Pi based
                  system using Docker (JavaScript).
                </li>
                <li>
                  Implemented an audio fingerprinting pipeline in Python: FFT-based spectral peak
                  extraction and hash matching against a database, for song identification.
                </li>
              </ul>
            </div>
            <span className="exp-period">Summer 2024</span>
          </div>

          <div className="exp-item">
            <div className="exp-main">
              <p className="exp-role">Electronics Assembler</p>
              <p className="exp-org">Inforlandia</p>
              <p className="exp-desc">
                Assembled computers and electronic systems in a production environment.
              </p>
            </div>
            <span className="exp-period">2023</span>
          </div>

          <div className="exp-item">
            <div className="exp-main">
              <p className="exp-role">Programming Instructor</p>
              <p className="exp-org">Happy Code Portugal</p>
              <p className="exp-desc">
                Designed and delivered programming lessons, and guided students through
                hands-on coding projects.
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
              <p className="edu-gpa">GPA 17 / 20 · Thesis defended June 2026</p>
            </div>
            <span className="edu-period">2024 – 2026</span>
          </div>

          <div className="edu-item">
            <div className="edu-main">
              <p className="edu-degree">
                Master's in Mathematics (Statistics, then Pure Mathematics), not completed
              </p>
              <p className="edu-institution">Instituto Superior Técnico</p>
              <p className="edu-gpa">
                Completed part of the coursework, then moved to electronics and energy courses
                and external IST courses in 2023/24, credited toward the Aerospace MSc.
              </p>
            </div>
            <span className="edu-period">2019 – 2023</span>
          </div>

          <div className="edu-item">
            <div className="edu-main">
              <p className="edu-degree">BSc in Aerospace Engineering</p>
              <p className="edu-institution">Instituto Superior Técnico</p>
              <p className="edu-gpa">GPA 16 / 20</p>
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
          <div>
            <p className="skill-group-label">Learning</p>
            <div className="skill-tags">
              {CURRENTLY_LEARNING.map((tag) => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <p className="proj-group-label">Languages</p>
        <dl className="lang-list">
          {LANGUAGES.map(([lang, level]) => (
            <div key={lang} className="lang-item">
              <dt>{lang}</dt>
              <dd>{level}</dd>
            </div>
          ))}
        </dl>
      </section>

      <hr className="section-divider" />

      {/* ─── ABOUT ─── */}
      <section className="home-section" id="about">
        <p className="section-label">About</p>
        <h2 className="section-title">About me</h2>
        <p className="about-text">
          I am an aerospace engineer from Lisbon, trained at Instituto Superior Técnico.
          My MSc thesis, defended in June 2026, built visualization tools for satellite
          digital twins, connecting time series telemetry with the spatial context an
          operator needs to read it. I am drawn to software that makes complex systems
          legible: ground segment and operations tooling, data visualization, and
          embedded work. Outside engineering I have run a marathon and several
          long-distance trail races.
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
