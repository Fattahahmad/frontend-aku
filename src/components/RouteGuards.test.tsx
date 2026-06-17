import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthProvider } from "@moodmate/auth/AuthProvider";
import { ProtectedRoute } from "@moodmate/components/ProtectedRoute";
import { PublicRoute } from "@moodmate/components/PublicRoute";

const renderWithAuth = (initialEntries: string[]) => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div data-testid="protected-content">Protected</div>} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<div data-testid="login-content">Login</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
};

describe("route guards", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders protected content when authenticated", async () => {
    localStorage.setItem("access_token", "token-123");

    renderWithAuth(["/dashboard"]);

    await waitFor(() => expect(screen.getByTestId("protected-content")).toBeInTheDocument());
  });

  it("redirects protected route when unauthenticated", async () => {
    renderWithAuth(["/dashboard"]);

    await waitFor(() => expect(screen.getByTestId("login-content")).toBeInTheDocument());
  });

  it("renders public route when unauthenticated", async () => {
    renderWithAuth(["/login"]);

    await waitFor(() => expect(screen.getByTestId("login-content")).toBeInTheDocument());
  });
});
