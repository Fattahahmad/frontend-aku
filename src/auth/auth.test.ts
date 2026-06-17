import { beforeEach, describe, expect, it } from "vitest";
import { ACCESS_TOKEN_KEY, clearAuth, getAccessToken, isAuthenticated, setAccessToken } from "./auth";

describe("auth helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores and reads access token", () => {
    setAccessToken("token-123");

    expect(getAccessToken()).toBe("token-123");
    expect(isAuthenticated()).toBe(true);
  });

  it("clears access token", () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, "token-123");

    clearAuth();

    expect(getAccessToken()).toBeNull();
    expect(isAuthenticated()).toBe(false);
  });
});
