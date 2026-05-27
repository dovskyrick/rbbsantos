import './Home.css';

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
    'Rust (learning)',
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
          <a href="PLACEHOLDER_CV_FILE_PATH" className="btn btn-outline">
            Download CV
          </a>
          <a
            href="PLACEHOLDER_GITHUB_LINK"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
          <a href="mailto:ricardo.belchior@tecnico.ulisboa.pt" className="btn btn-outline">
            Contact
          </a>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── VISUAL PREVIEW ─── */}
      <section className="home-section" id="preview">
        <p className="section-label">Satellite visualization</p>
        <div className="preview-frame">
          <div className="preview-placeholder">
            <span className="preview-placeholder-icon">🛰</span>
            <span>PLACEHOLDER_SATELLITE_DASHBOARD_SCREENSHOT_PATH</span>
          </div>
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
            href="PLACEHOLDER_SATELLITE_REPOSITORY_LINK"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            View repository
          </a>
        </div>
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
              href="PLACEHOLDER_SATELLITE_REPOSITORY_LINK"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              GitHub
            </a>
            <a
              href="PLACEHOLDER_THESIS_PDF_PATH_OR_COMING_SOON"
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
              <p className="edu-gpa">GPA 16.79 / 20</p>
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

      {/* ─── OTHER SOFTWARE WORK ─── */}
      <section className="home-section" id="other">
        <p className="section-label">Other software work</p>
        <h2 className="section-title">Additional projects</h2>
        <div className="other-card">
          <p className="other-card-status">Prototype</p>
          <p className="other-card-title">Mobile language lesson audio app</p>
          <p className="other-card-desc">
            A small mobile prototype created to explore structured audio-based language learning.
            Included as an example of broader software experimentation outside the thesis project.
          </p>
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
          <a href="mailto:ricardo.belchior@tecnico.ulisboa.pt" className="btn btn-primary">
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
            href="PLACEHOLDER_GITHUB_LINK"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
          <a href="PLACEHOLDER_CV_FILE_PATH" className="btn btn-outline">
            Download CV
          </a>
          <a href="tel:+351925224133" className="btn btn-outline">
            +351 925 224 133
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="home-footer">
        <a href="PLACEHOLDER_VISUAL_EXPERIMENTS_PATH" className="home-footer-art">
          Art and visual experiments →
        </a>
      </footer>

    </div>
  );
}
