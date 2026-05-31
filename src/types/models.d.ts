export interface User {
  id: string;
  email: string;
  name: string;
  current_streak: number;
  created_at: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  moodId: number;
  text: string;
  tags: string[];
  aiInsight?: string; 
  createdAt: string;
}

