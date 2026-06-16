import { achievements } from "./data";

const achievementKey = "rj-achievements";
const bootKey = "rj-boot-complete";

export function readBootComplete() {
  return window.localStorage.getItem(bootKey) === "true";
}

export function writeBootComplete() {
  window.localStorage.setItem(bootKey, "true");
}

export function readAchievements() {
  const raw = window.localStorage.getItem(achievementKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => achievements.some((achievement) => achievement.id === id));
  } catch {
    return [];
  }
}

export function writeAchievements(ids: string[]) {
  window.localStorage.setItem(achievementKey, JSON.stringify([...new Set(ids)]));
}
