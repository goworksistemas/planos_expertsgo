import { ArrowRight, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PLANS } from '@/data/plans'
import { ExchangeBanner } from '@/components/plans/ExchangeBanner'
import { PlatformBenefits } from '@/components/plans/PlatformBenefits'
import { PlanCalculator } from '@/components/plans/PlanCalculator'
import { PlanCard } from '@/components/plans/PlanCard'
import { PlansFaq } from '@/components/plans/PlansFaq'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function PlansLandingPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Hero */}
      <section className="text-center">
        <Badge variant="default" className="mb-4">
          <Zap className="h-3 w-3" />
          Assinatura NetworkGo
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Assine o NetworkGo e ganhe créditos pra usar nas nossas unidades
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Planos mensais que viram saldo GoCash na proporção 1:1. Reserve salas com a tarifa de
          assinante — mais barato que o avulso — e use toda a plataforma NetworkGo.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={() => navigate('/checkout?plano=plus')}>
            Começar agora
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="secondary" onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}>
            Ver planos
          </Button>
        </div>
      </section>

      {/* Câmbio 1:1 */}
      <section className="mt-16">
        <ExchangeBanner />
      </section>

      {/* Planos */}
      <section id="planos" className="mt-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Escolha seu plano</h2>
          <p className="mt-1 text-muted-foreground">
            Três opções para diferentes volumes de uso · valores mockados
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} highlighted={plan.popular} />
          ))}
        </div>
      </section>

      {/* Benefícios da plataforma */}
      <section className="mt-20">
        <PlatformBenefits />
      </section>

      {/* Calculadora + comparação */}
      <section className="mt-20">
        <PlanCalculator />
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <PlansFaq />
      </section>

      {/* CTA final */}
      <section className="mt-16 rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-foreground">Pronto para economizar?</h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Assine em poucos minutos. Sem login necessário nesta etapa.
        </p>
        <Button className="mt-6" size="lg" onClick={() => navigate('/checkout?plano=plus')}>
          Ir para o checkout
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </div>
  )
}
