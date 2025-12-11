# Claude Code Context - Capacitor Learning Platform

## Proyecto

Plataforma educativa gamificada para aprender **Ionic + Capacitor**. SPA con React + TypeScript que incluye cursos, quizzes y mini-juegos.

## Stack

| Tech | Version/Tool |
|------|--------------|
| React | 18+ |
| TypeScript | strict mode |
| Build | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| State | React hooks + Context |
| Storage | localStorage |
| Testing | Jest + RTL |
| Animations | Framer Motion |
| Icons | Lucide React |

## Estructura

```
src/
├── components/
│   ├── common/        # Button, Card, Modal, Toast
│   ├── layout/        # Navbar, Sidebar, Footer
│   ├── dashboard/     # ModuleCard, StatsPanel, BadgeGrid
│   ├── lesson/        # LessonContent, CodeBlock
│   ├── quiz/          # QuizQuestion, QuizResult
│   ├── games/         # CommandBuilder, PluginMatcher, etc.
│   └── gamification/  # XPBar, LevelBadge, StreakCounter
├── contexts/          # UserContext, GameContext
├── hooks/             # useLocalStorage, useXP, useProgress
├── pages/             # Dashboard, Module, Lesson, Quiz, Game
├── data/              # types.ts, constants.ts, badges.ts
└── utils/             # helpers, formatters
```

## Reglas

1. **TypeScript strict** - No `any`, tipar todo
2. **Accesibilidad WCAG 2.1 AA** - aria-labels, keyboard nav
3. **Componentes funcionales** con hooks
4. **localStorage** para persistencia
5. **Tests** para lógica de gamificación

## Comandos

```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm test             # Tests
npm run lint         # ESLint
```

## Sistema de Gamificación

### XP Rewards
- Completar lección: +10 XP
- Quiz perfecto: +50 XP
- Quiz aprobado (>70%): +25 XP
- Mini-juego: +100 XP
- Streak bonus: +20 XP

### Niveles
1. Capacitor Rookie (0-100)
2. Plugin Explorer (101-300)
3. Build Master (301-600)
4. Store Publisher (601-1000)
5. Capacitor Expert (1001+)

## Repos Relacionados

- `capacitor-learning-content` - Lecciones, quizzes, datos de juegos
- `capacitor-learning-docs` - Sistema de agentes, guías

## Agentes

Para tareas complejas, consultar el sistema de agentes en `capacitor-learning-docs/agents/`.

| Tarea | Agente |
|-------|--------|
| UI components | frontend-developer |
| Mini-juegos | mini-games-developer |
| XP/Niveles | xp-levels-specialist |
| Animaciones | animation-specialist |
| Tests | tester |
| Review | code-reviewer |
