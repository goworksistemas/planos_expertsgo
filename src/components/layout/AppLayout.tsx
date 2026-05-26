import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  CalendarDays,
  Home,
  LayoutGrid,
  LogOut,
  Network,
  Settings,
  Users,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_SUBSCRIBER } from '@/data/subscriber'
import { getPlanById } from '@/data/plans'

const navItems = [
  { to: '/painel', icon: Home, label: 'Início', end: true },
  { to: '/carteira', icon: Wallet, label: 'Carteira' },
  { to: '/', icon: LayoutGrid, label: 'Planos' },
]

const sidebarDecor = [
  { icon: CalendarDays, label: 'Agenda' },
  { icon: Users, label: 'Rede' },
  { icon: Settings, label: 'Config' },
]

export function AppLayout() {
  const plan = getPlanById(MOCK_SUBSCRIBER.planId)

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-[72px] flex-col items-center border-r border-border bg-card py-4 shadow-sm md:flex">
        <Link
          to="/painel"
          className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
        >
          <Network className="h-5 w-5" />
        </Link>
        <nav className="flex flex-1 flex-col items-center gap-2">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )
              }
              title={label}
            >
              <Icon className="h-5 w-5" />
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col items-center gap-2 opacity-40">
          {sidebarDecor.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex h-10 w-10 items-center justify-center text-muted-foreground"
              title={label}
            >
              <Icon className="h-5 w-5" />
            </span>
          ))}
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-border bg-card/90 px-4 py-4 shadow-sm backdrop-blur-md sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                GoCash · Assinante
              </p>
              <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                Olá, {MOCK_SUBSCRIBER.name.split(' ')[0]}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-foreground">Plano {plan.name}</p>
                <p className="text-xs text-muted-foreground">{MOCK_SUBSCRIBER.unit}</p>
              </div>
              <Link
                to="/"
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sair (demo)
              </Link>
            </div>
          </div>
          <nav className="mt-4 flex gap-2 md:hidden">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
