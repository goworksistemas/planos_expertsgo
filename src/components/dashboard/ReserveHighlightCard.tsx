import { Link } from 'react-router-dom'
import { ArrowRight, DoorOpen } from 'lucide-react'
import { formatGoCash } from '@/data/subscriber'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ReserveHighlightCardProps {
  balance: number
}

export function ReserveHighlightCard({ balance }: ReserveHighlightCardProps) {
  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-card to-sky-50/50 shadow-sm">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <DoorOpen className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Ação rápida
            </p>
            <h2 className="text-xl font-bold text-foreground">Reservar sala agora</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Saldo disponível:{' '}
              <strong className="text-primary">{formatGoCash(balance)}</strong>
            </p>
          </div>
        </div>
        <Button size="lg" className="shrink-0" asChild>
          <Link to="/carteira">
            Escolher sala
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
