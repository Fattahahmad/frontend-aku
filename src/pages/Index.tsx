import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, NotebookPen, Brain, LineChart, Menu, X, Quote } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-2.5 font-semibold text-lg tracking-tight">
            <Leaf className="w-5 h-5 text-primary" strokeWidth={1.75} />
            MoodMate
          </Link>
          <div className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#testimonials" className="hover:text-foreground transition">Stories</a>
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
              <Link to="/register"><Button size="sm">Sign up</Button></Link>
            </div>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X strokeWidth={1.75} /> : <Menu strokeWidth={1.75} />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden border-t border-border px-6 py-5 flex flex-col gap-4 text-sm">
            <a href="#features" onClick={() => setOpen(false)} className="text-muted-foreground">Features</a>
            <a href="#how" onClick={() => setOpen(false)} className="text-muted-foreground">How it works</a>
            <a href="#testimonials" onClick={() => setOpen(false)} className="text-muted-foreground">Stories</a>
            <Link to="/login"><Button variant="outline" className="w-full">Log in</Button></Link>
            <Link to="/register"><Button className="w-full">Sign up</Button></Link>
          </div>
        )}
      </header>

      <section className="container mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-medium">
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
            Understand your emotions.<br />
            <span className="text-primary">Live more intentionally.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            MoodMate is a quiet daily companion — track moods, write freely, and uncover gentle patterns in how you feel.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/register">
              <Button size="lg" className="px-8">Start tracking</Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="px-8">Learn more</Button>
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=80"
            alt="Calm forest landscape"
            className="w-full aspect-[4/5] object-cover rounded-md"
            loading="lazy"
          />
        </div>
      </section>

      <section id="features" className="container mx-auto px-6 py-24 border-t border-border">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">A gentle path to self-awareness</h2>
          <p className="text-muted-foreground mt-4 text-lg">Everything you need, nothing you don't.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
          {[
            { icon: NotebookPen, title: "Daily check-ins", desc: "A short ritual to capture how you truly feel each day." },
            { icon: Brain, title: "AI emotion detection", desc: "Quiet insights that read between the lines of your journal." },
            { icon: LineChart, title: "Weekly insights", desc: "Clear charts and reflections delivered every Sunday." },
          ].map((f, i) => (
            <div key={i} className="bg-card p-10">
              <f.icon className="w-6 h-6 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="font-medium text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="container mx-auto px-6 py-24 border-t border-border">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">How it works</h2>
          <p className="text-muted-foreground mt-4 text-lg">Three small steps. A few quiet minutes a day.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", title: "Check in", desc: "Pick a mood that fits. Write a sentence — or a page." },
            { n: "02", title: "Notice patterns", desc: "Quiet weekly insights reveal what shapes your days." },
            { n: "03", title: "Care for yourself", desc: "Gentle suggestions and breathing practices, when you need them." },
          ].map((s) => (
            <div key={s.n} className="space-y-4">
              <p className="text-xs font-medium text-primary tracking-widest">{s.n}</p>
              <h3 className="text-xl font-medium">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="container mx-auto px-6 py-24 border-t border-border">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">A few quiet words</h2>
          <p className="text-muted-foreground mt-4 text-lg">From people building a daily practice.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "MoodMate has become my morning ritual. The insights are quietly accurate.", n: "Sophie L.", r: "Designer" },
            { q: "It feels less like an app and more like a thoughtful friend who listens carefully.", n: "Daniel R.", r: "Writer" },
            { q: "I finally understand the rhythm of my weeks. Subtle, never overwhelming.", n: "Mira K.", r: "Therapist" },
          ].map((t, i) => (
            <figure key={i} className="border border-border bg-card rounded-md p-8">
              <Quote className="w-5 h-5 text-primary mb-5" strokeWidth={1.5} />
              <blockquote className="text-foreground leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium">{t.n}</span>
                <span className="text-muted-foreground"> · {t.r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="bg-primary-soft border border-border rounded-md px-8 md:px-16 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl mx-auto">
            Begin a kinder relationship with your days.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-lg mx-auto">
            Free to start. No noise. Just a small, steady space for you.
          </p>
          <Link to="/register" className="inline-block mt-8">
            <Button size="lg" className="px-8">Sign up free</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Leaf className="w-4 h-4 text-primary" strokeWidth={1.75} /> MoodMate
          </div>
          <p>© 2026 MoodMate. Made with care.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
