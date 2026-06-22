# DP-600 Quiz — Microsoft Fabric Analytics Engineer

App web interativo para preparação para o exame **DP-600: Microsoft Certified Fabric Analytics Engineer Associate**. Permite praticar com questões de múltipla escolha, simular o exame completo com timer, revisar erros e acompanhar a evolução por domínio.

**Deploy em produção:** [quiz-dp-600.vercel.app](https://quiz-dp-600.vercel.app)

---

## Funcionalidades

- **Simulado Completo** — 40 questões aleatórias com timer regressivo de 100 minutos
- **Prática por Domínio** — filtra questões por Domínio 1, 2 ou 3
- **Revisão de Erros** — lista todas as questões respondidas incorretamente
- **Dashboard de Progresso** — gráficos de evolução, pontuação por domínio e tópicos mais fracos
- **Feedback imediato** — explicação detalhada após cada resposta com link para documentação Microsoft
- **Progresso persistido** — histórico salvo no navegador via `localStorage`
- **Cloud sync** — progresso sincronizado na nuvem ao fazer login com email/senha (Supabase)
- **UI em pt-BR** — interface totalmente em Português Brasileiro
- **Responsivo** — funciona em mobile e desktop

---

## Domínios do Exame

| Domínio | Título | Peso |
|---|---|---|
| 1 | Maintain a Data Analytics Solution | 25–30% |
| 2 | Prepare Data | 45–50% |
| 3 | Implement and Manage Semantic Models | 25–30% |

O banco de questões contém **100 questões** distribuídas proporcionalmente entre os 3 domínios, cobrindo subdomínios como RLS, OLS, Git integration, deployment pipelines, Direct Lake, Delta tables, DAX avançado, KQL, sensitivity labels e muito mais.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.2.9 (App Router) + TypeScript |
| Estilização | Tailwind CSS v4 |
| State management | Zustand v5 (com `persist` middleware) |
| Gráficos | Recharts |
| Auth + Cloud sync | Supabase (email/senha) |
| Persistência local | `localStorage` |
| Banco de questões | JSON estático (`src/data/questions.json`) |
| Deploy | Vercel |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                    # Home: modos de estudo + stats rápidas
│   ├── layout.tsx                  # Root layout com Header e AuthProvider
│   ├── quiz/
│   │   ├── [mode]/page.tsx         # Sessão de quiz (simulation | domain-1/2/3 | review)
│   │   └── results/page.tsx        # Tela de resultados com revisão por questão
│   ├── dashboard/page.tsx          # Histórico de sessões e gráficos
│   ├── review/page.tsx             # Revisão de erros e questões marcadas
│   └── auth/
│       ├── login/page.tsx          # Login / cadastro com email e senha
│       └── callback/page.tsx       # Callback OAuth
│
├── components/
│   ├── ui/           Button, Badge, Card, Modal, EmptyState, DocLink, ErrorBoundary
│   ├── quiz/         QuizContainer, QuestionCard, OptionButton, FeedbackPanel, QuizHeader, ProgressBar, Timer
│   ├── results/      ScoreSummary, DomainBreakdown, QuestionReviewList
│   ├── dashboard/    DomainProgressChart, EvolutionChart, SessionHistory, WeakTopicsPanel
│   ├── home/         ModeCard, StatsOverview
│   └── layout/       Header, AuthProvider
│
├── store/
│   ├── quizStore.ts        # Estado efêmero da sessão ativa
│   ├── progressStore.ts    # Histórico + erros → persiste via localStorage + Supabase sync
│   └── authStore.ts        # Estado do usuário autenticado
│
├── hooks/
│   ├── useQuiz.ts          # Orquestra quizStore + questions.ts
│   ├── useTimer.ts         # Countdown com setInterval
│   ├── useProgress.ts      # Lê progressStore com guard de hidratação SSR
│   └── useAuthInit.ts      # Inicializa sessão Supabase e merge de progresso remoto
│
├── lib/
│   ├── questions.ts        # Loader, filtro, shuffle, buildSimulationQuestions()
│   ├── scoring.ts          # calculateScore(), getDomainScore() com Map O(1)
│   ├── constants.ts        # Pesos dos domínios, duração do timer
│   ├── supabase.ts         # Cliente Supabase browser
│   └── supabaseSync.ts     # load/save progresso no Supabase
│
├── data/
│   └── questions.json      # 100 questões (id, domain, subdomain, topic, difficulty, question, options, correct_answer, explanation, reference_url)
│
└── types/
    └── index.ts            # Todos os tipos TypeScript compartilhados
```

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com) (opcional — o app funciona sem login)

### Instalação

```bash
git clone https://github.com/Leonardobarony/quiz_dp_600.git
cd quiz_dp_600
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

> Sem essas variáveis o app funciona normalmente, apenas sem autenticação e sync na nuvem.

### Rodar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Build de produção

```bash
npm run build
npm start
```

### Verificar TypeScript

```bash
npx tsc --noEmit
```

---

## Banco de Questões

As questões ficam em `src/data/questions.json`. Cada questão segue este schema:

```json
{
  "id": "uuid",
  "domain": 1,
  "subdomain": "1.1",
  "topic": "Implement workspace-level access controls",
  "difficulty": "easy",
  "question": "Enunciado da questão...",
  "options": {
    "A": "Opção A",
    "B": "Opção B",
    "C": "Opção C",
    "D": "Opção D"
  },
  "correct_answer": "B",
  "explanation": "Explicação detalhada...",
  "reference_url": "https://learn.microsoft.com/..."
}
```

Para adicionar questões, edite o arquivo JSON diretamente. O Vercel faz redeploy automático a cada `git push`.

---

## Deploy

O projeto está configurado para deploy automático no Vercel:

1. Qualquer `git push origin main` dispara um novo deploy automaticamente
2. As variáveis de ambiente devem estar configuradas em **Vercel → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Framework Preset deve estar como **Next.js** em **Settings → Build and Deployment**

---

## Arquitetura de Estado

```
quizStore (efêmero, sem persistência)
  └── sessão ativa: currentIndex, answers, timeRemaining, questions

progressStore (persiste via localStorage + Supabase)
  ├── sessions[]         histórico de sessões finalizadas
  ├── wrongAnswerIds[]   IDs das questões respondidas errado
  ├── flaggedIds[]       IDs marcados para revisão
  └── subdomainStats{}   acertos/erros por subdomínio

authStore
  └── user, loading, signOut()
```

---

## Fluxo de Autenticação

O login é **opcional**. Sem login o app funciona normalmente com progresso salvo no navegador. Com login (email/senha via Supabase), o progresso é sincronizado na nuvem e acessível em qualquer dispositivo.

---

## Licença

Projeto pessoal para estudo. Não afiliado à Microsoft.
