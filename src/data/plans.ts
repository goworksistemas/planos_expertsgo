export type PlanId = 'starter' | 'plus' | 'pro'

export interface Plan {
  id: PlanId
  name: string
  price: number
  accent: 'teal' | 'blue' | 'yellow' | 'purple'
  popular?: boolean
  roomsPerMonth: { min: number; max: number }
  features: string[]
}

export type RoomSizeId = 'pp' | 'p' | 'g' | 'gg'

export interface RoomSize {
  id: RoomSizeId
  label: string
  capacity: number
  description: string
  /** Valor por hora para assinantes (cliente interno). */
  internalRate: number
  /** Valor por hora para avulso, sem assinatura (cliente externo). */
  externalRate: number
}

// Câmbio GoCash 1:1 — cada R$ 1 da assinatura vira G$ 1. Sem bônus.
export const GOCASH_RATE = 1

export const ROOM_SIZES: RoomSize[] = [
  { id: 'pp', label: 'Sala PP', capacity: 2, description: 'Até 2 pessoas · sem TV', internalRate: 25, externalRate: 40 },
  { id: 'p', label: 'Sala P', capacity: 5, description: 'Até 5 pessoas · TV e ar', internalRate: 60, externalRate: 80 },
  { id: 'g', label: 'Sala G', capacity: 8, description: 'Até 8 pessoas · TV e ar', internalRate: 60, externalRate: 80 },
  { id: 'gg', label: 'Sala GG', capacity: 14, description: 'Até 14 pessoas · TV 50" e ar', internalRate: 100, externalRate: 150 },
]

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 60,
    accent: 'blue',
    roomsPerMonth: { min: 1, max: 2 },
    features: [
      'Câmbio GoCash 1:1 (R$ 1 = G$ 1)',
      'Tarifa de assinante em todas as salas',
      'Abertura de chamados',
      'Suporte por e-mail',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 150,
    accent: 'teal',
    popular: true,
    roomsPerMonth: { min: 3, max: 6 },
    features: [
      'Tudo do Starter',
      'Promoções com IA',
      'Prioridade na reserva',
      'Relatório de uso mensal',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 300,
    accent: 'purple',
    roomsPerMonth: { min: 7, max: 99 },
    features: [
      'Tudo do Plus',
      'Sala dedicada em horários fixos',
      'Integrações sociais (em breve)',
      'Gerente de conta',
    ],
  },
]

export function getPlanById(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id)
  if (!plan) throw new Error(`Plano não encontrado: ${id}`)
  return plan
}

export function getRoomSizeById(id: RoomSizeId): RoomSize {
  const size = ROOM_SIZES.find((s) => s.id === id)
  if (!size) throw new Error(`Tamanho de sala não encontrado: ${id}`)
  return size
}

export function recommendPlan(reservationsPerMonth: number): Plan {
  if (reservationsPerMonth <= 2) return getPlanById('starter')
  if (reservationsPerMonth <= 6) return getPlanById('plus')
  return getPlanById('pro')
}

export function reservationCost(ratePerHour: number, hours: number, days: number) {
  return ratePerHour * hours * days
}
