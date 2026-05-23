import type { FormEvent } from 'react'

export default function LoginPage() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 font-inter">
            <div className="mx-auto min-h-screen px-6 py-8 sm:px-8 lg:px-12">
                <div className="grid min-h-[calc(100vh-3.5rem)] overflow-hidden rounded-4xl bg-white shadow-[0_40px_120px_rgba(15,23,42,0.08)] lg:grid-cols-[1.4fr_1fr]">
                    <section className="relative hidden overflow-hidden rounded-l-4xl bg-cover bg-center lg:block bg-[url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80')]">

                    </section>

                    <section className="flex items-center justify-center p-8 sm:p-10">
                        <div className="w-full max-w-md">
                            <div className="mb-8 inline-flex items-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.16669 16.6667C7.70341 16.6711 6.2919 16.1254 5.21212 15.1379C4.13234 14.1503 3.46316 12.793 3.3373 11.3351C3.21144 9.87724 3.6381 8.42532 4.53265 7.2673C5.4272 6.10929 6.7243 5.32977 8.16669 5.08335C12.9167 4.16669 14.1667 3.73335 15.8334 1.66669C16.6667 3.33335 17.5 5.15002 17.5 8.33335C17.5 12.9167 13.5167 16.6667 9.16669 16.6667Z" stroke="#356E59" stroke-width="1.45833" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1.66675 17.5C1.66675 15 3.20841 13.0333 5.90008 12.5C7.91675 12.1 10.0001 10.8333 10.8334 10" stroke="#356E59" stroke-width="1.45833" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <span className="text-md font-semibold text-slate-900">
                                    MoodMate
                                </span>
                            </div>
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                                Welcome back
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Sign in to continue your practice.
                            </p>

                            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                                <label className="block text-sm font-medium text-slate-700">
                                    Email
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                        required
                                    />
                                </label>
                                <label className="block text-sm font-medium text-slate-700">
                                    Password
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                        required
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                >
                                    Sign in
                                </button>
                            </form>

                            <p className="mt-6 text-sm text-slate-600">
                                Don&apos;t have an account?{' '}
                                <a href="#" className="font-semibold text-slate-900 transition hover:text-emerald-700">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}
