import { cn } from '@/lib/utils'
import type { Plan } from '@/data/plans'

const accentColors: Record<Plan['accent'], string> = {
  teal: 'bg-primary',
  blue: 'bg-blue-500',
  yellow: 'bg-amber-400',
  purple: 'bg-purple-500',
}

export function AccentBar({ accent, className }: { accent: Plan['accent']; className?: string }) {
  return (
    <div
      className={cn('absolute left-0 top-0 h-full w-1 rounded-l-xl', accentColors[accent], className)}
    />
  )
}
