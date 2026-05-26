import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react'
import type { GoCashMovement } from '@/data/subscriber'
import { formatDateTime, formatGoCash } from '@/data/subscriber'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface RecentMovementsProps {
  movements: GoCashMovement[]
  limit?: number
}

export function RecentMovements({ movements, limit = 5 }: RecentMovementsProps) {
  const items = movements.slice(0, limit)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Wallet className="h-4 w-4 text-primary" />
        <CardTitle className="text-base">Movimentações GoCash</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5"
          >
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                m.type === 'credit' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-400',
              )}
            >
              {m.type === 'credit' ? (
                <ArrowDownLeft className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{m.description}</p>
              <p className="text-xs text-muted-foreground">{formatDateTime(m.date)}</p>
            </div>
            <p
              className={cn(
                'shrink-0 text-sm font-semibold',
                m.type === 'credit' ? 'text-primary' : 'text-red-400',
              )}
            >
              {m.type === 'credit' ? '+' : '−'}
              {formatGoCash(m.amount)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
