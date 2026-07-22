import { lazy, ComponentType } from "react";

/**
 * Wrapper untuk React.lazy yang secara otomatis menangani kegagalan impor modul (Chunk Load Failure)
 * saat terjadi deployment baru di Vercel/Cloud di mana hash nama file JS berubah.
 */
export function safeLazy<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const pageHasBeenRefreshed = JSON.parse(
      window.sessionStorage.getItem("chunk_retry_refreshed") || "false"
    );

    try {
      const component = await factory();
      window.sessionStorage.setItem("chunk_retry_refreshed", "false");
      return component;
    } catch (error: unknown) {
      const err = error as { message?: string; name?: string } | null;
      const isChunkError =
        err?.message?.includes("Failed to fetch dynamically imported module") ||
        err?.message?.includes("Importing a module script failed") ||
        err?.name === "ChunkLoadError";

      if (isChunkError && !pageHasBeenRefreshed) {
        console.warn("Chunk load error detected (new deployment). Reloading page...");
        window.sessionStorage.setItem("chunk_retry_refreshed", "true");
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }

      throw error;
    }
  });
}
