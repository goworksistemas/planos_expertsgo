import { ArrowLeftRight } from 'lucide-react'

export function ExchangeBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-card to-sky-50 p-8 shadow-sm sm:p-10">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <ArrowLeftRight className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Câmbio justo
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
              R$ 1 vira G$ 1 em GoCash
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Sem bônus enrolado nem letra miúda: o valor da assinatura vira saldo na proporção{' '}
              <strong className="text-primary">1:1</strong>. E como assinante você reserva com a{' '}
              <strong className="text-primary">tarifa interna</strong>, bem mais barata que o avulso.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-primary/25 bg-white px-6 py-4 text-center shadow-sm">
          <p className="text-4xl font-bold text-primary">1:1</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">R$ = GoCash</p>
        </div>
      </div>
    </section>
  )
}
