import { SkillGroup } from "../lib/data";

type SkillsMapProps = {
  skills: SkillGroup[];
};

export function SkillsMap({ skills }: SkillsMapProps) {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="command-label">&gt; /stack/list --signal</p>
        <h2 id="skills-title">Stack map</h2>
        <p>No fake percentages. Just operating confidence and where each tool sits in the system.</p>
      </div>
      <div className="skills-grid">
        {skills.map((group) => (
          <article className="skill-group" key={group.id}>
            <div className="skill-head">
              <h3>{group.title}</h3>
              <span>{group.level}</span>
            </div>
            <div className={`signal-bars signal-${group.level.replace(/\s/g, "-")}`} aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="tag-list">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
