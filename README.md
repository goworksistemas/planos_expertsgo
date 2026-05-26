# NetworkGo — Planos de assinatura

Landing pública de planos e fluxo de checkout para assinatura NetworkGo, com tema claro comercial e destaque teal (GoCash).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui (componentes manuais)
- React Router
- Lucide React

## Rotas

| Rota | Tela |
|------|------|
| `/` | Landing de planos (hero, câmbio 1:1, 3 planos, benefícios, calculadora por tipo de sala, FAQ) |
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
