import { LabModule } from "../lib/data";

type LabModulesProps = {
  modules: LabModule[];
  gameActive: boolean;
  secretUnlocked: boolean;
};

export function LabModules({ modules, gameActive, secretUnlocked }: LabModulesProps) {
  return (
    <section className="section" id="lab" aria-labelledby="lab-title">
      <div className="section-heading">
        <p className="command-label">&gt; /lab/modules --unlockable</p>
        <h2 id="lab-title">Experiment lab</h2>
        <p>Small interactive ideas, playful modules, and render experiments. Type `run game` to start a hidden puzzle.</p>
      </div>
      <div className="lab-grid">
        {modules.map((module) => (
          <article className="lab-card" key={module.id}>
            <span className={`status-pill status-${module.status}`}>{module.status}</span>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </article>
        ))}
        <article className={`lab-card lab-card-game ${gameActive ? "is-active" : ""}`}>
          <span className="status-pill status-online">game</span>
          <h3>Mini command puzzle</h3>
          <p>{gameActive ? "Puzzle active: the archive accepts `unlock`." : "Dormant. Start it with `run game`."}</p>
        </article>
        <article className={`lab-card ${secretUnlocked ? "is-active" : "is-locked"}`}>
          <span className="status-pill status-locked">{secretUnlocked ? "unlocked" : "locked"}</span>
          <h3>Secret project card</h3>
          <p>{secretUnlocked ? "Hidden module mounted into /projects." : "Find the terminal command to reveal this module."}</p>
        </article>
      </div>
    </section>
  );
}
