import { FormEvent, KeyboardEvent, useMemo, useRef, useState } from "react";
import { commandDefinitions, getCommandSuggestions } from "../lib/commands";

export type TerminalLine = {
  id: string;
  kind: "input" | "info" | "success" | "error" | "system";
  content: string;
};

export type CommandResult = {
  clear?: boolean;
  lines: Omit<TerminalLine, "id">[];
};

type ActiveResponse = {
  command: string;
  lines: TerminalLine[];
};

type TerminalShellProps = {
  onCommand: (command: string) => CommandResult;
};

const introLines: TerminalLine[] = [
  {
    id: "intro-1",
    kind: "system",
    content: "RJ console online. Type `help` to inspect the interface.",
  },
  {
    id: "intro-2",
    kind: "info",
    content: "Suggested: whoami, projects, skills, lab, timeline, sudo hire-me",
  },
];

export function TerminalShell({ onCommand }: TerminalShellProps) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [activeResponse, setActiveResponse] = useState<ActiveResponse>({
    command: "boot",
    lines: introLines,
  });
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandFocusScrollY = useRef(0);

  const suggestions = useMemo(() => getCommandSuggestions(input), [input]);

  function appendLines(nextLines: Omit<TerminalLine, "id">[]) {
    const timestamp = Date.now();
    return nextLines.map((line, index) => ({
      ...line,
      id: `${timestamp}-${index}-${line.kind}`,
    }));
  }

  function submitCommand(command: string) {
    const trimmed = command.trim();
    if (!trimmed) return;
    const restoreScrollY = commandFocusScrollY.current;

    const result = onCommand(trimmed);
    const typedLine: TerminalLine = {
      id: `${Date.now()}-typed`,
      kind: "input",
      content: `visitor@rj:~$ ${trimmed}`,
    };

    setHistory((current) => [trimmed, ...current.filter((item) => item !== trimmed)].slice(0, 30));
    setHistoryIndex(null);
    setInput("");

    if (result.clear) {
      setLines([]);
      setActiveResponse({
        command: "clear",
        lines: appendLines([{ kind: "success", content: "terminal chat cleared. Ready for the next command." }]),
      });
      window.requestAnimationFrame(() => window.scrollTo(0, restoreScrollY));
      return;
    }

    setLines((current) => [...current, typedLine].slice(-5));
    setActiveResponse({
      command: trimmed,
      lines: appendLines(result.lines),
    });
    window.requestAnimationFrame(() => window.scrollTo(0, restoreScrollY));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitCommand(input);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = historyIndex === null ? 0 : Math.min(historyIndex + 1, history.length - 1);
      if (history[nextIndex]) {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex - 1;
      if (nextIndex < 0) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }

    if (event.key === "Tab" && suggestions[0]) {
      event.preventDefault();
      setInput(suggestions[0]);
    }
  }

  return (
    <section className="terminal-shell" aria-label="Interactive RJ command shell">
      <div className="terminal-topbar">
        <span />
        <span />
        <span />
        <strong>visitor@rj</strong>
      </div>
      <div className="terminal-output" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-response-card" aria-live="polite">
          <div className="response-head">
            <span>response</span>
            <strong>{activeResponse.command}</strong>
          </div>
          <div className="response-lines">
            {activeResponse.lines.map((line) => (
              <p className={`terminal-line terminal-line-${line.kind}`} key={line.id}>
                {line.content}
              </p>
            ))}
          </div>
        </div>
        <div className="terminal-recent" aria-label="Recent commands">
          <span>recent</span>
          {lines.length ? (
            lines.map((line) => (
              <p className={`terminal-line terminal-line-${line.kind}`} key={line.id}>
                {line.content}
              </p>
            ))
          ) : (
            <p className="terminal-line terminal-line-info">No commands yet. Try `projects` or `skills`.</p>
          )}
        </div>
      </div>
      <form className="command-form" onSubmit={onSubmit}>
        <label htmlFor="terminal-command">visitor@rj:~$</label>
        <input
          ref={inputRef}
          id="terminal-command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onFocus={() => {
            commandFocusScrollY.current = window.scrollY;
          }}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          aria-describedby="command-help"
        />
        <button type="submit">run</button>
      </form>
      <div className="command-suggestions" id="command-help" aria-label="Command suggestions">
        {(suggestions.length ? suggestions : commandDefinitions.slice(0, 6).map((command) => command.name)).map((suggestion) => (
          <button type="button" key={suggestion} onClick={() => submitCommand(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}
