import ModeCard from '@/components/home/ModeCard'
import StatsOverview from '@/components/home/StatsOverview'

const modes = [
  {
    href: '/quiz/simulation',
    title: 'Simulado Completo',
    description: '60 questões, 100 minutos — todos os domínios proporcionalmente',
    icon: '🎯',
    accentClass: 'border-purple-200 hover:border-purple-400',
  },
  {
    href: '/quiz/domain-1',
    title: 'Domínio 1 — Manter Solução',
    description: 'Security, Governance e Analytics Development Lifecycle',
    icon: '🔐',
    accentClass: 'border-blue-200 hover:border-blue-400',
  },
  {
    href: '/quiz/domain-2',
    title: 'Domínio 2 — Preparar Dados',
    description: 'Get Data, Transform Data e Query & Analyze',
    icon: '🗄️',
    accentClass: 'border-green-200 hover:border-green-400',
  },
  {
    href: '/quiz/domain-3',
    title: 'Domínio 3 — Modelos Semânticos',
    description: 'Design, Build e Optimize Enterprise-Scale Semantic Models',
    icon: '📐',
    accentClass: 'border-yellow-200 hover:border-yellow-400',
  },
  {
    href: '/review',
    title: 'Revisar Erros',
    description: 'Pratique as questões que você errou ou marcou para revisão',
    icon: '📝',
    accentClass: 'border-red-200 hover:border-red-400',
  },
  {
    href: '/dashboard',
    title: 'Ver Progresso',
    description: 'Histórico de sessões, gráficos e tópicos mais fracos',
    icon: '📈',
    accentClass: 'border-slate-300 hover:border-slate-400',
  },
]

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">DP-600 Quiz</h1>
        <p className="text-slate-500">
          Prepare-se para o exame <strong>Microsoft Fabric Analytics Engineer Associate</strong>.
          Escolha um modo para começar.
        </p>
      </div>

      <StatsOverview />

      <div className="grid gap-3 sm:grid-cols-2">
        {modes.map((mode) => (
          <ModeCard key={mode.href} {...mode} />
        ))}
      </div>

      <p className="text-xs text-center text-slate-400">
        Nota mínima: 700/1000 (70%) • Duração: 100 minutos • 3 domínios
      </p>
    </div>
  )
}
