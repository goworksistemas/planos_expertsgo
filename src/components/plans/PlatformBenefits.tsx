import { Briefcase, Camera, Globe, Headset, LayoutGrid, Sparkles, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const BENEFITS = [
  {
    icon: Tag,
    title: 'Tarifa de assinante',
    description: 'Reserve qualquer sala com a taxa interna, sempre mais barata que o avulso.',
  },
  {
    icon: Headset,
    title: 'Abertura de chamados',
    description: 'Suporte direto pela plataforma para qualquer necessidade na sua unidade.',
  },
  {
    icon: Sparkles,
    title: 'Promoções com IA',
    description: 'Crie campanhas e divulgações da sua empresa com ajuda de inteligência artificial.',
  },
  {
    icon: LayoutGrid,
    title: 'Plataforma completa',
    description: 'Contrato ativo libera acesso a toda a plataforma NetworkGo, sem módulos extras.',
  },
]

const INTEGRATIONS = [
  { icon: Briefcase, label: 'LinkedIn' },
  { icon: Camera, label: 'Instagram' },
  { icon: Globe, label: 'WordPress' },
]

export function PlatformBenefits() {
  return (
    <section>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">Mais que créditos: a plataforma inteira</h2>
        <p className="mt-1 text-muted-foreground">
          Com contrato ativo, você desbloqueia tudo o que a NetworkGo oferece.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="warning">Em breve</Badge>
              <h3 className="font-semibold text-foreground">Promoções automáticas com IA</h3>
            </div>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Integração com suas redes para publicar promoções criadas por IA de forma automática,
              com cronograma e prompt predefinido.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {INTEGRATIONS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground"
                title={label}
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
