import type { GameType } from './types'

// Game Data Types
export interface CommandPart {
  id: string
  text: string
  type: 'base' | 'flag' | 'argument' | 'platform'
}

export interface CommandChallenge {
  id: string
  instruction: string
  description: string
  parts: CommandPart[]
  correctOrder: string[]
  hint: string
}

export interface PluginPair {
  id: string
  useCase: string
  plugin: string
  pluginName: string
  hint: string
}

export interface BuildStep {
  id: string
  name: string
  description: string
  platform: 'android' | 'ios' | 'both'
}

export interface BuildChallenge {
  id: string
  platform: 'android' | 'ios'
  steps: BuildStep[]
  correctOrder: string[]
}

export interface StoreScenario {
  id: string
  title: string
  description: string
  issues: string[]
  correctIssues: string[]
  explanation: string
}

export interface ArchitectureComponent {
  id: string
  name: string
  description: string
  layer: 'presentation' | 'domain' | 'data' | 'infrastructure'
}

export interface ArchitectureChallenge {
  id: string
  title: string
  scenario: string
  components: ArchitectureComponent[]
  connections: { from: string; to: string; label: string }[]
  correctLayers: Record<string, 'presentation' | 'domain' | 'data' | 'infrastructure'>
  hint: string
}

export interface Game {
  id: GameType
  moduleId: string
  title: string
  description: string
  instructions: string
  xpReward: number
}

// Command Builder Game Data (Module 1)
export const COMMAND_CHALLENGES: CommandChallenge[] = [
  {
    id: 'cmd-1',
    instruction: 'Crea un nuevo proyecto Capacitor con nombre "mi-app"',
    description: 'Usa el comando npx para inicializar un proyecto',
    parts: [
      { id: 'p1', text: 'npx', type: 'base' },
      { id: 'p2', text: '@capacitor/cli', type: 'base' },
      { id: 'p3', text: 'create', type: 'base' },
      { id: 'p4', text: 'mi-app', type: 'argument' },
    ],
    correctOrder: ['p1', 'p2', 'p3', 'p4'],
    hint: 'El comando base es npx @capacitor/cli create',
  },
  {
    id: 'cmd-2',
    instruction: 'Añade la plataforma Android al proyecto',
    description: 'Usa npm para instalar la plataforma nativa',
    parts: [
      { id: 'p1', text: 'npm', type: 'base' },
      { id: 'p2', text: 'install', type: 'base' },
      { id: 'p3', text: '@capacitor/android', type: 'argument' },
    ],
    correctOrder: ['p1', 'p2', 'p3'],
    hint: 'Usa npm install para añadir dependencias',
  },
  {
    id: 'cmd-3',
    instruction: 'Sincroniza el proyecto web con las plataformas nativas',
    description: 'Copia los assets web y actualiza plugins',
    parts: [
      { id: 'p1', text: 'npx', type: 'base' },
      { id: 'p2', text: 'cap', type: 'base' },
      { id: 'p3', text: 'sync', type: 'base' },
    ],
    correctOrder: ['p1', 'p2', 'p3'],
    hint: 'cap sync es el comando para sincronizar',
  },
  {
    id: 'cmd-4',
    instruction: 'Abre el proyecto Android en Android Studio',
    description: 'Lanza el IDE nativo para desarrollo',
    parts: [
      { id: 'p1', text: 'npx', type: 'base' },
      { id: 'p2', text: 'cap', type: 'base' },
      { id: 'p3', text: 'open', type: 'base' },
      { id: 'p4', text: 'android', type: 'platform' },
    ],
    correctOrder: ['p1', 'p2', 'p3', 'p4'],
    hint: 'Usa cap open seguido de la plataforma',
  },
  {
    id: 'cmd-5',
    instruction: 'Ejecuta la app en un dispositivo Android conectado',
    description: 'Compila y ejecuta en modo desarrollo',
    parts: [
      { id: 'p1', text: 'npx', type: 'base' },
      { id: 'p2', text: 'cap', type: 'base' },
      { id: 'p3', text: 'run', type: 'base' },
      { id: 'p4', text: 'android', type: 'platform' },
      { id: 'p5', text: '--target', type: 'flag' },
      { id: 'p6', text: 'device', type: 'argument' },
    ],
    correctOrder: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
    hint: 'cap run con --target device ejecuta en un dispositivo físico',
  },
]

// Plugin Matcher Game Data (Module 2)
export const PLUGIN_PAIRS: PluginPair[] = [
  {
    id: 'pair-1',
    useCase: 'Mostrar Face ID o huella dactilar para autenticación',
    plugin: '@capacitor-community/biometric',
    pluginName: 'Biometric',
    hint: 'Autenticación biométrica nativa',
  },
  {
    id: 'pair-2',
    useCase: 'Guardar preferencias del usuario de forma persistente',
    plugin: '@capacitor/preferences',
    pluginName: 'Preferences',
    hint: 'Key-value storage persistente',
  },
  {
    id: 'pair-3',
    useCase: 'Enviar notificaciones push al dispositivo',
    plugin: '@capacitor/push-notifications',
    pluginName: 'Push Notifications',
    hint: 'Notificaciones remotas via Firebase/APNs',
  },
  {
    id: 'pair-4',
    useCase: 'Mostrar una splash screen mientras carga la app',
    plugin: '@capacitor/splash-screen',
    pluginName: 'Splash Screen',
    hint: 'Pantalla de carga inicial',
  },
  {
    id: 'pair-5',
    useCase: 'Cambiar el color de la barra de estado del dispositivo',
    plugin: '@capacitor/status-bar',
    pluginName: 'Status Bar',
    hint: 'Control de la barra superior del sistema',
  },
  {
    id: 'pair-6',
    useCase: 'Detectar cuando el teclado virtual se muestra u oculta',
    plugin: '@capacitor/keyboard',
    pluginName: 'Keyboard',
    hint: 'Eventos del teclado virtual',
  },
  {
    id: 'pair-7',
    useCase: 'Abrir una URL en el navegador del sistema',
    plugin: '@capacitor/browser',
    pluginName: 'Browser',
    hint: 'Navegador in-app o externo',
  },
  {
    id: 'pair-8',
    useCase: 'Obtener información sobre el dispositivo y la app',
    plugin: '@capacitor/app',
    pluginName: 'App',
    hint: 'Metadata y lifecycle de la aplicación',
  },
]

// Build Pipeline Game Data (Module 3)
export const BUILD_CHALLENGES: BuildChallenge[] = [
  {
    id: 'build-android',
    platform: 'android',
    steps: [
      { id: 's1', name: 'npm run build', description: 'Compilar la app web', platform: 'both' },
      { id: 's2', name: 'npx cap sync android', description: 'Sincronizar con Android', platform: 'android' },
      { id: 's3', name: 'Abrir Android Studio', description: 'Cargar proyecto nativo', platform: 'android' },
      { id: 's4', name: 'Build > Generate Signed Bundle', description: 'Generar AAB firmado', platform: 'android' },
      { id: 's5', name: 'Seleccionar keystore', description: 'Usar certificado de firma', platform: 'android' },
      { id: 's6', name: 'Build release', description: 'Compilar versión de producción', platform: 'android' },
    ],
    correctOrder: ['s1', 's2', 's3', 's4', 's5', 's6'],
  },
  {
    id: 'build-ios',
    platform: 'ios',
    steps: [
      { id: 's1', name: 'npm run build', description: 'Compilar la app web', platform: 'both' },
      { id: 's2', name: 'npx cap sync ios', description: 'Sincronizar con iOS', platform: 'ios' },
      { id: 's3', name: 'Abrir Xcode', description: 'Cargar proyecto nativo', platform: 'ios' },
      { id: 's4', name: 'Seleccionar Team', description: 'Configurar signing team', platform: 'ios' },
      { id: 's5', name: 'Product > Archive', description: 'Crear archivo para distribución', platform: 'ios' },
      { id: 's6', name: 'Distribute App', description: 'Subir a App Store Connect', platform: 'ios' },
    ],
    correctOrder: ['s1', 's2', 's3', 's4', 's5', 's6'],
  },
]

// Store Reviewer Game Data (Module 4)
export const STORE_SCENARIOS: StoreScenario[] = [
  {
    id: 'scenario-1',
    title: 'App de Finanzas - Rechazo Play Store',
    description: 'Tu app de banca fue rechazada. Revisa los siguientes elementos y marca los que podrían causar el rechazo.',
    issues: [
      'Falta política de privacidad en la app',
      'Permisos de cámara sin justificación',
      'Icono de la app con resolución correcta',
      'No declara uso de datos financieros',
      'Descripción clara de funcionalidades',
    ],
    correctIssues: [
      'Falta política de privacidad en la app',
      'Permisos de cámara sin justificación',
      'No declara uso de datos financieros',
    ],
    explanation: 'Apps financieras requieren política de privacidad, justificación de permisos y declaración de datos sensibles.',
  },
  {
    id: 'scenario-2',
    title: 'App Social - Rechazo App Store',
    description: 'Tu red social fue rechazada por Apple. Identifica los problemas.',
    issues: [
      'Botón de eliminar cuenta no visible',
      'Screenshots de alta calidad',
      'Login con Apple no implementado',
      'Contenido generado por usuarios sin moderación',
      'Soporte para iPad incluido',
    ],
    correctIssues: [
      'Botón de eliminar cuenta no visible',
      'Login con Apple no implementado',
      'Contenido generado por usuarios sin moderación',
    ],
    explanation: 'Apple requiere: opción de eliminar cuenta, Sign in with Apple si hay login social, y moderación de UGC.',
  },
  {
    id: 'scenario-3',
    title: 'App de Salud - Cumplimiento',
    description: 'Estás preparando una app de seguimiento de salud. ¿Qué necesitas antes de publicar?',
    issues: [
      'Consentimiento explícito para datos de salud',
      'Animaciones fluidas en toda la app',
      'Encriptación de datos sensibles',
      'Aviso de que no reemplaza consejo médico',
      'Múltiples idiomas soportados',
    ],
    correctIssues: [
      'Consentimiento explícito para datos de salud',
      'Encriptación de datos sensibles',
      'Aviso de que no reemplaza consejo médico',
    ],
    explanation: 'Apps de salud necesitan consentimiento HIPAA/GDPR, encriptación y disclaimers médicos.',
  },
  {
    id: 'scenario-4',
    title: 'App con Compras In-App - Configuración',
    description: 'Tu app tiene suscripciones premium. Verifica la configuración.',
    issues: [
      'Botón de restaurar compras visible',
      'Términos de suscripción claros antes de compra',
      'Enlace a términos de servicio',
      'Precio mostrado en formato local',
      'Opción de tema oscuro',
    ],
    correctIssues: [
      'Botón de restaurar compras visible',
      'Términos de suscripción claros antes de compra',
      'Enlace a términos de servicio',
      'Precio mostrado en formato local',
    ],
    explanation: 'Las tiendas requieren: restaurar compras, términos claros, ToS y precios localizados para IAP.',
  },
]

// Architecture Planner Game Data (Module 5)
export const ARCHITECTURE_CHALLENGES: ArchitectureChallenge[] = [
  {
    id: 'arch-1',
    title: 'Feature-Based Structure',
    scenario: 'Estás diseñando la arquitectura para una feature de autenticación. Clasifica cada componente en su capa correcta.',
    components: [
      { id: 'c1', name: 'LoginForm.tsx', description: 'Componente visual del formulario de login', layer: 'presentation' },
      { id: 'c2', name: 'useAuth.ts', description: 'Hook que expone estado y acciones de autenticación', layer: 'presentation' },
      { id: 'c3', name: 'authService.ts', description: 'Servicio que hace llamadas a la API', layer: 'data' },
      { id: 'c4', name: 'validateCredentials.ts', description: 'Función que valida formato de email/password', layer: 'domain' },
      { id: 'c5', name: 'authStore.ts', description: 'Store de Zustand con estado global de auth', layer: 'domain' },
      { id: 'c6', name: 'apiClient.ts', description: 'Cliente HTTP configurado con interceptores', layer: 'infrastructure' },
    ],
    connections: [
      { from: 'c1', to: 'c2', label: 'usa' },
      { from: 'c2', to: 'c5', label: 'accede' },
      { from: 'c2', to: 'c3', label: 'llama' },
      { from: 'c3', to: 'c6', label: 'usa' },
      { from: 'c4', to: 'c2', label: 'valida' },
    ],
    correctLayers: {
      c1: 'presentation',
      c2: 'presentation',
      c3: 'data',
      c4: 'domain',
      c5: 'domain',
      c6: 'infrastructure',
    },
    hint: 'Presentation = UI/Hooks, Domain = Lógica de negocio/State, Data = API calls, Infrastructure = Configuración base',
  },
  {
    id: 'arch-2',
    title: 'Monorepo Structure',
    scenario: 'Organiza los packages de un monorepo Turborepo para una app Capacitor con web y admin.',
    components: [
      { id: 'c1', name: 'apps/mobile', description: 'App Capacitor principal', layer: 'presentation' },
      { id: 'c2', name: 'apps/web', description: 'Aplicación web Next.js', layer: 'presentation' },
      { id: 'c3', name: 'packages/ui', description: 'Componentes compartidos React', layer: 'presentation' },
      { id: 'c4', name: 'packages/api-client', description: 'Cliente API tipado compartido', layer: 'data' },
      { id: 'c5', name: 'packages/types', description: 'Tipos TypeScript compartidos', layer: 'domain' },
      { id: 'c6', name: 'packages/utils', description: 'Utilidades de validación y formateo', layer: 'domain' },
    ],
    connections: [
      { from: 'c1', to: 'c3', label: 'importa' },
      { from: 'c2', to: 'c3', label: 'importa' },
      { from: 'c1', to: 'c4', label: 'usa' },
      { from: 'c2', to: 'c4', label: 'usa' },
      { from: 'c4', to: 'c5', label: 'implementa' },
    ],
    correctLayers: {
      c1: 'presentation',
      c2: 'presentation',
      c3: 'presentation',
      c4: 'data',
      c5: 'domain',
      c6: 'domain',
    },
    hint: 'Apps son presentation, packages/ui también. api-client es data, types y utils son domain.',
  },
  {
    id: 'arch-3',
    title: 'State Management',
    scenario: 'Diseña la arquitectura de estado para una app de e-commerce. Decide qué va en TanStack Query vs Zustand.',
    components: [
      { id: 'c1', name: 'useProducts', description: 'Hook para obtener lista de productos', layer: 'data' },
      { id: 'c2', name: 'useCartStore', description: 'Store del carrito de compras', layer: 'domain' },
      { id: 'c3', name: 'ProductList.tsx', description: 'Componente que muestra productos', layer: 'presentation' },
      { id: 'c4', name: 'useCreateOrder', description: 'Mutation para crear una orden', layer: 'data' },
      { id: 'c5', name: 'useUIStore', description: 'Store para estado de UI (sidebar, modals)', layer: 'presentation' },
      { id: 'c6', name: 'productsApi.ts', description: 'Funciones que llaman a la API REST', layer: 'infrastructure' },
    ],
    connections: [
      { from: 'c3', to: 'c1', label: 'usa' },
      { from: 'c1', to: 'c6', label: 'queryFn' },
      { from: 'c3', to: 'c2', label: 'addToCart' },
      { from: 'c4', to: 'c2', label: 'lee items' },
    ],
    correctLayers: {
      c1: 'data',
      c2: 'domain',
      c3: 'presentation',
      c4: 'data',
      c5: 'presentation',
      c6: 'infrastructure',
    },
    hint: 'TanStack Query (data) para server state, Zustand (domain) para client state, UI state puede ser presentation.',
  },
  {
    id: 'arch-4',
    title: 'Native Bridge Architecture',
    scenario: 'Organiza los componentes de un plugin Capacitor personalizado de seguridad.',
    components: [
      { id: 'c1', name: 'definitions.ts', description: 'Interfaz TypeScript del plugin', layer: 'domain' },
      { id: 'c2', name: 'index.ts', description: 'Registro del plugin con registerPlugin', layer: 'infrastructure' },
      { id: 'c3', name: 'web.ts', description: 'Implementación web (fallback)', layer: 'data' },
      { id: 'c4', name: 'SecurityPlugin.swift', description: 'Implementación nativa iOS', layer: 'data' },
      { id: 'c5', name: 'useSecurity.ts', description: 'Hook React para usar el plugin', layer: 'presentation' },
      { id: 'c6', name: 'SecurityScreen.tsx', description: 'UI que muestra estado de seguridad', layer: 'presentation' },
    ],
    connections: [
      { from: 'c2', to: 'c1', label: 'implementa' },
      { from: 'c3', to: 'c1', label: 'implementa' },
      { from: 'c4', to: 'c1', label: 'implementa' },
      { from: 'c5', to: 'c2', label: 'usa' },
      { from: 'c6', to: 'c5', label: 'usa' },
    ],
    correctLayers: {
      c1: 'domain',
      c2: 'infrastructure',
      c3: 'data',
      c4: 'data',
      c5: 'presentation',
      c6: 'presentation',
    },
    hint: 'Definitions son domain (contratos), implementaciones son data, registro es infrastructure.',
  },
]

// Game Definitions
export const GAMES: Game[] = [
  {
    id: 'command-builder',
    moduleId: 'module-1',
    title: 'Command Builder',
    description: 'Construye comandos de Capacitor CLI arrastrando las partes en el orden correcto',
    instructions: 'Arrastra y suelta las partes del comando en el orden correcto para completar cada desafío.',
    xpReward: 100,
  },
  {
    id: 'plugin-matcher',
    moduleId: 'module-2',
    title: 'Plugin Matcher',
    description: 'Conecta cada caso de uso con el plugin de Capacitor correcto',
    instructions: 'Empareja cada caso de uso con el plugin que lo resuelve. Usa las pistas si necesitas ayuda.',
    xpReward: 100,
  },
  {
    id: 'build-pipeline',
    moduleId: 'module-3',
    title: 'Build Pipeline',
    description: 'Ordena los pasos del proceso de build para Android e iOS',
    instructions: 'Arrastra los pasos en el orden correcto para completar el pipeline de build.',
    xpReward: 100,
  },
  {
    id: 'store-reviewer',
    moduleId: 'module-4',
    title: 'Store Reviewer',
    description: 'Identifica los problemas que causarían el rechazo de una app',
    instructions: 'Lee cada escenario y selecciona los issues que podrían causar un rechazo en las tiendas.',
    xpReward: 100,
  },
  {
    id: 'architecture-planner',
    moduleId: 'module-5',
    title: 'Architecture Planner',
    description: 'Diseña arquitecturas escalables clasificando componentes en sus capas correctas',
    instructions: 'Arrastra cada componente a su capa arquitectónica correcta: Presentation, Domain, Data o Infrastructure.',
    xpReward: 100,
  },
]

// Helper Functions
export function getGameByModuleId(moduleId: string): Game | undefined {
  return GAMES.find(g => g.moduleId === moduleId)
}

export function getGameById(gameId: GameType): Game | undefined {
  return GAMES.find(g => g.id === gameId)
}

export function getCommandChallenges(): CommandChallenge[] {
  return COMMAND_CHALLENGES
}

export function getPluginPairs(): PluginPair[] {
  return PLUGIN_PAIRS
}

export function getBuildChallenges(): BuildChallenge[] {
  return BUILD_CHALLENGES
}

export function getStoreScenarios(): StoreScenario[] {
  return STORE_SCENARIOS
}

export function getArchitectureChallenges(): ArchitectureChallenge[] {
  return ARCHITECTURE_CHALLENGES
}
