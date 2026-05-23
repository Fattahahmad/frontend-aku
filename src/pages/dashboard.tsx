import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'

export default function DashboardPage() {
    const navItems = [
        {
            label: 'Home',
            href: '#',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 10l7-7 7 7v7a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-7z" />
                    <path d="M8 12h4v4H8z" />
                </svg>
            ),
            active: true,
        },
        {
            label: 'Check-in',
            href: '#',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="10" cy="10" r="8" />
                    <path d="M7 10l2 2 4-4" />
                </svg>
            ),
        },
        {
            label: 'Insights',
            href: '#',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 17v-7M8 17v-10M13 17v-4M18 17V2" />
                    <rect x="2" y="16" width="16" height="1" />
                </svg>
            ),
        },
        {
            label: 'Settings',
            href: '#',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="10" cy="10" r="2.5" />
                    <path d="M10 2a1.5 1.5 0 0 1 1.5 1.5v1.5a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 10 2z" />
                    <path d="M15.3 4.7a1.5 1.5 0 0 1 2.12 0l1.06 1.06a1.5 1.5 0 0 1 0 2.12l-1.06 1.06a1.5 1.5 0 0 1-2.12-2.12z" />
                    <path d="M18 10a1.5 1.5 0 0 1 0 3h-1.5a1.5 1.5 0 0 1 0-3H18z" />
                    <path d="M15.3 15.3a1.5 1.5 0 0 1 0 2.12l-1.06 1.06a1.5 1.5 0 0 1-2.12-2.12z" />
                    <path d="M10 18a1.5 1.5 0 0 1-1.5-1.5v-1.5a1.5 1.5 0 0 1 3 0v1.5A1.5 1.5 0 0 1 10 18z" />
                    <path d="M4.7 15.3a1.5 1.5 0 0 1-2.12 0l-1.06-1.06a1.5 1.5 0 0 1 0-2.12l1.06-1.06a1.5 1.5 0 0 1 2.12 2.12z" />
                    <path d="M2 10a1.5 1.5 0 0 1 0-3h1.5a1.5 1.5 0 0 1 0 3H2z" />
                    <path d="M4.7 4.7a1.5 1.5 0 0 1 0-2.12l1.06-1.06a1.5 1.5 0 0 1 2.12 2.12z" />
                </svg>
            ),
        },
    ]

    return (
        <div className="min-h-screen bg-slate-50 font-inter">
            <Sidebar navItems={navItems} />

            <main className="ml-52 p-8">
                <div className="mb-8">
                    <p className="text-sm text-slate-500">Sunday, May 3</p>
                    <h1 className="mt-2 text-4xl font-bold text-slate-900">Good morning, Alex.</h1>
                    <p className="mt-2 text-slate-600">A quiet snapshot of your week.</p>
                </div>

                <div className="mb-12 grid grid-cols-3 gap-6">
                    <StatCard
                        icon={
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="4" width="4" height="12" rx="1" />
                                <rect x="8" y="2" width="4" height="14" rx="1" />
                                <rect x="14" y="6" width="4" height="10" rx="1" />
                            </svg>
                        }
                        label="Total Check-ins"
                        value={42}
                    />
                    <StatCard
                        icon={
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="10" cy="10" r="8" />
                                <path d="M10 6v4l3 2" />
                            </svg>
                        }
                        label="Average Mood"
                        value="Content"
                    />
                    <StatCard
                        icon={
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M10 2l2.39 7.26H20l-6.21 4.51 2.39 7.26L10 16.51 3.79 21l2.39-7.26L0 9.26h7.61L10 2z" />
                            </svg>
                        }
                        label="Current Streak"
                        value="5 days"
                    />
                </div>

                <div className="mb-12 grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <img
                            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
                            alt="Mountain landscape"
                            className="h-80 w-full rounded-2xl object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-8">
                        <h2 className="text-2xl font-semibold text-slate-900">How are you feeling today?</h2>
                        <p className="mt-2 text-slate-600">A short pause. Thirty seconds is enough.</p>
                        <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                            Start check-in
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M6 12l4-4-4-4" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="rounded-2xl border-l-4 border-l-emerald-600 bg-white p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-emerald-600">
                            <path d="M8 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        RECENT INSIGHT
                    </div>
                    <p className="text-slate-700">
                        Your mood has trended upward this week, with calm and contentment most prominent. Consider what felt restorative — and protect it.
                    </p>
                </div>
            </main>
        </div>
    )
}
