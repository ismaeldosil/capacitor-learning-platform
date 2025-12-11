# Capacitor Learning Platform

[![CI](https://github.com/ismaeldosil/capacitor-learning-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/ismaeldosil/capacitor-learning-platform/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ismaeldosil/capacitor-learning-platform/graph/badge.svg)](https://codecov.io/gh/ismaeldosil/capacitor-learning-platform)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
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

| Módulo | Tema | Mini-juego |
|--------|------|------------|
| 1 | Setup + Fundamentos Capacitor | Command Builder |
| 2 | Plugins Core + Web-to-Native Bridge | Plugin Matcher |
| 3 | Desarrollo + Build Processes | Build Pipeline |
| 4 | Testing + App Store Preparation | Store Reviewer |

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
