import { Link } from 'react-router-dom'
import { CalendarHeart, Lightbulb, TrendingUp } from 'lucide-react'
import type { Suggestion } from '@/data/subscriber'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const icons = {
  event: CalendarHeart,
  upgrade: TrendingUp,
  tip: Lightbulb,
}

const borders = {
  event: 'border-blue-500/30',
  upgrade: 'border-primary/30',
  tip: 'border-amber-500/30',
}

interface SuggestionsProps {
  suggestions: Suggestion[]
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sugestões para você</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((s) => {
          const Icon = icons[s.type]
          return (
            <div
              key={s.id}
              className={cn('rounded-lg border bg-muted/20 p-4', borders[s.type])}
            >
              <div className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                  {s.actionLabel && (
                    <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
                      {s.actionHref ? (
                        <Link to={s.actionHref}>{s.actionLabel}</Link>
                      ) : (
                        <button type="button">{s.actionLabel}</button>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
