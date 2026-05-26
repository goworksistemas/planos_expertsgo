import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ_ITEMS = [
  {
    q: 'O que é GoCash?',
    a: 'GoCash é o crédito interno da rede NetworkGo. Você usa para reservar salas, estações de coworking e serviços nas unidades parceiras.',
  },
  {
    q: 'Como funciona o bônus de 20%?',
    a: 'Ao assinar, o valor pago é convertido em créditos GoCash com 20% a mais. Ex.: R$ 150 de assinatura viram R$ 180 em saldo.',
  },
  {
    q: 'Posso cancelar a qualquer momento?',
    a: 'Sim. A assinatura é mensal e pode ser cancelada antes da próxima cobrança, sem multa (valores mockados nesta demonstração).',
  },
  {
    q: 'Preciso estar logado para assinar?',
    a: 'Não. Esta página é pública. No checkout você informa seus dados e confirma a assinatura.',
  },
  {
    q: 'CNPJ é obrigatório?',
    a: 'Não. O campo CNPJ é opcional — útil para empresas que desejam nota fiscal em nome da pessoa jurídica.',
  },
]

export function PlansFaq() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground">Perguntas frequentes</h2>
      <p className="mt-1 text-muted-foreground">Tire suas dúvidas antes de assinar.</p>
      <Accordion type="single" collapsible className="mt-6 w-full">
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
