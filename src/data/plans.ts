export type PlanId = 'starter' | 'plus' | 'pro'

export interface Plan {
  id: PlanId
  name: string
  price: number
  gocashCredit: number
  bonusPercent: number
  accent: 'teal' | 'blue' | 'yellow' | 'purple'
  popular?: boolean
  roomsPerMonth: { min: number; max: number }
  features: string[]
}

export const BONUS_PERCENT = 20
export const AVULSO_PRICE_PER_ROOM = 80

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 60,
    gocashCredit: 72,
    bonusPercent: BONUS_PERCENT,
    accent: 'blue',
    roomsPerMonth: { min: 1, max: 2 },
    features: ['Créditos GoCash mensais', 'Reserva em qualquer unidade', 'Suporte por e-mail'],
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 150,
    gocashCredit: 180,
    bonusPercent: BONUS_PERCENT,
    accent: 'teal',
    popular: true,
    roomsPerMonth: { min: 3, max: 6 },
    features: [
      'Tudo do Starter',
      'Prioridade na reserva',
      'Relatório de uso mensal',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 300,
    gocashCredit: 360,
    bonusPercent: BONUS_PERCENT,
    accent: 'purple',
    roomsPerMonth: { min: 7, max: 99 },
    features: [
      'Tudo do Plus',
      'Sala dedicada em horários fixos',
      'Gerente de conta',
    ],
  },
]

export function getPlanById(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id)
  if (!plan) throw new Error(`Plano não encontrado: ${id}`)
  return plan
}

export function recommendPlan(roomsPerMonth: number): Plan {
  if (roomsPerMonth <= 2) return getPlanById('starter')
  if (roomsPerMonth <= 6) return getPlanById('plus')
  return getPlanById('pro')
}

export function avulsoCost(roomsPerMonth: number) {
  return roomsPerMonth * AVULSO_PRICE_PER_ROOM
}
