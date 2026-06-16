import { useEffect, useState } from "react";

const bootLines = [
  "Initializing RJ...",
  "Loading identity modules...",
  "Mounting /projects...",
  "Starting command console...",
  "Welcome, visitor.",
];

type BootSequenceProps = {
  onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    if (lineCount >= bootLines.length) {
      const timeout = window.setTimeout(onComplete, 700);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => setLineCount((count) => count + 1), 420);
    return () => window.clearTimeout(timeout);
  }, [lineCount, onComplete]);

  return (
    <div className="boot-screen" role="status" aria-live="polite">
      <div className="boot-window">
        <div className="terminal-topbar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="boot-body">
          {bootLines.slice(0, lineCount).map((line) => (
            <p key={line}>
              <span className="prompt-mark">&gt;</span> {line}
            </p>
          ))}
          <button className="text-command" type="button" onClick={onComplete}>
            Skip intro
          </button>
        </div>
      </div>
    </div>
  );
}
