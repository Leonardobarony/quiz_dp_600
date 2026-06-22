type Color = 'blue' | 'purple' | 'green' | 'yellow' | 'red' | 'slate'

interface BadgeProps {
  label: string
  color?: Color
  className?: string
}

const colorClasses: Record<Color, string> = {
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  slate: 'bg-slate-100 text-slate-700',
}

export default function Badge({ label, color = 'slate', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {label}
    </span>
  )
}
