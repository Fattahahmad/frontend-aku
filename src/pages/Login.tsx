import { Link, useNavigate } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
import { Input } from "@moodmate/components/ui/input";
import { Label } from "@moodmate/components/ui/label";
import { Leaf, Loader2, Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useLoginMutation } from "@moodmate/hooks/api/useAuth";
import { isAxiosError } from "axios";
import { ApiError } from "@moodmate/types/api";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    mutate({ email, password }, {
      onSuccess: (res) => {
        if (res.status === "success") {
          localStorage.setItem("access_token", res.data.token);
          toast.success(res.message || "Welcome back!");
          navigate("/dashboard/home");
        }
      },
      onError: (err: unknown) => {
        let errorMsg = "Invalid email or password";
        if (isAxiosError<ApiError>(err) && err.response?.data?.message) {
          errorMsg = err.response.data.message;
        }
        toast.error(errorMsg);
      }
    });
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <div className="hidden md:flex md:flex-1 relative">
        <img
          src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1400&q=80"
          alt="Soft green leaves"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 px-6 md:px-8 overflow-y-auto">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-3 font-semibold text-xl mb-10">
            <Leaf className="w-7 h-7 text-primary" strokeWidth={1.75} />
            MoodMate
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Selamat datang!</h1>
          <p className="text-muted-foreground mt-2 mb-8 text-base">Masuk untuk melanjutkan praktik harianmu.</p>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" className="h-12 text-base" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="h-12 text-base pr-10" 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 font-medium text-base mt-6" disabled={isPending}>
              {isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {isPending ? "Logging in..." : "Log in"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-6">
            Tidak punya akun? <Link to="/register" className="text-foreground font-medium hover:underline">Daftar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
