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
    q: 'Como funciona o câmbio do GoCash?',
    a: 'Câmbio 1:1: cada R$ 1 da assinatura vira G$ 1 de saldo, sem bônus nem letra miúda. Ex.: R$ 150 de assinatura viram G$ 150. Como assinante, você ainda reserva com a tarifa interna, mais barata que o avulso.',
  },
  {
    q: 'O que mais vem com a assinatura?',
    a: 'Com contrato ativo você acessa toda a plataforma: abertura de chamados, criação de promoções com IA e, em breve, publicação automática no LinkedIn, Instagram e WordPress com cronograma e prompt predefinido.',
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
