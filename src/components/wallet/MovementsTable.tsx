import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import type { GoCashMovement } from '@/data/subscriber'
import { formatDateTime, formatGoCash } from '@/data/subscriber'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

const categoryLabel: Record<string, string> = {
  sala: 'Sala de reunião',
  cafe: 'Café / copinha',
  estacionamento: 'Estacionamento',
  outros: 'Outros',
}

interface MovementsTableProps {
  movements: GoCashMovement[]
}

export function MovementsTable({ movements }: MovementsTableProps) {
  if (movements.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Nenhuma movimentação no período selecionado.
      </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movements.map((m) => (
          <TableRow key={m.id}>
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDateTime(m.date)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full',
                    m.type === 'credit' ? 'bg-primary/10 text-primary' : 'bg-red-50 text-red-600',
                  )}
                >
                  {m.type === 'credit' ? (
                    <ArrowDownLeft className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-medium text-foreground">{m.description}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {m.category ? categoryLabel[m.category] : '—'}
            </TableCell>
            <TableCell
              className={cn(
                'text-right font-semibold',
                m.type === 'credit' ? 'text-primary' : 'text-red-600',
              )}
            >
              {m.type === 'credit' ? '+' : '−'}
              {formatGoCash(m.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
