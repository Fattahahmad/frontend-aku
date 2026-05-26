// Tipe untuk format standar response dari Backend
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// Tipe jika backend mengembalikan error dengan format tertentu
export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>; // Contoh untuk validasi error
}
