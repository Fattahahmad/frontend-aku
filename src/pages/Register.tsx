import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";
import { useRegisterMutation } from "@/hooks/api/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    mutate({ name, email, password }, {
      onSuccess: (res) => {
        if (res.status === "success") {
          toast.success(res.message || "Registration successful! You can now log in.");
          navigate("/login");
        }
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Registration failed. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1400&q=80"
          alt="Soft green leaves"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg mb-12">
            <Leaf className="w-5 h-5 text-primary" strokeWidth={1.75} />
            MoodMate
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-muted-foreground mt-2 mb-10">Begin a gentle daily practice.</p>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full name</Label>
              <Input id="name" name="name" type="text" placeholder="Alex Morgan" className="h-11" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" className="h-11" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" className="h-11" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm font-medium">Confirm password</Label>
              <Input id="confirm" name="confirm" type="password" placeholder="••••••••" className="h-11" required />
            </div>
            <Button type="submit" className="w-full h-11 font-medium" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-8">
            Already have an account? <Link to="/login" className="text-foreground font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;