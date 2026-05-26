import type { PlanId } from './plans'

export type MovementType = 'credit' | 'debit'
export type UsageCategory = 'sala' | 'cafe' | 'estacionamento' | 'outros'

export interface Subscriber {
  id: string
  name: string
  email: string
  planId: PlanId
  unit: string
}

export interface GoCashMovement {
  id: string
  date: string
  description: string
  type: MovementType
  amount: number
  category?: UsageCategory
}

export interface Reservation {
  id: string
  date: string
  room: string
  unit: string
  amount: number
  status: 'confirmada' | 'cancelada' | 'concluida'
}

export interface Suggestion {
  id: string
  type: 'event' | 'upgrade' | 'tip'
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export const MOCK_SUBSCRIBER: Subscriber = {
  id: 'sub-001',
  name: 'Maria Silva',
  email: 'maria@inventa.com.br',
  planId: 'starter',
  unit: 'Inventa Hub — São Paulo',
}

export const MOCK_WALLET = {
  balance: 142.5,
  nextRecharge: { date: '2026-06-01', amount: 72 },
  nextBilling: { date: '2026-06-01', amount: 60 },
  reservationsThisMonth: 4,
}

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    date: '2026-05-22T14:00:00',
    room: 'Sala Orion — 6 lugares',
    unit: 'Inventa Hub',
    amount: 45,
    status: 'concluida',
  },
  {
    id: 'res-2',
    date: '2026-05-18T10:00:00',
    room: 'Sala Vega — 4 lugares',
    unit: 'Inventa Hub',
    amount: 35,
    status: 'concluida',
  },
  {
    id: 'res-3',
    date: '2026-05-10T16:00:00',
    room: 'Sala Orion — 6 lugares',
    unit: 'Inventa Hub',
    amount: 45,
    status: 'cancelada',
  },
  {
    id: 'res-4',
    date: '2026-05-03T09:00:00',
    room: 'Coworking — estação 12',
    unit: 'Inventa Hub',
    amount: 25,
    status: 'concluida',
  },
]

export const MOCK_MOVEMENTS: GoCashMovement[] = [
  {
    id: 'mov-1',
    date: '2026-05-01T08:00:00',
    description: 'Recarga assinatura Starter (+20% bônus)',
    type: 'credit',
    amount: 72,
  },
  {
    id: 'mov-2',
    date: '2026-05-22T14:05:00',
    description: 'Reserva — Sala Orion',
    type: 'debit',
    amount: 45,
    category: 'sala',
  },
  {
    id: 'mov-3',
    date: '2026-05-18T10:02:00',
    description: 'Reserva — Sala Vega',
    type: 'debit',
    amount: 35,
    category: 'sala',
  },
  {
    id: 'mov-4',
    date: '2026-05-15T11:30:00',
    description: 'Café — copinha Inventa',
    type: 'debit',
    amount: 8,
    category: 'cafe',
  },
  {
    id: 'mov-5',
    date: '2026-05-10T16:01:00',
    description: 'Estorno — cancelamento Sala Orion',
    type: 'credit',
    amount: 45,
  },
  {
    id: 'mov-6',
    date: '2026-05-03T09:05:00',
    description: 'Reserva — Coworking estação 12',
    type: 'debit',
    amount: 25,
    category: 'sala',
  },
  {
    id: 'mov-7',
    date: '2026-04-28T07:00:00',
    description: 'Estacionamento — 2h',
    type: 'debit',
    amount: 12,
    category: 'estacionamento',
  },
  {
    id: 'mov-8',
    date: '2026-04-25T12:00:00',
    description: 'Compra avulsa GoCash',
    type: 'credit',
    amount: 50,
  },
  {
    id: 'mov-9',
    date: '2026-04-01T08:00:00',
    description: 'Recarga assinatura Starter (+20% bônus)',
    type: 'credit',
    amount: 72,
  },
  {
    id: 'mov-10',
    date: '2026-03-20T15:00:00',
    description: 'Serviço impressão',
    type: 'debit',
    amount: 6,
    category: 'outros',
  },
]

export const USAGE_BY_CATEGORY: { category: UsageCategory; label: string; amount: number; color: string }[] = [
  { category: 'sala', label: 'Sala de reunião', amount: 105, color: '#00DFB6' },
  { category: 'cafe', label: 'Café / copinha', amount: 32, color: '#3B82F6' },
  { category: 'estacionamento', label: 'Estacionamento', amount: 12, color: '#FBBF24' },
  { category: 'outros', label: 'Outros', amount: 6, color: '#A855F7' },
]

export const MOCK_SUGGESTIONS: Suggestion[] = [
  {
    id: 'sug-1',
    type: 'event',
    title: 'Próximo evento na sua unidade',
    description: 'Happy Hour Founders — Inventa Hub, 28/05 às 18h. Entrada gratuita para assinantes.',
    actionLabel: 'Ver detalhes',
  },
  {
    id: 'sug-2',
    type: 'upgrade',
    title: 'Que tal upgrade pro Plus?',
    description:
      'Você já fez 4 reservas este mês. No Plus você ganha R$ 180 em GoCash e prioridade na reserva.',
    actionLabel: 'Conhecer Plus',
    actionHref: '/checkout?plano=plus',
  },
  {
    id: 'sug-3',
    type: 'tip',
    title: 'Saldo baixo em breve',
    description: 'Com o ritmo atual, seu saldo pode acabar antes da próxima recarga. Considere comprar GoCash extra.',
    actionLabel: 'Comprar GoCash',
    actionHref: '/carteira',
  },
]

export type PeriodFilter = '7d' | '30d' | '90d' | 'all'

export function filterMovementsByPeriod(
  movements: GoCashMovement[],
  period: PeriodFilter,
): GoCashMovement[] {
  if (period === 'all') return movements
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return movements.filter((m) => new Date(m.date) >= cutoff)
}

export function formatGoCash(value: number) {
  return `G$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: periodYear(iso),
  })
}

function periodYear(iso: string) {
  const d = new Date(iso)
  return d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
