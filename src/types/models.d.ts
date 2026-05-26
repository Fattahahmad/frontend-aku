export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  moodId: number;
  text: string;
  tags: string[];
  aiInsight?: string; // Berisi insight dari AI jika ada
  createdAt: string;
}

// Anda dapat menambahkan lebih banyak model seiring dengan perkembangan backend
