# NetworkGo — Planos de assinatura

Landing pública de planos e fluxo de checkout para assinatura NetworkGo, com tema escuro inspirado no GoCash Admin.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui (componentes manuais)
- React Router
- Lucide React

## Rotas

| Rota | Tela |
|------|------|
| `/` | Landing de planos (hero, 3 planos, bônus, calculadora, FAQ) |
| `/checkout?plano=starter\|plus\|pro` | Checkout de assinatura |
| `/sucesso` | Confirmação pós-assinatura |
| `/painel` | Dashboard do assinante (área logada — mock) |
| `/carteira` | Carteira GoCash com histórico e gráfico |

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```
