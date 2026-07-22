import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@moodmate/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunkError =
        this.state.error?.message?.includes("Failed to fetch dynamically imported module") ||
        this.state.error?.message?.includes("Importing a module script failed");

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
          <div className="max-w-md w-full border border-border bg-card rounded-lg p-6 sm:p-8 text-center space-y-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" strokeWidth={1.75} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                {isChunkError ? "Pembaruan Versi Aplikasi" : "Terjadi kesalahan sistem"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isChunkError
                  ? "Aplikasi telah diperbarui ke versi terbaru di server. Muat ulang halaman untuk memperbarui tampilan."
                  : "Tampilan mengalami kendala saat memuat data. Jangan khawatir, Anda dapat mencoba memuat ulang."}
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-muted rounded text-xs text-muted-foreground font-mono overflow-x-auto text-left max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button onClick={this.handleReset} variant="outline" className="w-full sm:w-auto h-10 px-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
              <Button onClick={this.handleReload} className="w-full sm:w-auto h-10 px-4">
                <Home className="w-4 h-4 mr-2" />
                Muat Ulang Halaman
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
