import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { USAGE_BY_CATEGORY } from '@/data/subscriber'
import { formatGoCash } from '@/data/subscriber'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function UsageChart() {
  const data = USAGE_BY_CATEGORY.map((c) => ({
    name: c.label,
    value: c.amount,
    fill: c.color,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Uso por categoria</CardTitle>
        <p className="text-sm text-muted-foreground">Últimos 30 dias · valores mockados</p>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: '#8b9aab', fontSize: 11 }}
                axisLine={{ stroke: '#1e2a3a' }}
                tickFormatter={(v) => `G$ ${v}`}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{ fill: '#8b9aab', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#121a24',
                  border: '1px solid #1e2a3a',
                  borderRadius: '8px',
                  color: '#f0f4f8',
                }}
                formatter={(value) => [formatGoCash(Number(value ?? 0)), 'Gasto']}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={22}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {USAGE_BY_CATEGORY.map((c) => (
            <div key={c.category} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c.color }} />
              {c.label}: {formatGoCash(c.amount)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
