import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgeCheck, Code2, Mail, Terminal } from "lucide-react";
import { AchievementShelf } from "./components/AchievementShelf";
import { BootSequence } from "./components/BootSequence";
import { ContactTransmission } from "./components/ContactTransmission";
import { LabModules } from "./components/LabModules";
import { ProjectArchive } from "./components/ProjectArchive";
import { ProjectModal } from "./components/ProjectModal";
import { SkillsMap } from "./components/SkillsMap";
import { StatusWidget } from "./components/StatusWidget";
import { TerminalShell, CommandResult } from "./components/TerminalShell";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { TimelineLogs } from "./components/TimelineLogs";
import { commandDefinitions, normalizeCommand } from "./lib/commands";
import {
  achievements,
  labModules,
  openSource,
  profile,
  projects,
  skillGroups,
  timeline,
  Project,
} from "./lib/data";
import { readAchievements, readBootComplete, writeAchievements, writeBootComplete } from "./lib/storage";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: "https://iamrajhans.github.io/",
  sameAs: [profile.github, profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  knowsAbout: ["GenAI platforms", "LLM infrastructure", "RAG systems", "MCP tooling", "Backend systems"],
};

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [brokenMode, setBrokenMode] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    setBootComplete(readBootComplete());
    setUnlockedAchievements(readAchievements());
  }, []);

  const visibleProjects = useMemo(
    () => projects.filter((project) => !project.secret || secretUnlocked),
    [secretUnlocked],
  );

  const grantAchievement = useCallback((id: string) => {
    setUnlockedAchievements((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      writeAchievements(next);
      return next;
    });
  }, []);

  const openProjectById = useCallback(
    (id: string) => {
      const project = visibleProjects.find((item) => item.id === id);
      if (project) {
        setActiveProject(project);
        grantAchievement("opened-archive");
        return true;
      }
      return false;
    },
    [grantAchievement, visibleProjects],
  );

  const runCommand = useCallback(
    (rawCommand: string): CommandResult => {
      const command = normalizeCommand(rawCommand);
      grantAchievement("first-command");

      if (command === "clear") return { clear: true, lines: [] };

      if (command === "help") {
        return {
          lines: [
            { kind: "success", content: "profile: whoami / skills / timeline" },
            { kind: "info", content: "proof: projects / open project-01 / lab" },
            { kind: "info", content: "contact: contact / sudo hire-me / repo" },
            { kind: "info", content: "system: theme dark / theme light / clear / credits" },
          ],
        };
      }

      if (command === "whoami") {
        return {
          lines: [
            { kind: "success", content: `${profile.name} / ${profile.role}` },
            { kind: "info", content: `location=${profile.location} timezone=${profile.timezone} status=${profile.availability}` },
            { kind: "info", content: `focus=${profile.focus}` },
          ],
        };
      }

      if (command === "projects") {
        grantAchievement("opened-archive");
        return {
          lines: [
            { kind: "success", content: "project-01  GenAI visibility / 40% research effort cut" },
            { kind: "info", content: "project-02  LLM gateway / 1,000+ developer org scale" },
            { kind: "info", content: "project-03  Agent + MCP tooling / reusable tool contracts" },
            { kind: "info", content: "project-04  Backend APIs / 40% p95 latency cut" },
            { kind: "info", content: "project-05  Fraud + ledger / 60% reconciliation cut" },
          ].filter((line) => visibleProjects.some((project) => line.content.startsWith(project.id))) as CommandResult["lines"],
        };
      }

      if (command.startsWith("open project-")) {
        const id = command.replace("open ", "");
        const opened = openProjectById(id);
        return {
          lines: [
            opened
              ? { kind: "success", content: `dossier mounted: ${id}` }
              : { kind: "error", content: `dossier not found: ${id}` },
          ],
        };
      }

      if (command === "skills") {
        return {
          lines: skillGroups.map((group) => ({
            kind: "info",
            content: `${group.title}: ${group.items.join(", ")} (${group.level})`,
          })),
        };
      }

      if (command === "lab") {
        grantAchievement("found-lab");
        return { lines: [{ kind: "success", content: "lab modules online. Try `run game`." }] };
      }

      if (command === "timeline") {
        return { lines: timeline.map((entry) => ({ kind: "info", content: `[${entry.year}] ${entry.event}` })) };
      }

      if (command === "contact") {
        return {
          lines: [
            { kind: "success", content: `email: ${profile.email}` },
            { kind: "info", content: `github: ${profile.github}` },
            { kind: "info", content: `linkedin: ${profile.linkedin}` },
          ],
        };
      }

      if (command === "sudo hire-me") {
        grantAchievement("hired-developer");
        return {
          lines: [
            { kind: "success", content: "Permission granted. Let's build." },
            { kind: "info", content: `Fastest path: ${profile.email}` },
          ],
        };
      }

      if (command === "theme dark" || command === "dark") {
        setTheme("dark");
        return { lines: [{ kind: "success", content: "dark mode active. Subtle signal layer retained." }] };
      }

      if (command === "theme light" || command === "light") {
        setTheme("light");
        return { lines: [{ kind: "success", content: "light mode active. High-contrast terminal surface enabled." }] };
      }

      if (command === "run game") {
        setGameActive(true);
        return { lines: [{ kind: "system", content: "mini puzzle started: the archive listens for `unlock`." }] };
      }

      if (command === "unlock") {
        setSecretUnlocked(true);
        grantAchievement("secret-unlocked");
        return { lines: [{ kind: "success", content: "secret module mounted: project-secret" }] };
      }

      if (command === "coffee") {
        return { lines: [{ kind: "info", content: "coffee daemon reports: build fuel nominal." }] };
      }

      if (command === "404") {
        setBrokenMode(true);
        return { lines: [{ kind: "error", content: "fake kernel panic opened. Press recover." }] };
      }

      if (command === "credits") {
        return {
          lines: [
            { kind: "info", content: "React + TypeScript + Vite + CSS motion." },
            { kind: "info", content: "Keyboard-first terminal with dark/light mode and compact command responses." },
          ],
        };
      }

      if (command === "repo") {
        window.open(profile.github, "_blank", "noreferrer");
        return { lines: [{ kind: "success", content: "repository vector opened in a new tab." }] };
      }

      if (command === "resume") {
        return {
          lines: [
            {
              kind: "info",
              content: "resume module is intentionally not mounted on this public build. Use LinkedIn or email for current details.",
            },
          ],
        };
      }

      return {
        lines: [{ kind: "error", content: "command not found. Type `help` to inspect available modules." }],
      };
    },
    [grantAchievement, openProjectById, visibleProjects],
  );

  function completeBoot() {
    writeBootComplete();
    setBootComplete(true);
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {!bootComplete ? <BootSequence onComplete={completeBoot} /> : null}
      <div className="app" data-theme={theme}>
        <div className="matrix-rain" aria-hidden="true" />
        <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
        <header className="site-header" aria-label="Primary navigation">
          <a className="brand" href="#hero" aria-label="RJ home">
            <Terminal size={18} aria-hidden="true" />
            <span>RJ</span>
          </a>
          <nav className="nav-links">
            {["about", "projects", "skills", "lab", "timeline", "status", "contact"].map((item) => (
              <a href={`#${item}`} key={item}>
                /{item}
              </a>
            ))}
          </nav>
          <a className="header-action" href={`mailto:${profile.email}`} title="Email Rajhans">
            <Mail size={18} aria-hidden="true" />
            <span>Contact</span>
          </a>
        </header>

        <main>
          <section className="hero" id="hero" aria-labelledby="hero-title">
            <TerminalShell onCommand={runCommand} />
            <div className="hero-copy">
              <p className="command-label">&gt; boot.identity</p>
              <h1 id="hero-title">{profile.name}</h1>
              <p className="role-line">{profile.role}</p>
              <p className="tagline">{profile.tagline}</p>
              <p className="hero-note">Type `help` to inspect the system, or use the navigation when you want the full page.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={`mailto:${profile.email}`}>
                  <Mail size={18} aria-hidden="true" />
                  Email
                </a>
                <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
                  <Code2 size={18} aria-hidden="true" />
                  GitHub
                </a>
                <a className="button button-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <BadgeCheck size={18} aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
          </section>

          <section className="section identity-grid" id="about" aria-labelledby="about-title">
            <div className="section-heading">
              <p className="command-label">&gt; whoami</p>
              <h2 id="about-title">System identity card</h2>
            </div>
            <dl className="identity-card">
              <div>
                <dt>user.name</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>user.role</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt>user.location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>user.stack</dt>
                <dd>{profile.stack}</dd>
              </div>
              <div>
                <dt>user.status</dt>
                <dd>{profile.availability}</dd>
              </div>
              <div>
                <dt>user.mode</dt>
                <dd>{profile.mode}</dd>
              </div>
            </dl>
            <article className="bio-card">
              <h3>Human bio</h3>
              <p>{profile.bio}</p>
            </article>
          </section>

          <ProjectArchive projects={visibleProjects} onOpenProject={setActiveProject} />
          <SkillsMap skills={skillGroups} />
          <LabModules modules={labModules} gameActive={gameActive} secretUnlocked={secretUnlocked} />
          <TimelineLogs entries={timeline} />
          <StatusWidget />

          <section className="section" id="open-source" aria-labelledby="oss-title">
            <div className="section-heading">
              <p className="command-label">&gt; oss.merge_log</p>
              <h2 id="oss-title">Open-source merge log</h2>
            </div>
            <div className="oss-list">
              {openSource.map(([project, contribution]) => (
                <article className="oss-item" key={project}>
                  <h3>{project}</h3>
                  <p>{contribution}</p>
                </article>
              ))}
            </div>
          </section>

          <AchievementShelf achievements={achievements} unlockedIds={unlockedAchievements} />
          <ContactTransmission />
        </main>

        <footer className="site-footer">RJ session ended.</footer>
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      {brokenMode ? (
        <div className="broken-terminal" role="dialog" aria-modal="true" aria-labelledby="broken-title">
          <div>
            <p className="command-label">kernel.panic()</p>
            <h2 id="broken-title">404: fake terminal rupture</h2>
            <p>Nothing is broken. This is an easter egg for people who type suspicious commands.</p>
            <button className="button button-primary" type="button" onClick={() => setBrokenMode(false)}>
              recover session
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
