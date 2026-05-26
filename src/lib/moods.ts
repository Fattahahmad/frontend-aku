import { CloudLightning, CloudRain, Cloud, CloudSun, Sun, Sunrise, LucideIcon } from "lucide-react";

export type Mood = { id: number; icon: LucideIcon; label: string };

export const moods: Mood[] = [
  { id: 0, icon: CloudLightning, label: "Very sad" },
  { id: 1, icon: CloudRain, label: "Sad" },
  { id: 2, icon: Cloud, label: "Down" },
  { id: 3, icon: CloudSun, label: "Neutral" },
  { id: 4, icon: Sun, label: "Happy" },
  { id: 5, icon: Sunrise, label: "Very happy" },
];

export const getMood = (id: number): Mood => moods[id] ?? moods[3];
