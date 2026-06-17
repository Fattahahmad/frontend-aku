export const ACCESS_TOKEN_KEY = "access_token";

const emitAuthChange = () => {
  window.dispatchEvent(new Event("auth:change"));
};

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token: string): void {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    emitAuthChange();
  } catch {
    return;
  }
}

export function clearAuth(): void {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    emitAuthChange();
  } catch {
    return;
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
