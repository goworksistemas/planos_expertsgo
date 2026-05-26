import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Coins, Home } from 'lucide-react'
import { getPlanById, type PlanId } from '@/data/plans'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function isValidPlanId(value: string | null): value is PlanId {
  return value === 'starter' || value === 'plus' || value === 'pro'
}

export function SuccessPage() {
  const [searchParams] = useSearchParams()
  const rawPlan = searchParams.get('plano')
  const planId: PlanId = isValidPlanId(rawPlan) ? rawPlan : 'plus'
  const email = searchParams.get('email') ?? ''
  const plan = getPlanById(planId)

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-foreground">Assinatura confirmada!</h1>
      <p className="mt-2 text-muted-foreground">
        Bem-vindo ao NetworkGo. Seu plano <strong className="text-foreground">{plan.name}</strong>{' '}
        está ativo.
      </p>

      <Card className="mt-8 w-full text-left">
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-4">
            <Coins className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Crédito GoCash liberado
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(plan.price)}
              </p>
            </div>
          </div>
          {email && (
            <p className="text-sm text-muted-foreground">
              Enviamos a confirmação para <strong className="text-foreground">{email}</strong>
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Cobrança mensal de {formatCurrency(plan.price)} no cartão cadastrado (simulação).
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link to="/painel">Ir para meu painel</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link to="/">
            <Home className="h-4 w-4" />
            Ver planos
          </Link>
        </Button>
      </div>
    </div>
  )
}
