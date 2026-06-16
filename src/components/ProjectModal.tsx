import { Project } from "../lib/data";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="terminal-topbar">
          <span />
          <span />
          <span />
          <strong>{project.id}</strong>
        </div>
        <div className="project-modal-body">
          <p className="command-label">&gt; open {project.id}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <dl className="case-details">
            <div>
              <dt>problem</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt>solution</dt>
              <dd>{project.solution}</dd>
            </div>
            <div>
              <dt>features</dt>
              <dd>{project.features.join(" / ")}</dd>
            </div>
          </dl>
          <div className="screenshot-placeholder">screenshot placeholder / replace with product capture</div>
          <div className="tag-list">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <button className="button button-primary" type="button" onClick={onClose}>
            close dossier
          </button>
        </div>
      </section>
    </div>
  );
}
