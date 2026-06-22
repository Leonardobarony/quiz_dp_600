import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import AuthProvider from '@/components/layout/AuthProvider'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'DP-600 Quiz — Microsoft Fabric Analytics Engineer',
  description: 'Prepare-se para o exame DP-600 com questões de múltipla escolha, simulados completos e acompanhamento de progresso.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
