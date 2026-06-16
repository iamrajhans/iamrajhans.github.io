export type CommandDefinition = {
  name: string;
  description: string;
  aliases?: string[];
};

export const commandDefinitions: CommandDefinition[] = [
  { name: "help", description: "List commands and shortcuts." },
  { name: "whoami", description: "Print profile identity and current focus." },
  { name: "projects", description: "Open /projects and print archive entries." },
  { name: "open project-01", description: "Open a project dossier. Replace 01 with another project id." },
  { name: "skills", description: "Display grouped stack modules." },
  { name: "lab", description: "Open experimental modules." },
  { name: "timeline", description: "Reveal terminal log history." },
  { name: "contact", description: "Open secure transmission panel." },
  { name: "sudo hire-me", description: "Permission granted. Open contact CTA." },
  { name: "clear", description: "Clear terminal output." },
  { name: "theme dark", description: "Switch to dark mode." },
  { name: "theme light", description: "Switch to light mode." },
  { name: "run game", description: "Start a small hidden command puzzle." },
  { name: "unlock", description: "Unlock the hidden archive module." },
  { name: "coffee", description: "Print a maintenance message." },
  { name: "404", description: "Open a fake broken terminal state." },
  { name: "credits", description: "Show technologies used." },
  { name: "repo", description: "Open GitHub profile." },
  { name: "resume", description: "Print resume status for this public build." },
];

export function normalizeCommand(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function getCommandSuggestions(input: string) {
  const normalized = normalizeCommand(input);
  if (!normalized) return commandDefinitions.slice(0, 8).map((command) => command.name);

  return commandDefinitions
    .flatMap((command) => [command.name, ...(command.aliases ?? [])])
    .filter((name) => name.startsWith(normalized))
    .slice(0, 8);
}
