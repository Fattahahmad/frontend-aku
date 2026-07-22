import {
  Sun,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  CloudRain,
  ThumbsDown,
  Flame,
  Compass,
  LucideIcon,
} from "lucide-react";

export type PlutchikEmotion =
  | "Joy"
  | "Trust"
  | "Fear"
  | "Surprise"
  | "Sadness"
  | "Disgust"
  | "Anger"
  | "Anticipation";

export interface Mood {
  id: number;
  emotion: PlutchikEmotion;
  icon: LucideIcon;
  label: string;
  labelIndonesian: string;
  description: string;
}

export const moods: Mood[] = [
  {
    id: 0,
    emotion: "Joy",
    icon: Sun,
    label: "Joy",
    labelIndonesian: "Gembira / Senang",
    description: "Perasaan bahagia dan penuh energi positif",
  },
  {
    id: 1,
    emotion: "Trust",
    icon: ShieldCheck,
    label: "Trust",
    labelIndonesian: "Percaya / Mantap",
    description: "Perasaan aman, tenang, dan dapat mengandalkan",
  },
  {
    id: 2,
    emotion: "Fear",
    icon: AlertCircle,
    label: "Fear",
    labelIndonesian: "Cemas / Takut",
    description: "Rasa khawatir atau was-was terhadap sesuatu",
  },
  {
    id: 3,
    emotion: "Surprise",
    icon: Sparkles,
    label: "Surprise",
    labelIndonesian: "Terkejut / Takjub",
    description: "Reaksi atas sesuatu yang tak terduga",
  },
  {
    id: 4,
    emotion: "Sadness",
    icon: CloudRain,
    label: "Sadness",
    labelIndonesian: "Sedih / Duka",
    description: "Perasaan murung, hampa, atau kehilangan",
  },
  {
    id: 5,
    emotion: "Disgust",
    icon: ThumbsDown,
    label: "Disgust",
    labelIndonesian: "Enggan / Jijik",
    description: "Perasaan tidak suka atau menolak sesuatu",
  },
  {
    id: 6,
    emotion: "Anger",
    icon: Flame,
    label: "Anger",
    labelIndonesian: "Marah / Kesal",
    description: "Perasaan gusar, jengkel, atau emosi meluap",
  },
  {
    id: 7,
    emotion: "Anticipation",
    icon: Compass,
    label: "Anticipation",
    labelIndonesian: "Antusias / Berharap",
    description: "Menantikan sesuatu di masa depan dengan harap",
  },
];

export const getMoodByEmotion = (emotion: string): Mood => {
  return moods.find((m) => m.emotion.toLowerCase() === emotion.toLowerCase()) || moods[0];
};

export const getMood = (id: number): Mood => moods[id] ?? moods[0];
