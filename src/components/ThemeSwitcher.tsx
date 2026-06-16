import { Moon, Sun } from "lucide-react";

type ThemeSwitcherProps = {
  theme: string;
  onThemeChange: (theme: string) => void;
};

export function ThemeSwitcher({
  theme,
  onThemeChange,
}: ThemeSwitcherProps) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <aside className="hud" aria-label="RJ theme controls">
      <button
        type="button"
        className="theme-toggle"
        onClick={() => onThemeChange(nextTheme)}
        aria-label={`Switch to ${nextTheme} mode`}
        aria-pressed={theme === "light"}
      >
        {theme === "dark" ? <Moon size={14} aria-hidden="true" /> : <Sun size={14} aria-hidden="true" />}
        <span>{nextTheme}</span>
      </button>
    </aside>
  );
}
