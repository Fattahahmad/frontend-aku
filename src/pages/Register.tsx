import { Link, useNavigate } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
import { Input } from "@moodmate/components/ui/input";
import { Label } from "@moodmate/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { FormEvent, useState, type ChangeEvent } from "react";
import { toast } from "@moodmate/components/ui/toast";
import { useRegisterMutation } from "@moodmate/hooks/api/useAuth";
import { getApiErrorMessage } from "@moodmate/lib/api";
import {
  getFirstZodError,
  registerSchema,
  type RegisterFormData,
} from "@moodmate/lib/validations";
import { BrandMark } from "@moodmate/components/BrandMark";

const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(getFirstZodError(parsed.error));
      return;
    }

    mutate(
      {
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
      },
      {
        onSuccess: () => {
          toast.success("Registration successful! You can now log in.");
          navigate("/login");
        },
        onError: (err: unknown) => {
          toast.error(getApiErrorMessage(err, "Registration failed. Please try again."));
        },
      },
    );
  };

  const updateField = (field: keyof RegisterFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      <div className="hidden md:flex md:flex-1 relative">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
          alt="Ocean horizon"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 px-6 md:px-8 overflow-y-auto">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-3 font-semibold text-xl mb-10">
            <BrandMark size="md" />
            AKU
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Buat akunmu</h1>
          <p className="text-muted-foreground mt-2 mb-8 text-base">Mulai praktik harian yang lembut.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Nama lengkap</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Alex Morgan"
                className="h-12 text-base"
                value={form.name}
                onChange={updateField("name")}
                autoComplete="name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="h-12 text-base"
                value={form.email}
                onChange={updateField("email")}
                autoComplete="email"
                required
              />
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
                  value={form.password}
                  onChange={updateField("password")}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm font-medium">Konfirmasi password</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 text-base pr-10"
                  value={form.confirm}
                  onChange={updateField("confirm")}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirm ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password"}
                >
                  {showConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 font-medium text-base mt-6" disabled={isPending}>
              {isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-6">
            Sudah punya akun? <Link to="/login" className="text-foreground font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
