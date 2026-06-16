import { Project } from "../lib/data";

type ProjectArchiveProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export function ProjectArchive({ projects, onOpenProject }: ProjectArchiveProps) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="command-label">&gt; /projects/archive --classified</p>
        <h2 id="projects-title">Project archive</h2>
        <p>Terminal file cards for production systems, experiments, and hidden modules.</p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className={`project-card ${project.secret ? "project-card-secret" : ""}`} key={project.id}>
            <div className="project-card-head">
              <span>{project.id}</span>
              <strong>{project.area}</strong>
            </div>
            <h3>{project.title}</h3>
            <p>{project.solution}</p>
            <div className="case-impact">{project.impact}</div>
            <div className="tag-list">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <button type="button" className="text-command" onClick={() => onOpenProject(project)}>
              open dossier
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
