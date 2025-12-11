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
      {
        id: 'q2-6',
        text: '¿Qué método del Keyboard plugin permite ocultar el teclado virtual?',
        options: [
          'Keyboard.close()',
          'Keyboard.dismiss()',
          'Keyboard.hide()',
          'Keyboard.remove()',
        ],
        correctIndex: 2,
        explanation:
          'Keyboard.hide() oculta el teclado virtual programáticamente cuando ya no se necesita.',
      },
      {
        id: 'q2-7',
        text: '¿Qué evento del Keyboard plugin se dispara ANTES de que el teclado aparezca?',
        options: [
          'keyboardWillShow',
          'keyboardDidShow',
          'keyboardOpening',
          'keyboardVisible',
        ],
        correctIndex: 0,
        explanation:
          'El evento keyboardWillShow se dispara antes de la animación del teclado, permitiéndote ajustar el layout anticipadamente.',
      },
      {
        id: 'q2-8',
        text: '¿Cuál es la ventaja de usar el Browser plugin sobre window.open()?',
        options: [
          'Es más rápido',
          'Permite personalizar la toolbar y mantener al usuario en la app',
          'No requiere conexión a internet',
          'Soporta más idiomas',
        ],
        correctIndex: 1,
        explanation:
          'El Browser plugin abre URLs en un navegador in-app con toolbar personalizable, manteniendo al usuario dentro de tu aplicación.',
      },
      {
        id: 'q2-9',
        text: '¿Qué método de NativeBiometric verifica la identidad del usuario?',
        options: [
          'NativeBiometric.authenticate()',
          'NativeBiometric.verifyIdentity()',
          'NativeBiometric.checkBiometric()',
          'NativeBiometric.scanFinger()',
        ],
        correctIndex: 1,
        explanation:
          'verifyIdentity() solicita autenticación biométrica al usuario mostrando el prompt del sistema.',
      },
      {
        id: 'q2-10',
        text: '¿Dónde almacena NativeBiometric las credenciales de forma segura?',
        options: [
          'localStorage del navegador',
          'En un archivo JSON',
          'Keychain (iOS) o Keystore (Android)',
          'SharedPreferences sin encriptar',
        ],
        correctIndex: 2,
        explanation:
          'NativeBiometric usa el Keychain de iOS y el Keystore de Android, que son almacenamientos encriptados a nivel de hardware.',
      },
    ],
  },
  {
    id: 'quiz-module-3',
    moduleId: 'module-3',
    passingScore: 70,
    xpReward: 25,
    questions: [
      {
        id: 'q3-1',
        text: '¿Qué método de Capacitor permite saber si la app corre en un dispositivo nativo?',
        options: [
          'Capacitor.isDevice()',
          'Capacitor.isNativePlatform()',
          'Capacitor.isMobile()',
          'Capacitor.checkNative()',
        ],
        correctIndex: 1,
        explanation:
          'Capacitor.isNativePlatform() devuelve true si la app está corriendo en iOS o Android, y false si está en web.',
      },
      {
        id: 'q3-2',
        text: '¿Cuál es el directorio webDir correcto para un proyecto Vite?',
        options: [
          'build',
          'www',
          'dist',
          'public',
        ],
        correctIndex: 2,
        explanation:
          'Vite genera el build de producción en el directorio "dist" por defecto.',
      },
      {
        id: 'q3-3',
        text: '¿Qué evento del App plugin se usa para manejar deep links?',
        options: [
          'appDeepLink',
          'appUrlOpen',
          'appLinkReceived',
          'appNavigate',
        ],
        correctIndex: 1,
        explanation:
          'El evento appUrlOpen se dispara cuando la app se abre mediante un URL scheme personalizado o un deep link.',
      },
      {
        id: 'q3-4',
        text: '¿Qué CameraResultType devuelve una URL utilizable directamente en un <img> tag?',
        options: [
          'CameraResultType.Base64',
          'CameraResultType.Uri',
          'CameraResultType.DataUrl',
          'CameraResultType.Path',
        ],
        correctIndex: 1,
        explanation:
          'CameraResultType.Uri devuelve un webPath que puede usarse directamente como src de una imagen.',
      },
      {
        id: 'q3-5',
        text: '¿Qué formato de app requiere Google Play para nuevas publicaciones?',
        options: [
          'APK',
          'AAB (Android App Bundle)',
          'IPA',
          'ZIP',
        ],
        correctIndex: 1,
        explanation:
          'Google Play requiere Android App Bundle (AAB) para nuevas apps, ya que permite optimizar el tamaño de descarga.',
      },
      {
        id: 'q3-6',
        text: '¿Qué comando genera un keystore para firmar apps Android?',
        options: [
          'npm run keytool',
          'keytool -genkey',
          'gradle signKey',
          'android-keygen',
        ],
        correctIndex: 1,
        explanation:
          'El comando keytool -genkey (parte del JDK) genera un keystore con las claves para firmar tu app.',
      },
      {
        id: 'q3-7',
        text: '¿Por qué es importante NUNCA perder tu keystore de release?',
        options: [
          'Tendrás que reinstalar Android Studio',
          'No podrás actualizar tu app en Google Play',
          'La app dejará de funcionar',
          'Perderás el código fuente',
        ],
        correctIndex: 1,
        explanation:
          'Sin el keystore original, no puedes firmar actualizaciones con la misma firma, lo que impide actualizar la app publicada.',
      },
      {
        id: 'q3-8',
        text: '¿Qué herramienta automatiza el proceso de build y deploy para iOS?',
        options: [
          'Gradle',
          'Fastlane',
          'Xcode CLI',
          'npm deploy',
        ],
        correctIndex: 1,
        explanation:
          'Fastlane automatiza tareas comunes como builds, firma, screenshots, y subida a App Store/TestFlight.',
      },
      {
        id: 'q3-9',
        text: '¿Qué opción de Xcode se usa para crear el archivo para App Store?',
        options: [
          'Build > Run',
          'Product > Archive',
          'File > Export',
          'Debug > Release',
        ],
        correctIndex: 1,
        explanation:
          'Product > Archive compila la app en modo release y crea un archivo que puede subirse a App Store Connect.',
      },
      {
        id: 'q3-10',
        text: '¿En qué archivo se configura la firma de release para Android?',
        options: [
          'AndroidManifest.xml',
          'capacitor.config.ts',
          'android/app/build.gradle',
          'settings.gradle',
        ],
        correctIndex: 2,
        explanation:
          'La configuración de signingConfigs para release se define en el archivo build.gradle del módulo app.',
      },
    ],
  },
  {
    id: 'quiz-module-4',
    moduleId: 'module-4',
    passingScore: 70,
    xpReward: 25,
    questions: [
      {
        id: 'q4-1',
        text: '¿Qué tipo de test verifica flujos completos de usuario de principio a fin?',
        options: [
          'Unit Tests',
          'Integration Tests',
          'E2E Tests',
          'Snapshot Tests',
        ],
        correctIndex: 2,
        explanation:
          'Los E2E (End-to-End) Tests simulan interacciones reales del usuario a través de toda la aplicación.',
      },
      {
        id: 'q4-2',
        text: '¿Cómo se prueban componentes que usan plugins de Capacitor en tests unitarios?',
        options: [
          'Se ejecutan en un emulador',
          'Se usan mocks de los plugins',
          'No se pueden probar',
          'Se conecta un dispositivo real',
        ],
        correctIndex: 1,
        explanation:
          'Se crean mocks de los plugins de Capacitor que simulan las respuestas, permitiendo tests rápidos y aislados.',
      },
      {
        id: 'q4-3',
        text: '¿Cuánto cuesta la cuenta de Google Play Developer?',
        options: [
          '$25/año',
          '$99/año',
          '$25 una vez',
          '$99 una vez',
        ],
        correctIndex: 2,
        explanation:
          'Google Play Developer requiere un pago único de $25 USD para publicar apps.',
      },
      {
        id: 'q4-4',
        text: '¿Cuánto cuesta la cuenta de Apple Developer?',
        options: [
          '$25/año',
          '$99/año',
          '$25 una vez',
          '$99 una vez',
        ],
        correctIndex: 1,
        explanation:
          'Apple Developer Program requiere una suscripción anual de $99 USD.',
      },
      {
        id: 'q4-5',
        text: '¿Qué son las "Nutrition Labels" en App Store Connect?',
        options: [
          'Información nutricional de la app',
          'Declaración de qué datos recopila tu app',
          'Etiquetas de categoría',
          'Información del desarrollador',
        ],
        correctIndex: 1,
        explanation:
          'Las "Nutrition Labels" (App Privacy) son declaraciones obligatorias sobre qué datos recopila tu app y cómo los usa.',
      },
      {
        id: 'q4-6',
        text: '¿Cuál es un motivo común de rechazo en ambas tiendas?',
        options: [
          'Usar colores brillantes',
          'Falta de política de privacidad',
          'App muy pequeña',
          'Usar muchas imágenes',
        ],
        correctIndex: 1,
        explanation:
          'Ambas tiendas requieren una política de privacidad accesible públicamente, especialmente si recopilas datos de usuarios.',
      },
      {
        id: 'q4-7',
        text: '¿Qué es KYC en el contexto de apps fintech?',
        options: [
          'Keep Your Credentials',
          'Know Your Customer',
          'Key Yield Calculation',
          'Knowledge Your Code',
        ],
        correctIndex: 1,
        explanation:
          'KYC (Know Your Customer) es el proceso de verificación de identidad requerido por regulaciones financieras.',
      },
      {
        id: 'q4-8',
        text: '¿Qué regulación aplica si tu app maneja datos de tarjetas de crédito?',
        options: [
          'GDPR',
          'PCI-DSS',
          'HIPAA',
          'SOX',
        ],
        correctIndex: 1,
        explanation:
          'PCI-DSS es el estándar de seguridad para el manejo de datos de tarjetas de pago.',
      },
      {
        id: 'q4-9',
        text: '¿Por qué se debe implementar timeout de sesión en apps fintech?',
        options: [
          'Para ahorrar batería',
          'Por seguridad, para proteger la cuenta si el dispositivo queda desatendido',
          'Para reducir el uso de datos',
          'Es un requisito de diseño',
        ],
        correctIndex: 1,
        explanation:
          'El timeout de sesión protege la cuenta del usuario si deja el dispositivo desatendido o lo pierde.',
      },
      {
        id: 'q4-10',
        text: '¿Qué es certificate pinning y por qué es importante en apps financieras?',
        options: [
          'Fijar el certificado SSL esperado para prevenir ataques MITM',
          'Crear certificados de usuario',
          'Encriptar datos locales',
          'Validar la identidad del usuario',
        ],
        correctIndex: 0,
        explanation:
          'Certificate pinning verifica que el servidor sea el esperado, previniendo ataques man-in-the-middle donde alguien intercepte el tráfico.',
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
