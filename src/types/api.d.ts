// Tipe untuk format standar response dari Backend
export interface ApiResponse<T = any> {
  status: string; // 'success' atau 'error'
  message: string;
  data: T;
}

// Tipe jika backend mengembalikan error dengan format tertentu
export interface ApiError {
  status: string;
  message: string;
  errors?: Record<string, string[]>; // Contoh untuk validasi error
}
