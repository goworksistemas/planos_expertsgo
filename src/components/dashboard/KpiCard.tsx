import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

const accentBar: Record<string, string> = {
  teal: 'bg-primary',
  blue: 'bg-blue-500',
  yellow: 'bg-amber-400',
  purple: 'bg-purple-500',
}

interface KpiCardProps {
  label: string
  value: string
  footer?: string
  icon: LucideIcon
  accent?: keyof typeof accentBar
}

export function KpiCard({ label, value, footer, icon: Icon, accent = 'teal' }: KpiCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className={cn('absolute left-0 top-0 h-full w-1', accentBar[accent])} />
      <CardContent className="pl-6 pt-5 pb-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 truncate text-2xl font-bold text-foreground">{value}</p>
            {footer && <p className="mt-1 text-xs text-muted-foreground">{footer}</p>}
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
