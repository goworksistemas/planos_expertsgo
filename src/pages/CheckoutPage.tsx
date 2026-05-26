import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  Sparkles,
} from 'lucide-react'
import { getPlanById, PLANS, type PlanId } from '@/data/plans'
import { formatCurrency, cn } from '@/lib/utils'
import { AccentBar } from '@/components/plans/AccentBar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

function isValidPlanId(value: string | null): value is PlanId {
  return value === 'starter' || value === 'plus' || value === 'pro'
}

export function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const paramPlan = searchParams.get('plano')
  const initialPlanId = isValidPlanId(paramPlan) ? paramPlan : 'plus'
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(initialPlanId)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card'>('card')
  const [form, setForm] = useState({
    name: '',
    email: '',
    cnpj: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  })

  const plan = getPlanById(selectedPlanId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) return
    navigate(`/sucesso?plano=${selectedPlanId}&email=${encodeURIComponent(form.email)}`)
  }

  const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar aos planos
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Checkout de assinatura</h1>
        <p className="mt-1 text-muted-foreground">
          Confirme seu plano e cadastre-se em poucos passos.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            {/* Seleção de plano */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Plano selecionado</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlanId(p.id)}
                    className={cn(
                      'rounded-lg border p-4 text-left transition-all',
                      selectedPlanId === p.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                        : 'border-border bg-muted/20 hover:border-primary/40',
                    )}
                  >
                    <p className="font-semibold text-foreground">{p.name}</p>
                    <p className="text-lg font-bold text-primary">{formatCurrency(p.price)}</p>
                    <p className="text-xs text-muted-foreground">/mês</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Cadastro */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Seus dados</CardTitle>
                <p className="text-sm text-muted-foreground">Cadastro simplificado</p>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Maria Silva"
                    value={form.name}
                    onChange={updateField('name')}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="maria@empresa.com"
                    value={form.email}
                    onChange={updateField('email')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    required
                    placeholder="(11) 99999-9999"
                    value={form.phone}
                    onChange={updateField('phone')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0001-00"
                    value={form.cnpj}
                    onChange={updateField('cnpj')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Método de pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border p-4 text-left',
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5'
                      : 'border-border',
                  )}
                >
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Cartão recorrente</p>
                    <p className="text-xs text-muted-foreground">
                      Cobrança automática todo mês
                    </p>
                  </div>
                  {paymentMethod === 'card' && <Check className="ml-auto h-5 w-5 text-primary" />}
                </button>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cardNumber">Número do cartão *</Label>
                    <Input
                      id="cardNumber"
                      required
                      placeholder="0000 0000 0000 0000"
                      value={form.cardNumber}
                      onChange={updateField('cardNumber')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Validade *</Label>
                    <Input
                      id="cardExpiry"
                      required
                      placeholder="MM/AA"
                      value={form.cardExpiry}
                      onChange={updateField('cardExpiry')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV *</Label>
                    <Input
                      id="cardCvv"
                      required
                      placeholder="123"
                      value={form.cardCvv}
                      onChange={updateField('cardCvv')}
                    />
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Pagamento simulado — sem cobrança real nesta demonstração.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Resumo lateral */}
          <div className="lg:col-span-2">
            <Card className="relative sticky top-24 overflow-hidden">
              <AccentBar accent={plan.accent} />
              <CardHeader className="pl-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Resumo do plano
                </p>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge>
                      <Sparkles className="h-3 w-3" />
                      Popular
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pl-7">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assinatura mensal</span>
                    <span className="font-medium">{formatCurrency(plan.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Crédito GoCash</span>
                    <span className="font-medium text-primary">
                      {formatCurrency(plan.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Câmbio</span>
                    <span className="font-medium text-emerald-600">1:1</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total hoje</span>
                  <span className="text-primary">{formatCurrency(plan.price)}</span>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 p-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(v) => setAcceptedTerms(v === true)}
                  />
                  <Label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground">
                    Li e aceito os{' '}
                    <span className="text-primary underline">termos de uso</span> e a{' '}
                    <span className="text-primary underline">política de privacidade</span> da
                    NetworkGo.
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!acceptedTerms}
                >
                  Confirmar assinatura
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
