import { Achievement } from "../lib/data";

type AchievementShelfProps = {
  achievements: Achievement[];
  unlockedIds: string[];
};

export function AchievementShelf({ achievements, unlockedIds }: AchievementShelfProps) {
  return (
    <section className="achievement-shelf" aria-label="Achievement badges">
      {achievements.map((achievement) => (
        <article className={unlockedIds.includes(achievement.id) ? "achievement unlocked" : "achievement"} key={achievement.id}>
          <strong>{achievement.title}</strong>
          <span>{achievement.description}</span>
        </article>
      ))}
    </section>
  );
}
