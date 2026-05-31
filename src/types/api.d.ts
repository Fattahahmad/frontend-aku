export interface ApiResponse<T = unknown> {
  status: string; // 'success' atau 'error'
  message: string;
  data: T;
}

export interface ApiError {
  status: string;
  message: string;
  errors?: Record<string, string[]>; 
}
