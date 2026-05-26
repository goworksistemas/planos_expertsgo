import { Coins } from 'lucide-react'
import { BONUS_PERCENT } from '@/data/plans'
import { formatCurrency } from '@/lib/utils'

export function ConversionBonus() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card to-purple-500/10 p-8 sm:p-10">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Coins className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Bônus de conversão
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
              {formatCurrency(150)} vira {formatCurrency(180)} em GoCash
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Todo valor da assinatura é convertido em créditos GoCash com{' '}
              <strong className="text-primary">{BONUS_PERCENT}% de bônus</strong> — use nas salas,
              coworkings e unidades da rede NetworkGo.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-primary/40 bg-background/60 px-6 py-4 text-center backdrop-blur-sm">
          <p className="text-4xl font-bold text-primary">+{BONUS_PERCENT}%</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">bônus GoCash</p>
        </div>
      </div>
    </section>
  )
}
