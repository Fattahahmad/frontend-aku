# MoodMate

Aplikasi pelacakan mood harian dengan wawasan AI. MoodMate membantumu memahami pola emosi melalui check-in singkat sehari-hari.

## Fitur Utama

- **Check-in harian**: Catat mood dan jurnal dalam 30 detik
- **Kalender mood**: Lihat riwayat dengan visualisasi tanggal aktif
- **Insight mingguan**: Analisis tren mood dan distribusi emosi
- **Latihan pernapasan**: Panduan pernapasan untuk ketenangan mental
- **AI suggestion**: Saran personal berdasarkan jurnal
- **Multi-bahasa**: Antarmuka penuh dalam Bahasa Indonesia

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: TanStack Query
- **UI Components**: Radix UI + Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Calendar**: React Day Picker
- **Icons**: Lucide React

## Instalasi

### Prerequisites
- Node.js 18+ 
- npm 9+

### Langkah-langkah

```bash
# Clone repository
git clone <repo-url>
cd frontend-moodmate

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### Scripts

| Perintah | Deskripsi |
|----------|-----------|
| `npm run dev` | Jalankan development server (localhost:5173) |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview build production |
| `npm run lint` | Jalankan ESLint |

## Environment Variables

Buat file `.env` di root:

```env
VITE_API_URL=https://api-moodmate.vercel.app/api/v1
```

## Struktur Folder

```
src/
├── api/                 # API client functions
│   ├── client.ts       # Axios instance
│   ├── auth.api.ts     # Auth endpoints
│   ├── logs.api.ts     # Logs CRUD
│   ├── user.api.ts     # User endpoints
│   └── analytics.api.ts # Insights endpoints
├── components/         # Reusable components
│   ├── ui/            # Design system components
│   └── ProtectedRoute.tsx
├── hooks/             # Custom hooks
│   └── api/           # API hooks
├── lib/               # Utilities & constants
│   ├── moods.ts       # Mood definitions
│   └── utils.ts       # Helper functions
├── pages/             # Route components
│   ├── dashboard/     # Protected pages
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Index.tsx
└── types/             # Type definitions
```

## Deployment

Deploy ke Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Pastikan environment variable `VITE_API_URL` sudah diset di Vercel dashboard.

---

## Developer Documentation

### API Layer

#### `api/client.ts`
```typescript
// Axios instance dengan interceptor auth
export default apiClient

// Headers otomatis ditambahkan JWT dari localStorage
// Content-Type: multipart/form-data untuk FormData
```

#### `api/logs.api.ts`

| Function | Method | Endpoint | Deskripsi |
|----------|--------|----------|-----------|
| `getSummary()` | GET | `/dashboard/summary` | Ringkasan dashboard (total check-in, rata-rata mood, streak) |
| `getCalendar(month, year)` | GET | `/logs/calendar` | Data logs berdasarkan bulan/tahun |
| `getLogByDate(date)` | GET | `/logs/date/{date}` | Detail log spesifik |
| `createLog(payload)` | POST | `/logs` | Buat entri baru |
| `updateLog(id, payload)` | PUT | `/logs/{id}` | Update entri |
| `deleteLog(id)` | DELETE | `/logs/{id}` | Hapus entri |

#### `api/auth.api.ts`

| Function | Method | Endpoint | Payload |
|----------|--------|----------|---------|
| `loginFn({email, password})` | POST | `/auth/login` | email, password |
| `registerFn({name, email, password})` | POST | `/auth/register` | name, email, password |

#### `api/user.api.ts`

| Function | Method | Endpoint | Deskripsi |
|----------|--------|----------|-----------|
| `getUserProfile()` | GET | `/user/profile` | Data profil user |
| `updateUserProfile(formData)` | PUT | `/user/profile` | Update profil (FormData) |
| `logoutUser()` | POST | `/user/logout` | Logout |

#### `api/analytics.api.ts`

| Function | Method | Endpoint | Deskripsi |
|----------|--------|----------|-----------|
| `getWeeklyInsights()` | GET | `/insights/weekly` | Tren mood & distribusi emosi |

### Types

#### `types/api.ts`
```typescript
interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
}
```

#### `types/models.ts`
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}
```

### Hooks

#### `hooks/api/useLogs.ts`
```typescript
// Hooks React Query untuk logs
useSummary()           // Dashboard summary
useCalendar(month, year) // Data kalender
useLogByDate(date)       // Detail log by date
useCreateLog()          // Mutation create log
useUpdateLog()          // Mutation update log
useDeleteLog()          // Mutation delete log
useAllLogs(page, limit) // Pagination logs
useSuggestion()         // AI suggestion
```

#### `hooks/api/useAuth.ts`
```typescript
useLoginMutation()    // Login flow
useRegisterMutation() // Register flow
```

#### `hooks/api/useUser.ts`
```typescript
useUserProfile()        // Get profil
useUpdateUserProfile()  // Update profil
useLogout()             // Logout
```

### Utility Functions

#### `lib/moods.ts`
```typescript
// Mapping mood score ke icon + label
moods: Mood[]
// [0] Very sad (CloudLightning)
// [1] Sad (CloudRain)
// [2] Down (Cloud)
// [3] Neutral (CloudSun)
// [4] Happy (Sun)
// [5] Very happy (Sunrise)

getMood(id: number): Mood  // Ambil mood by ID
```

#### `lib/utils.ts`
```typescript
cn(...classes)  // Tailwind className merger
formatDate(date) // Format helper (via date-fns)
```

### Path Aliases

Gunakan `@moodmate/*` untuk import:

```typescript
import { Button } from "@moodmate/components/ui/button"
import { useSummary } from "@moodmate/hooks/api/useLogs"
import { moods } from "@moodmate/lib/moods"
```