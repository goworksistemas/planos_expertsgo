import { Calendar } from 'lucide-react'
import type { Reservation } from '@/data/subscriber'
import { formatDateTime, formatGoCash } from '@/data/subscriber'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const statusVariant: Record<Reservation['status'], 'success' | 'secondary' | 'outline'> = {
  confirmada: 'secondary',
  concluida: 'success',
  cancelada: 'outline',
}

const statusLabel: Record<Reservation['status'], string> = {
  confirmada: 'Confirmada',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
}

interface RecentReservationsProps {
  reservations: Reservation[]
  limit?: number
}

export function RecentReservations({ reservations, limit = 4 }: RecentReservationsProps) {
  const items = reservations.slice(0, limit)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Reservas recentes</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma reserva ainda.</p>
        ) : (
          items.map((r) => (
            <div
              key={r.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-border bg-muted/20 p-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground">{r.room}</p>
                <p className="text-xs text-muted-foreground">
                  {r.unit} · {formatDateTime(r.date)}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p
                  className={cn(
                    'text-sm font-semibold',
                    r.status === 'cancelada' ? 'text-muted-foreground line-through' : 'text-foreground',
                  )}
                >
                  {formatGoCash(r.amount)}
                </p>
                <Badge variant={statusVariant[r.status]} className="mt-1">
                  {statusLabel[r.status]}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
