import { Check, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Plan } from '@/data/plans'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { AccentBar } from './AccentBar'
import { cn } from '@/lib/utils'

interface PlanCardProps {
  plan: Plan
  highlighted?: boolean
}

export function PlanCard({ plan, highlighted }: PlanCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all hover:border-primary/40',
        highlighted && 'border-primary/50 ring-1 ring-primary/20',
      )}
    >
      <AccentBar accent={plan.accent} />
      <CardHeader className="pl-7">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Plano
            </p>
            <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
          </div>
          {plan.popular && (
            <Badge className="shrink-0">
              <Sparkles className="h-3 w-3" />
              Popular
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <span className="text-4xl font-bold text-foreground">{formatCurrency(plan.price)}</span>
          <span className="ml-1 text-sm text-muted-foreground">/mês</span>
        </div>
        <p className="mt-2 text-sm text-primary">
          Vira {formatCurrency(plan.price)} em GoCash · câmbio 1:1
        </p>
      </CardHeader>
      <CardContent className="pl-7">
        <ul className="space-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pl-7">
        <Button
          className="w-full"
          variant={plan.popular ? 'default' : 'secondary'}
          onClick={() => navigate(`/checkout?plano=${plan.id}`)}
        >
          Assinar {plan.name}
        </Button>
      </CardFooter>
    </Card>
  )
}
