import { useState } from 'react'
import { Calculator, TrendingDown } from 'lucide-react'
import { AVULSO_PRICE_PER_ROOM, avulsoCost, recommendPlan } from '@/data/plans'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { useNavigate } from 'react-router-dom'

export function PlanCalculator() {
  const [rooms, setRooms] = useState(4)
  const navigate = useNavigate()
  const recommended = recommendPlan(rooms)
  const avulso = avulsoCost(rooms)
  const planCost = recommended.price
  const savings = Math.max(0, avulso - planCost)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Calculadora interativa</CardTitle>
            <p className="text-sm text-muted-foreground">
              Quantas salas você reserva por mês?
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Reservas mensais</span>
            <span className="text-2xl font-bold text-foreground">
              {rooms} {rooms === 1 ? 'sala' : 'salas'}
            </span>
          </div>
          <Slider min={1} max={12} value={rooms} onValueChange={setRooms} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 sala</span>
            <span>12+ salas</span>
          </div>
        </div>

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Recomendação
          </p>
          <p className="mt-2 text-lg text-foreground">
            Com <strong className="text-primary">{rooms} reservas/mês</strong>, o plano{' '}
            <strong>{recommended.name}</strong> é ideal para você.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="success">● {recommended.name}</Badge>
            <Badge variant="secondary">
              {formatCurrency(recommended.price)}/mês → {formatCurrency(recommended.gocashCredit)}{' '}
              GoCash
            </Badge>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Avulso</p>
            <p className="mt-1 text-xl font-bold text-red-400 line-through decoration-red-400/50">
              {formatCurrency(avulso)}
            </p>
            <p className="text-xs text-muted-foreground">
              {rooms} × {formatCurrency(AVULSO_PRICE_PER_ROOM)}/reserva
            </p>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Com plano</p>
            <p className="mt-1 text-xl font-bold text-primary">{formatCurrency(planCost)}</p>
            {savings > 0 && (
              <p className="flex items-center gap-1 text-xs text-emerald-400">
                <TrendingDown className="h-3 w-3" />
                Economia de {formatCurrency(savings)}/mês
              </p>
            )}
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={() => navigate(`/checkout?plano=${recommended.id}`)}>
          Assinar plano {recommended.name}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Comparativo baseado em {formatCurrency(AVULSO_PRICE_PER_ROOM)} por reserva avulsa · valores
          mockados
        </p>
      </CardContent>
    </Card>
  )
}
