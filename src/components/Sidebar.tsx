import type { ReactNode } from 'react'

interface NavItem {
    icon: ReactNode
    label: string
    href: string
    active?: boolean
}

interface SidebarProps {
    navItems: NavItem[]
}

export default function Sidebar({ navItems }: SidebarProps) {
    return (
        <aside className="fixed left-0 top-0 h-screen w-52 border-r border-slate-200 bg-white p-6">
            <div className="mb-12 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16669 16.6667C7.70341 16.6711 6.2919 16.1254 5.21212 15.1379C4.13234 14.1503 3.46316 12.793 3.3373 11.3351C3.21144 9.87724 3.6381 8.42532 4.53265 7.2673C5.4272 6.10929 6.7243 5.32977 8.16669 5.08335C12.9167 4.16669 14.1667 3.73335 15.8334 1.66669C16.6667 3.33335 17.5 5.15002 17.5 8.33335C17.5 12.9167 13.5167 16.6667 9.16669 16.6667Z" />
                        <path d="M1.66675 17.5C1.66675 15 3.20841 13.0333 5.90008 12.5C7.91675 12.1 10.0001 10.8333 10.8334 10" />
                    </svg>
                </div>
                <span className="text-sm font-semibold text-slate-900">MoodMate</span>
            </div>

            <nav className="space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${item.active
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        <span className="w-5">{item.icon}</span>
                        {item.label}
                    </a>
                ))}
            </nav>
        </aside>
    )
}
