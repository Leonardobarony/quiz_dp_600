import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export default function Card({ hover = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${hover ? 'hover:shadow-md hover:border-blue-300 transition-all cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
