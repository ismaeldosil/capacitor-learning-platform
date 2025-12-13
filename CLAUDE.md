# Claude Code Context - Capacitor Learning Platform

## Proyecto

Plataforma educativa gamificada para aprender **Ionic + Capacitor**. SPA con React + TypeScript que incluye cursos, quizzes y mini-juegos.

**Live:** https://capacitor-learning-platform.vercel.app

## Stack

| Tech | Version/Tool |
|------|--------------|
| React | 18+ |
| TypeScript | strict mode |
| Build | Vite 5 |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| State | React hooks + Context |
| Storage | localStorage |
| Testing | Vitest + RTL |
| Animations | Framer Motion |
| Icons | Lucide React |
| i18n | react-i18next (ES/EN/PT) |

## Estructura

```
src/
├── components/
│   ├── common/        # Button, Card, Modal, Toast, Icon, LanguageSwitcher
│   ├── layout/        # Navbar, Sidebar, Footer, Layout
│   ├── dashboard/     # ModuleCard, StatsPanel, BadgeGrid
│   ├── lesson/        # LessonContent, CodeBlock
│   ├── quiz/          # QuizQuestion, QuizResult, AnswerOption
│   ├── games/         # CommandBuilder, PluginMatcher, BuildPipeline, StoreReviewer, ArchitecturePlanner, SecurityAudit
│   └── gamification/  # XPBar, LevelBadge, StreakCounter, BadgeCard, LevelUpPopup, AchievementPopup
├── contexts/          # UserContext
├── hooks/             # useLocalStorage, useXP, useProgress, useStreak, useBadges, useTranslatedContent
├── pages/             # Dashboard, Module, Lesson, Quiz, Game, NotFound
├── data/              # types.ts, constants.ts, badges.ts, lessons.ts, quizzes.ts, games.ts
├── i18n/
│   ├── index.ts       # Configuración i18next
│   └── locales/
│       ├── es/        # Español (default)
│       ├── en/        # English
│       └── pt/        # Português
├── utils/             # helpers, formatters, module-utils
└── styles/            # globals.css
```

## Módulos Implementados

| Módulo | Tema | Lecciones | Mini-juego | XP Req |
|--------|------|-----------|------------|--------|
| 1 | Setup + Fundamentos | 5 | Command Builder | 0 |
| 2 | Plugins Core | 6 | Plugin Matcher | 100 |
| 3 | Build Processes | 5 | Build Pipeline | 300 |
| 4 | App Store Prep | 4 | Store Reviewer | 450 |
| 5 | Arquitectura Avanzada | 6 | Architecture Planner | 600 |
| 6 | Seguridad en Apps Móviles | 6 | Security Audit | 800 |

**Total:** 32 lecciones, 6 quizzes, 6 mini-juegos

## Reglas

1. **TypeScript strict** - No `any`, tipar todo
2. **Accesibilidad WCAG 2.1 AA** - aria-labels, keyboard nav
3. **Componentes funcionales** con hooks
4. **localStorage** para persistencia
5. **Tests** para lógica de gamificación
6. **i18n** - Todas las strings deben usar traducciones

## Comandos

```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm test             # Tests
npm run lint         # ESLint
npm run typecheck    # TypeScript check
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

### Badges (14 total)
- first-lesson, quiz-master, streak-3, perfectionist
- plugin-explorer, speed-learner, completionist, night-owl
- early-bird, module-master, game-champion, dedicated-learner
- bug-hunter, community-contributor

## Tipos de Mini-juegos

| GameType | Componente | Descripción |
|----------|------------|-------------|
| command-builder | CommandBuilder | Drag-drop partes de comandos CLI |
| plugin-matcher | PluginMatcher | Conectar casos de uso con plugins |
| build-pipeline | BuildPipeline | Ordenar pasos del build process |
| store-reviewer | StoreReviewer | Identificar errores de app store |
| architecture-planner | ArchitecturePlanner | Clasificar componentes en capas |
| security-audit | SecurityAudit | Identificar vulnerabilidades en código |

## CI/CD

- **GitHub Actions:** lint, typecheck, test, build
- **Vercel:** Preview deploys en PRs, Production en main
- **Codecov:** Cobertura de tests

## Repos Relacionados

- `capacitor-learning-content` - Lecciones, quizzes, datos de juegos
- `capacitor-learning-docs` - Sistema de agentes, guías
