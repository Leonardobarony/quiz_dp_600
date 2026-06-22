import Link from 'next/link'

interface ModeCardProps {
  href: string
  title: string
  description: string
  icon: string
  accentClass: string
}

export default function ModeCard({ href, title, description, icon, accentClass }: ModeCardProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col gap-3 rounded-xl border-2 p-5 bg-white hover:shadow-md transition-all group ${accentClass}`}
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 mt-0.5 leading-snug">{description}</p>
      </div>
    </Link>
  )
}
