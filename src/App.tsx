import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { PlansLandingPage } from '@/pages/PlansLandingPage'
import { SubscriberDashboardPage } from '@/pages/SubscriberDashboardPage'
import { SuccessPage } from '@/pages/SuccessPage'
import { WalletPage } from '@/pages/WalletPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<PlansLandingPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="sucesso" element={<SuccessPage />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="painel" element={<SubscriberDashboardPage />} />
          <Route path="carteira" element={<WalletPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
