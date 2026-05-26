import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Coins, Plus, ShoppingCart } from 'lucide-react'
import {
  MOCK_MOVEMENTS,
  MOCK_WALLET,
  filterMovementsByPeriod,
  formatGoCash,
  type PeriodFilter,
} from '@/data/subscriber'
import { MovementsTable } from '@/components/wallet/MovementsTable'
import { UsageChart } from '@/components/wallet/UsageChart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const PERIOD_LABELS: Record<PeriodFilter, string> = {
  '7d': 'Últimos 7 dias',
  '30d': 'Últimos 30 dias',
  '90d': 'Últimos 90 dias',
  all: 'Todo o período',
}

export function WalletPage() {
  const [period, setPeriod] = useState<PeriodFilter>('30d')
  const [showBuyModal, setShowBuyModal] = useState(false)

  const filteredMovements = useMemo(
    () => filterMovementsByPeriod(MOCK_MOVEMENTS, period),
    [period],
  )

  const credits = filteredMovements
    .filter((m) => m.type === 'credit')
    .reduce((s, m) => s + m.amount, 0)
  const debits = filteredMovements
    .filter((m) => m.type === 'debit')
    .reduce((s, m) => s + m.amount, 0)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link
        to="/painel"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao painel
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Carteira GoCash
          </p>
          <h2 className="text-2xl font-bold text-foreground">Seu saldo</h2>
        </div>
        <Button onClick={() => setShowBuyModal(true)}>
          <Plus className="h-4 w-4" />
          Comprar GoCash extra
        </Button>
      </div>

      <Card className="relative overflow-hidden border-primary/30">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
        <CardContent className="py-10 pl-8 text-center sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Coins className="h-9 w-9" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Saldo disponível
              </p>
              <p className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
                {formatGoCash(MOCK_WALLET.balance)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Próxima recarga: {formatGoCash(MOCK_WALLET.nextRecharge.amount)} em{' '}
                {new Date(MOCK_WALLET.nextRecharge.date + 'T12:00:00').toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base">Histórico de movimentações</CardTitle>
                <p className="text-sm text-muted-foreground">Créditos e débitos</p>
              </div>
              <Select value={period} onValueChange={(v) => setPeriod(v as PeriodFilter)}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(PERIOD_LABELS) as PeriodFilter[]).map((key) => (
                    <SelectItem key={key} value={key}>
                      {PERIOD_LABELS[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-6 text-sm">
                <span className="text-primary">
                  +{formatGoCash(credits)} <span className="text-muted-foreground">entradas</span>
                </span>
                <span className="text-red-600">
                  −{formatGoCash(debits)} <span className="text-muted-foreground">saídas</span>
                </span>
              </div>
              <MovementsTable movements={filteredMovements} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <UsageChart />
        </div>
      </div>

      {showBuyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="buy-gocash-title"
        >
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle id="buy-gocash-title" className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Comprar GoCash extra
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Compra avulsa quando o saldo acabar. Valores mockados — sem cobrança real.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {[50, 100, 200].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-border p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
                  onClick={() => setShowBuyModal(false)}
                >
                  <span className="font-medium">{formatGoCash(amount)}</span>
                  <span className="text-sm text-muted-foreground">+ bônus 10% (demo)</span>
                </button>
              ))}
              <Button variant="secondary" className="w-full" onClick={() => setShowBuyModal(false)}>
                Cancelar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
