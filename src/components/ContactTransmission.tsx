import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { profile } from "../lib/data";

export function ContactTransmission() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <p className="command-label">&gt; /connect/transmit</p>
        <h2 id="contact-title">Send a secure transmission</h2>
        <p>For GenAI products, backend platforms, LLM infrastructure, and serious interactive systems.</p>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label>
          name
          <input name="name" required />
        </label>
        <label>
          email
          <input name="email" type="email" required />
        </label>
        <label>
          project type
          <select name="type" defaultValue="GenAI platform">
            <option>GenAI platform</option>
            <option>Backend system</option>
            <option>Interactive portfolio</option>
            <option>Collaboration</option>
          </select>
        </label>
        <label>
          message
          <textarea name="message" rows={5} required />
        </label>
        <button className="button button-primary" type="submit">
          <Mail size={18} aria-hidden="true" />
          Send transmission
        </button>
        {sent ? <p className="transmission-success">Transmission queued. I&apos;ll reply soon.</p> : null}
      </form>
      <div className="social-grid" aria-label="Social links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
    </section>
  );
}
