import type { Quiz } from './types'

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-module-1',
    moduleId: 'module-1',
    passingScore: 70,
    xpReward: 25,
    questions: [
      {
        id: 'q1-1',
        text: '¿Qué es Capacitor?',
        options: [
          'Un framework CSS para aplicaciones móviles',
          'Un runtime nativo que permite ejecutar apps web como apps nativas',
          'Un lenguaje de programación para iOS',
          'Una base de datos para aplicaciones móviles',
        ],
        correctIndex: 1,
        explanation:
          'Capacitor es un runtime nativo moderno que permite ejecutar aplicaciones web de forma nativa en iOS, Android y la Web.',
      },
      {
        id: 'q1-2',
        text: '¿Cuál es el comando para sincronizar tu app web con los proyectos nativos?',
        options: [
          'npx cap build',
          'npx cap run',
          'npx cap sync',
          'npx cap update',
        ],
        correctIndex: 2,
        explanation:
          'El comando "npx cap sync" copia tu build web a los proyectos nativos y actualiza los plugins de Capacitor.',
      },
      {
        id: 'q1-3',
        text: '¿Qué WebView utiliza Capacitor en iOS?',
        options: [
          'UIWebView',
          'WKWebView',
          'Safari WebView',
          'Chrome WebView',
        ],
        correctIndex: 1,
        explanation:
          'En iOS, Capacitor usa WKWebView, que es el WebView moderno y de alto rendimiento de Apple.',
      },
      {
        id: 'q1-4',
        text: '¿Cuál es el archivo principal de configuración de Capacitor?',
        options: [
          'package.json',
          'config.xml',
          'capacitor.config.ts',
          'ionic.config.json',
        ],
        correctIndex: 2,
        explanation:
          'El archivo capacitor.config.ts (o .json) contiene toda la configuración de tu proyecto Capacitor.',
      },
      {
        id: 'q1-5',
        text: '¿Qué hace el comando "npx cap open android"?',
        options: [
          'Compila la app para Android',
          'Ejecuta la app en un emulador Android',
          'Abre el proyecto en Android Studio',
          'Publica la app en Play Store',
        ],
        correctIndex: 2,
        explanation:
          'El comando "npx cap open" abre el proyecto nativo en el IDE correspondiente (Android Studio para Android, Xcode para iOS).',
      },
      {
        id: 'q1-6',
        text: '¿Qué directorio contiene tu app web dentro del proyecto Android?',
        options: [
          'android/app/src/main/res/',
          'android/app/src/main/assets/www/',
          'android/www/',
          'android/public/',
        ],
        correctIndex: 1,
        explanation:
          'Tu app web compilada se copia a android/app/src/main/assets/www/ cuando ejecutas cap sync o cap copy.',
      },
      {
        id: 'q1-7',
        text: '¿Qué necesitas configurar para usar Live Reload en un dispositivo?',
        options: [
          'Solo iniciar el servidor de desarrollo',
          'Configurar server.url con tu IP local en capacitor.config.ts',
          'Instalar un plugin especial de hot reload',
          'Conectar el dispositivo por USB únicamente',
        ],
        correctIndex: 1,
        explanation:
          'Para Live Reload, debes configurar server.url con tu IP local para que el dispositivo pueda conectarse a tu servidor de desarrollo.',
      },
      {
        id: 'q1-8',
        text: '¿Cuál es la diferencia entre "npx cap copy" y "npx cap sync"?',
        options: [
          'Son exactamente iguales',
          'copy solo copia archivos web, sync también actualiza plugins nativos',
          'sync es más rápido que copy',
          'copy actualiza plugins, sync solo copia archivos',
        ],
        correctIndex: 1,
        explanation:
          '"copy" solo copia tu build web a los proyectos nativos. "sync" ejecuta copy y además actualiza los plugins nativos de Capacitor.',
      },
      {
        id: 'q1-9',
        text: '¿Con qué frameworks web es compatible Capacitor?',
        options: [
          'Solo con Ionic Framework',
          'Solo con React y Angular',
          'Cualquier framework que genere archivos estáticos',
          'Solo con frameworks que soporten SSR',
        ],
        correctIndex: 2,
        explanation:
          'Capacitor es agnóstico del framework. Funciona con React, Vue, Angular, Svelte, o cualquier proyecto web que genere archivos estáticos.',
      },
      {
        id: 'q1-10',
        text: '¿Qué es el "Bridge" en la arquitectura de Capacitor?',
        options: [
          'Un componente visual de la interfaz',
          'El sistema de comunicación entre JavaScript y código nativo',
          'Una herramienta de debugging',
          'El compilador de TypeScript',
        ],
        correctIndex: 1,
        explanation:
          'El Bridge es el sistema de comunicación que permite a tu código JavaScript llamar a APIs nativas y recibir respuestas del código nativo.',
      },
    ],
  },
  {
    id: 'quiz-module-2',
    moduleId: 'module-2',
    passingScore: 70,
    xpReward: 25,
    questions: [
      {
        id: 'q2-1',
        text: '¿Qué plugin se usa para manejar el ciclo de vida de la app?',
        options: [
          '@capacitor/lifecycle',
          '@capacitor/app',
          '@capacitor/core',
          '@capacitor/status',
        ],
        correctIndex: 1,
        explanation:
          'El plugin @capacitor/app proporciona métodos para manejar el ciclo de vida de la aplicación, como detectar cuando va a segundo plano.',
      },
      {
        id: 'q2-2',
        text: '¿Cuál es el método correcto para escuchar cuando la app va a segundo plano?',
        options: [
          'App.onPause()',
          'App.addListener("appStateChange", ...)',
          'App.background()',
          'App.onBackground()',
        ],
        correctIndex: 1,
        explanation:
          'Se usa App.addListener("appStateChange", callback) para escuchar cambios de estado de la app, incluyendo cuando va a segundo plano.',
      },
      {
        id: 'q2-3',
        text: '¿Qué plugin se usa para almacenamiento seguro de datos pequeños?',
        options: [
          '@capacitor/storage',
          '@capacitor/preferences',
          '@capacitor/secure-storage',
          '@capacitor/keychain',
        ],
        correctIndex: 1,
        explanation:
          '@capacitor/preferences es el plugin oficial para almacenar datos key-value de forma persistente y segura.',
      },
      {
        id: 'q2-4',
        text: '¿Qué devuelve PushNotifications.requestPermissions()?',
        options: [
          'Un boolean',
          'Un objeto con la propiedad "receive"',
          'Un string con el token',
          'Un array de permisos',
        ],
        correctIndex: 1,
        explanation:
          'requestPermissions() devuelve un objeto PermissionStatus con la propiedad "receive" que indica si se otorgaron los permisos.',
      },
      {
        id: 'q2-5',
        text: '¿Cuál es la función del SplashScreen en Capacitor?',
        options: [
          'Mostrar anuncios al inicio',
          'Mostrar una pantalla de carga mientras la app inicializa',
          'Proteger la app con contraseña',
          'Mostrar el menú principal',
        ],
        correctIndex: 1,
        explanation:
          'El SplashScreen muestra una imagen de inicio mientras tu aplicación web carga, mejorando la experiencia de usuario.',
      },
    ],
  },
]

export function getQuizByModuleId(moduleId: string): Quiz | undefined {
  return QUIZZES.find((q) => q.moduleId === moduleId)
}

export function getQuizById(quizId: string): Quiz | undefined {
  return QUIZZES.find((q) => q.id === quizId)
}
