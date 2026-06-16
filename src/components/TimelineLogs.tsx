import { TimelineEntry } from "../lib/data";

type TimelineLogsProps = {
  entries: TimelineEntry[];
};

export function TimelineLogs({ entries }: TimelineLogsProps) {
  return (
    <section className="section" id="timeline" aria-labelledby="timeline-title">
      <div className="section-heading">
        <p className="command-label">&gt; /logs/timeline --tail</p>
        <h2 id="timeline-title">Timeline logs</h2>
      </div>
      <div className="timeline-log">
        {entries.map((entry) => (
          <article className="timeline-line" key={`${entry.year}-${entry.event}`}>
            <span>[{entry.year}]</span>
            <p>{entry.event}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
