import {
  CalendarCheck,
  Coins,
  CreditCard,
  RefreshCw,
} from 'lucide-react'
import {
  MOCK_MOVEMENTS,
  MOCK_RESERVATIONS,
  MOCK_SUGGESTIONS,
  MOCK_WALLET,
  formatGoCash,
} from '@/data/subscriber'
import { formatCurrency } from '@/lib/utils'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { RecentMovements } from '@/components/dashboard/RecentMovements'
import { RecentReservations } from '@/components/dashboard/RecentReservations'
import { ReserveHighlightCard } from '@/components/dashboard/ReserveHighlightCard'
import { Suggestions } from '@/components/dashboard/Suggestions'
import { Button } from '@/components/ui/button'

function formatBillingDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
  })
}

export function SubscriberDashboardPage() {
  const { balance, nextRecharge, nextBilling, reservationsThisMonth } = MOCK_WALLET

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Meu painel</h2>
          <p className="text-sm text-muted-foreground">
            Visão geral da sua assinatura e uso do GoCash
          </p>
        </div>
        <Button variant="secondary" size="sm" className="w-fit">
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Saldo GoCash atual"
          value={formatGoCash(balance)}
          footer="Disponível para reservas"
          icon={Coins}
          accent="teal"
        />
        <KpiCard
          label="Próxima recarga"
          value={formatGoCash(nextRecharge.amount)}
          footer={formatBillingDate(nextRecharge.date)}
          icon={RefreshCw}
          accent="blue"
        />
        <KpiCard
          label="Próxima cobrança"
          value={formatCurrency(nextBilling.amount)}
          footer={formatBillingDate(nextBilling.date)}
          icon={CreditCard}
          accent="yellow"
        />
        <KpiCard
          label="Reservas no mês"
          value={String(reservationsThisMonth)}
          footer="Maio 2026"
          icon={CalendarCheck}
          accent="purple"
        />
      </div>

      <ReserveHighlightCard balance={balance} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentReservations reservations={MOCK_RESERVATIONS} />
        <RecentMovements movements={MOCK_MOVEMENTS} />
      </div>

      <Suggestions suggestions={MOCK_SUGGESTIONS} />
    </div>
  )
}
