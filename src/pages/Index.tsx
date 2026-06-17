import { Link } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
import { NotebookPen, Brain, LineChart, Menu, X, Quote } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@moodmate/components/BrandMark";

const Index = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-2.5 font-semibold text-lg tracking-tight">
            <BrandMark size="sm" />
            AKU
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
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
            Pahami emosimu.<br />
            <span className="text-primary">Bangun rutinitas yang lebih baik.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            AKU membantu kamu melacak mood, memahami pola emosi, melatih fokus, dan membangun kebiasaan baru dalam satu ruang yang tenang.
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
        <div className="relative mx-auto w-full max-w-md md:max-w-lg">
          <div className="absolute -inset-4 rounded-full bg-accent/40 blur-3xl" />
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
            alt="Ocean horizon"
            className="relative w-full aspect-[5/4] md:aspect-[4/3] object-cover rounded-md"
            loading="lazy"
          />
        </div>
      </section>

      <section id="features" className="container mx-auto px-6 py-24 border-t border-border">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Semua yang kamu butuhkan untuk mengenali diri</h2>
          <p className="text-muted-foreground mt-4 text-lg">Tracking mood, jurnal, insight, latihan napas, dan habit tracker dalam satu dashboard.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
          {[
            { icon: NotebookPen, title: "Check-in harian", desc: "Catat mood dan jurnal singkat untuk memahami kondisi emosimu setiap hari." },
            { icon: Brain, title: "Insight personal", desc: "Lihat pola emosi dan saran reflektif dari aktivitas yang kamu rekam." },
            { icon: LineChart, title: "Trend mingguan", desc: "Pantau dinamika mood dan kebiasaanmu dalam grafik yang mudah dibaca." },
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
          <p className="text-muted-foreground mt-4 text-lg">Tiga langkah kecil untuk membangun kesadaran diri setiap hari.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", title: "Check in", desc: "Pilih mood yang sesuai dan tulis catatan singkat tentang hari ini." },
            { n: "02", title: "Lihat pola", desc: "Dashboard membantu kamu membaca tren emosi dari waktu ke waktu." },
            { n: "03", title: "Bangun kebiasaan", desc: "Tambahkan habit, tandai progress, dan lihat konsistensimu." },
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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Dipakai untuk refleksi harian</h2>
          <p className="text-muted-foreground mt-4 text-lg">Dari pengguna yang membangun rutinitas lebih sadar dan konsisten.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "AKU membantu saya melihat pola emosi yang biasanya tidak saya sadari.", n: "Rafi N.", r: "AI Engineer" },
            { q: "Dashboard-nya simpel, tapi cukup lengkap untuk tracking harian.", n: "Nanda D.", r: "Data Science" },
            { q: "Fitur habit tracker membuat progress mingguan terasa lebih nyata.", n: "Tasya.", r: "Data Science" },
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
        <div className="relative overflow-hidden bg-primary-soft border border-border rounded-md px-8 md:px-16 py-16 md:py-20 text-center">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-accent/40 to-transparent" />
          <h2 className="relative text-3xl md:text-4xl font-semibold tracking-tight max-w-xl mx-auto">
            Mulai memahami pola emosimu dari hari ini.
          </h2>
          <p className="relative text-muted-foreground mt-4 text-lg max-w-lg mx-auto">
            Gratis untuk dimulai. Tanpa tekanan. Cukup ruang stabil untuk melacak, merefleksikan, dan berkembang.
          </p>
          <Link to="/register" className="inline-block mt-8 relative">
            <Button size="lg" className="px-8">Daftar Gratis!</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <BrandMark size="sm" /> AKU
          </div>
          <p>© 2026 AKU. Dibuat dengan cinta.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
