# Capacitor Learning Platform

<!-- CI/CD & Quality -->
[![CI](https://github.com/ismaeldosil/capacitor-learning-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/ismaeldosil/capacitor-learning-platform/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ismaeldosil/capacitor-learning-platform/graph/badge.svg)](https://codecov.io/gh/ismaeldosil/capacitor-learning-platform)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/ismaeldosil/capacitor-learning-platform/graphs/commit-activity)

<!-- Core Technologies -->
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<!-- Testing & Tooling -->
[![Vitest](https://img.shields.io/badge/Vitest-1.1-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-8.56-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.1-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)

<!-- Features & Libraries -->
[![i18next](https://img.shields.io/badge/i18next-ES%20%7C%20EN%20%7C%20PT-26A69A?logo=i18next&logoColor=white)](https://www.i18next.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lucide](https://img.shields.io/badge/Lucide_Icons-0.300-F56565?logo=lucide&logoColor=white)](https://lucide.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.21-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)

<!-- Community -->
[![GitHub stars](https://img.shields.io/github/stars/ismaeldosil/capacitor-learning-platform?style=social)](https://github.com/ismaeldosil/capacitor-learning-platform/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/ismaeldosil/capacitor-learning-platform)](https://github.com/ismaeldosil/capacitor-learning-platform/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/ismaeldosil/capacitor-learning-platform)](https://github.com/ismaeldosil/capacitor-learning-platform/commits)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Plataforma educativa gamificada para aprender **Ionic + Capacitor** de forma acelerada.

## Descripción

Una Single Page Application (SPA) moderna que incluye:
- Cursos interactivos sobre Capacitor
- Mini-juegos educativos
- Sistema de gamificación (XP, niveles, badges, streaks)
- Quizzes de evaluación
- Progreso persistente en localStorage

## Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| Framework | React 18+ con TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| State | React hooks (useState, useReducer, useContext) |
| Routing | React Router v6 |
| Storage | localStorage |
| Testing | Vitest + React Testing Library |
| Animations | CSS transitions + Framer Motion |
| Icons | Lucide React |

## Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Button, Card, Modal, Toast
│   ├── layout/          # Navbar, Sidebar, Footer
│   ├── dashboard/       # ProgressCard, ModuleCard, StatsPanel
│   ├── lesson/          # LessonContent, CodeBlock, Navigation
│   ├── quiz/            # QuizQuestion, QuizOption, QuizResult
│   ├── games/           # CommandBuilder, PluginMatcher, etc.
│   └── gamification/    # XPBar, LevelBadge, BadgeGrid, Streak
├── contexts/            # UserContext, GameContext
├── hooks/               # useLocalStorage, useXP, useProgress
├── pages/               # Dashboard, Module, Lesson, Quiz, Game
├── data/                # Tipos y constantes
├── utils/               # Helpers, formatters
└── styles/              # Tailwind config, globals
```

## Comenzar

```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Ejecutar tests
npm test

# Tests con cobertura
npm test -- --coverage

# Lint
npm run lint

# Type check
npm run typecheck
```

## Módulos Educativos

| Módulo | Tema | Lecciones | Mini-juego |
|--------|------|-----------|------------|
| 1 | Setup + Fundamentos Capacitor | 5 | Command Builder |
| 2 | Plugins Core + Web-to-Native Bridge | 6 | Plugin Matcher |
| 3 | Desarrollo + Build Processes | 5 | Build Pipeline |
| 4 | Testing + App Store Preparation | 4 | Store Reviewer |
| 5 | Arquitectura Avanzada | 6 | Architecture Planner |
| 6 | Seguridad en Apps Móviles | 6 | Security Audit |

**Total:** 32 lecciones interactivas, 6 quizzes de evaluación, 6 mini-juegos

## Sistema de Gamificación

### Puntos (XP)
- Completar lección: +10 XP
- Quiz perfecto (100%): +50 XP
- Quiz aprobado (>70%): +25 XP
- Mini-juego completado: +100 XP
- Streak diario: +20 XP bonus

### Niveles
1. Capacitor Rookie (0-100 XP)
2. Plugin Explorer (101-300 XP)
3. Build Master (301-600 XP)
4. Store Publisher (601-1000 XP)
5. Capacitor Expert (1001+ XP)

## Repositorios Relacionados

- [capacitor-learning-content](https://github.com/ismaeldosil/capacitor-learning-content) - Contenido educativo
- [capacitor-learning-docs](https://github.com/ismaeldosil/capacitor-learning-docs) - Sistema de agentes

## Licencia

MIT
