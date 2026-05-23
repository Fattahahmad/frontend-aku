import type { ReactNode } from 'react'

interface StatCardProps {
    icon: ReactNode
    label: string
    value: string | number
}

export default function StatCard({ icon, label, value }: StatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                {icon}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
    )
}
