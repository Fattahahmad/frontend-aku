import { useNavigate } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
import { Switch } from "@moodmate/components/ui/switch";
import { Label } from "@moodmate/components/ui/label";
import { LogOut, Pencil } from "lucide-react";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@moodmate/components/ui/dialog";
import { Input } from "@moodmate/components/ui/input";
import { Loader2 } from "lucide-react";
import { useUserProfile, useUpdateUserProfile, useLogout } from "@moodmate/hooks/api/useUser";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const Settings = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [name, setName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: profileData, isLoading: profileLoading } = useUserProfile();
  const { mutate: updateProfile, isPending: updatePending } = useUpdateUserProfile();
  const { mutate: logoutApi, isPending: logoutPending } = useLogout();

  const toggleDark = (v: boolean) => {
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
  };

  const handleLogout = () => {
    logoutApi(undefined, {
      onSuccess: () => {
        localStorage.removeItem("access_token");
        toast.success("Berhasil keluar!");
        navigate("/login");
      },
      onError: (error: unknown) => {
        console.error("Logout error:", error);
        localStorage.removeItem("access_token");
        toast.error("Gagal keluar, tapi anda akan di-redirect.");
        setTimeout(() => navigate("/login"), 1000);
      },
    });
  };

  const handleEditProfile = () => {
    setName(profileData?.data?.user?.name ?? "");
    setEditProfileOpen(true);
  };

  const handleSaveProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    
    if (fileInputRef.current?.files?.[0]) {
      formData.append("avatar", fileInputRef.current.files[0]);
    }

    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profil diperbarui!");
        setEditProfileOpen(false);
      },
      onError: (err: unknown) => {
        let errorMsg = "Gagal memperbarui profil";
        if (isAxiosError(err) && err.response?.data?.message) {
          errorMsg = err.response.data.message;
        }
        toast.error(errorMsg);
      },
    });
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground mt-3 text-lg">Personalisasi MoodMate milikmu.</p>
      </header>

      <section className="flex items-center gap-4 pb-8 border-b border-border">
        <img
          src={profileData?.data?.user?.avatar_url ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"}
          alt="Profil"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{profileLoading ? "..." : profileData?.data?.user?.name ?? "Pengguna"}</p>
          <p className="text-sm text-muted-foreground">{profileData?.data?.user?.email ?? ""}</p>
        </div>
      </section>

      <section className="divide-y divide-border border-b border-border">
        <div className="flex items-center justify-between py-5">
          <div>
            <Label htmlFor="profile" className="font-medium">Edit profil</Label>
            <p className="text-sm text-muted-foreground mt-1">Ubah nama dan foto profil.</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEditProfile}
            className="h-8 px-3 text-muted-foreground"
            disabled={profileLoading}
          >
            <Pencil className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Edit
          </Button>
        </div>
        <div className="flex items-center justify-between py-5">
          <div>
            <Label htmlFor="dark" className="font-medium">Mode gelap</Label>
            <p className="text-sm text-muted-foreground mt-1">Lebih mudah dilihat di malam hari.</p>
          </div>
          <Switch id="dark" checked={dark} onCheckedChange={toggleDark} />
        </div>
      </section>

      <Button
        variant="ghost"
        onClick={handleLogout}
        disabled={logoutPending}
        className="text-destructive hover:text-destructive hover:bg-destructive/5 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {logoutPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" strokeWidth={1.75} />}
        <LogOut className="w-4 h-4 mr-2" strokeWidth={1.75} /> {logoutPending ? "Keluar..." : "Keluar"}
      </Button>

      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="rounded-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit profil</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
              Ubah nama dan unggah foto profil baru.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Nama</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar" className="text-sm font-medium">Foto profil</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="h-11"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="h-10 px-5" onClick={() => setEditProfileOpen(false)} disabled={updatePending}>
                Batal
              </Button>
              <Button className="h-10 px-5" onClick={handleSaveProfile} disabled={updatePending}>
                {updatePending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {updatePending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
