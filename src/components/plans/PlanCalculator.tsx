import { useState } from 'react'
import { Calculator, TrendingDown, Users } from 'lucide-react'
import {
  ROOM_SIZES,
  getRoomSizeById,
  recommendPlan,
  reservationCost,
  type RoomSizeId,
} from '@/data/plans'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'

export function PlanCalculator() {
  const [sizeId, setSizeId] = useState<RoomSizeId>('g')
  const [hours, setHours] = useState(2)
  const [days, setDays] = useState(4)
  const navigate = useNavigate()

  const size = getRoomSizeById(sizeId)
  const internal = reservationCost(size.internalRate, hours, days)
  const external = reservationCost(size.externalRate, hours, days)
  const savings = Math.max(0, external - internal)
  const recommended = recommendPlan(days)

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
              Quanto você economiza reservando como assinante?
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Tamanho da sala */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Tamanho da sala</label>
          <Select value={sizeId} onValueChange={(v) => setSizeId(v as RoomSizeId)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha a sala" />
            </SelectTrigger>
            <SelectContent>
              {ROOM_SIZES.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label} · {s.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            Capacidade {size.capacity} pessoas · assinante {formatCurrency(size.internalRate)}/h ·
            avulso {formatCurrency(size.externalRate)}/h
          </p>
        </div>

        {/* Horas por dia */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Horas por dia</span>
            <span className="text-2xl font-bold text-foreground">
              {hours} {hours === 1 ? 'hora' : 'horas'}
            </span>
          </div>
          <Slider min={1} max={12} value={hours} onValueChange={setHours} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1h</span>
            <span>12h</span>
          </div>
        </div>

        {/* Dias por mês */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Dias por mês</span>
            <span className="text-2xl font-bold text-foreground">
              {days} {days === 1 ? 'dia' : 'dias'}
            </span>
          </div>
          <Slider min={1} max={22} value={days} onValueChange={setDays} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 dia</span>
            <span>22 dias</span>
          </div>
        </div>

        {/* Recomendação */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Recomendação
          </p>
          <p className="mt-2 text-lg text-foreground">
            Com <strong className="text-primary">{days} reservas/mês</strong>, o plano{' '}
            <strong>{recommended.name}</strong> é ideal para você.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="success">● {recommended.name}</Badge>
            <Badge variant="secondary">
              {formatCurrency(recommended.price)}/mês → {formatCurrency(recommended.price)} GoCash
              (1:1)
            </Badge>
          </div>
        </div>

        {/* Comparação avulso x assinante */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Avulso</p>
            <p className="mt-1 text-xl font-bold text-red-500 line-through decoration-red-300">
              {formatCurrency(external)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(size.externalRate)}/h × {hours}h × {days} dias
            </p>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Assinante</p>
            <p className="mt-1 text-xl font-bold text-primary">{formatCurrency(internal)}</p>
            {savings > 0 && (
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendingDown className="h-3 w-3" />
                Economia de {formatCurrency(savings)}/mês
              </p>
            )}
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={() => navigate(`/checkout?plano=${recommended.id}`)}
        >
          Assinar plano {recommended.name}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Tarifa de assinante (interna) vs. avulso (externa) · câmbio GoCash 1:1 · valores reais por
          tipo de sala
        </p>
      </CardContent>
    </Card>
  )
}
