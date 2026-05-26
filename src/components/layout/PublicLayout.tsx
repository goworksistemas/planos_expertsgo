import { Link, Outlet } from 'react-router-dom'
import { Network } from 'lucide-react'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none text-foreground">NetworkGo</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Planos
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/painel"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Área do assinante
            </Link>
            <Link
              to="/checkout?plano=plus"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Assinar
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} GoWork Sistemas · NetworkGo
        </div>
      </footer>
    </div>
  )
}
