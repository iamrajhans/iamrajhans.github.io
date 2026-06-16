import { profile } from "../lib/data";

export function StatusWidget() {
  return (
    <section className="section" id="status" aria-labelledby="status-title">
      <div className="status-widget">
        <div>
          <p className="command-label">&gt; /status/ping</p>
          <h2 id="status-title">Availability</h2>
        </div>
        <dl>
          <div>
            <dt>status</dt>
            <dd>
              <span className="blink-dot" />
              {profile.availability}
            </dd>
          </div>
          <div>
            <dt>response_time</dt>
            <dd>24-48h</dd>
          </div>
          <div>
            <dt>timezone</dt>
            <dd>{profile.timezone}</dd>
          </div>
          <div>
            <dt>current_mode</dt>
            <dd>{profile.mode}</dd>
          </div>
          <div>
            <dt>accepting</dt>
            <dd>full-time / consulting / collaborations</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
