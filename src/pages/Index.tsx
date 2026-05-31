import { Link } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
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
            Sadari emosimu.<br />
            <span className="text-primary">Hidup dengan penuh makna.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            MoodMate adalah pendamping harian yang lembut — pantau suasana hati, menulis tanpa batas, dan menemukan pola emosimu.  
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/register">
              <Button size="lg" className="px-8">Mulai Melacak</Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="px-8">Pelajari lebih lanjut</Button>
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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Jalan lembut menuju kesadaran diri  </h2>
          <p className="text-muted-foreground mt-4 text-lg">Segala yang kamu butuhkan, tanpa hal yang tidak perlu.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
          {[
            { icon: NotebookPen, title: "Check-in harian", desc: "Ritual singkat untuk menangkap perasaanmu yang sebenarnya setiap hari." },
            { icon: Brain, title: "Deteksi emosi AI", desc: "Wawasan tenang yang membaca di antara baris tulisan jurnalmu." },
            { icon: LineChart, title: "Insight mingguan", desc: "Grafik jelas dan refleksi yang hadir setiap hari Minggu." },
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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Cara kerjanya</h2>
          <p className="text-muted-foreground mt-4 text-lg">Tiga langkah kecil. Beberapa menit tenang setiap hari.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", title: "Check in", desc: "Pilih suasana hati yang sesuai. Tulis satu kalimat — atau satu halaman." },
            { n: "02", title: "Perhatikan pola", desc: "Wawasan tenang yang mengungkap apa yang membentuk hari-harimu." },
            { n: "03", title: "Rawat dirimu", desc: "Saran-saran lembut dan latihan pernapasan, ketika kamu membutuhkannya." },
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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Beberapa kata lembut</h2>
          <p className="text-muted-foreground mt-4 text-lg">Dari orang-orang yang membangun praktik harian.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "MoodMate telah menjadi ritual pagi saya. Wawasannya tenang namun tepat.", n: "Rafi N.", r: "AI Engineer" },
            { q: "Rasanya bukan seperti aplikasi, melainkan seperti teman yang penuh perhatian dan mendengarkan dengan saksama.", n: "Nanda D.", r: "Data Science" },
            { q: "Akhirnya saya memahami ritme minggu-minggu saya. Halus, tidak pernah berlebihan.", n: "Tasya.", r: "Data Science" },
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
            Mulai hubungan yang lebih baik dengan hari-harimu.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-lg mx-auto">
            Gratis untuk dimulai. Tanpa gangguan. Hanya ruang kecil dan stabil untukmu.
          </p>
          <Link to="/register" className="inline-block mt-8">
            <Button size="lg" className="px-8">Daftar Gratis!</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Leaf className="w-4 h-4 text-primary" strokeWidth={1.75} /> MoodMate
          </div>
          <p>© 2026 MoodMate. Dibuat dengan cinta.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
