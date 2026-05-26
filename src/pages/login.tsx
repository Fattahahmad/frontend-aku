import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { FormEvent } from "react";

const Login = () => {
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/home");
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
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-2 mb-10">Sign in to continue your practice.</p>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="h-11" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="h-11" required />
            </div>
            <Button type="submit" className="w-full h-11 font-medium">Sign in</Button>
          </form>
          <p className="text-sm text-muted-foreground mt-8">
            Don't have an account? <Link to="/register" className="text-foreground font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;