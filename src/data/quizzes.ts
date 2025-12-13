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
  {
    id: 'quiz-module-5',
    moduleId: 'module-5',
    passingScore: 70,
    xpReward: 25,
    questions: [
      {
        id: 'q5-1',
        text: '¿Qué es un monorepo y cuál es su principal ventaja para apps Capacitor empresariales?',
        options: [
          'Un repositorio con un solo proyecto para mayor simplicidad',
          'Múltiples proyectos en un repositorio que permite compartir código entre web, mobile y backend',
          'Un repositorio que solo contiene documentación',
          'Un sistema de backup de código',
        ],
        correctIndex: 1,
        explanation:
          'Un monorepo permite tener múltiples proyectos relacionados en un solo repositorio, facilitando compartir código entre diferentes aplicaciones.',
      },
      {
        id: 'q5-2',
        text: '¿Qué hace Turborepo para optimizar los builds en un monorepo?',
        options: [
          'Comprime los archivos automáticamente',
          'Cachea builds y ejecuta tareas en paralelo',
          'Elimina código no utilizado',
          'Convierte TypeScript a JavaScript más rápido',
        ],
        correctIndex: 1,
        explanation:
          'Turborepo cachea los resultados de builds y ejecuta tareas en paralelo cuando no hay dependencias entre ellas, acelerando significativamente el proceso.',
      },
      {
        id: 'q5-3',
        text: '¿Cuál es el principio fundamental de la arquitectura Feature-Based?',
        options: [
          'Agrupar código por tipo técnico (components, hooks, services)',
          'Agrupar código por dominio de negocio (auth, products, cart)',
          'Separar código frontend del backend',
          'Usar una carpeta por cada desarrollador',
        ],
        correctIndex: 1,
        explanation:
          'La arquitectura Feature-Based organiza el código por dominio de negocio, colocando todo lo relacionado a una feature (componentes, hooks, servicios) en una misma carpeta.',
      },
      {
        id: 'q5-4',
        text: '¿Cuál es la regla de importación entre features en una arquitectura Feature-Based?',
        options: [
          'Las features pueden importar cualquier archivo de otras features',
          'Las features solo deben importar desde el index.ts (API pública) de otras features',
          'Las features no pueden comunicarse entre sí',
          'Solo el administrador puede crear importaciones',
        ],
        correctIndex: 1,
        explanation:
          'Las features solo deben importar desde el archivo index.ts de otras features, que actúa como API pública y crea un contrato claro entre módulos.',
      },
      {
        id: 'q5-5',
        text: '¿Qué diferencia hay entre staleTime y gcTime en TanStack Query?',
        options: [
          'Son lo mismo, solo cambiaron el nombre',
          'staleTime define cuándo los datos se consideran obsoletos, gcTime cuánto tiempo permanecen en cache',
          'staleTime es para mutaciones, gcTime para queries',
          'gcTime es más rápido que staleTime',
        ],
        correctIndex: 1,
        explanation:
          'staleTime define el tiempo que los datos se consideran "frescos" antes de hacer refetch. gcTime (antes cacheTime) define cuánto permanecen en cache antes de ser eliminados.',
      },
      {
        id: 'q5-6',
        text: '¿Qué es un "optimistic update" en TanStack Query?',
        options: [
          'Una actualización que siempre funciona',
          'Actualizar la UI inmediatamente antes de recibir la respuesta del servidor',
          'Una forma de actualizar múltiples queries a la vez',
          'Un tipo especial de cache',
        ],
        correctIndex: 1,
        explanation:
          'Un optimistic update actualiza la UI inmediatamente asumiendo que la operación tendrá éxito, y revierte si hay error, mejorando la percepción de velocidad.',
      },
      {
        id: 'q5-7',
        text: '¿Cuál es la principal ventaja de Zustand sobre Context API para estado global?',
        options: [
          'Tiene más features',
          'Es más fácil de configurar',
          'No causa re-renders innecesarios gracias a los selectores',
          'Es más antiguo y probado',
        ],
        correctIndex: 2,
        explanation:
          'Zustand permite usar selectores que solo suscriben al componente a partes específicas del estado, evitando re-renders cuando otras partes del estado cambian.',
      },
      {
        id: 'q5-8',
        text: '¿Cómo se accede al estado de Zustand fuera de componentes React?',
        options: [
          'No es posible',
          'Usando useStore.getState()',
          'Con un provider especial',
          'Importando directamente el estado',
        ],
        correctIndex: 1,
        explanation:
          'Zustand expone getState() que permite leer el estado actual fuera de componentes React, útil en servicios, utils, o event handlers.',
      },
      {
        id: 'q5-9',
        text: '¿Qué se debe evitar enviar frecuentemente a través del Bridge de Capacitor?',
        options: [
          'Strings cortos',
          'Números',
          'Objetos grandes o datos binarios (base64)',
          'Booleans',
        ],
        correctIndex: 2,
        explanation:
          'Los datos que cruzan el Bridge se serializan a JSON, por lo que enviar objetos grandes o datos binarios frecuentemente puede afectar el rendimiento.',
      },
      {
        id: 'q5-10',
        text: '¿Qué técnica de React mejora el rendimiento de listas largas mostrando solo elementos visibles?',
        options: [
          'Lazy loading',
          'Code splitting',
          'Virtualización',
          'Memoización',
        ],
        correctIndex: 2,
        explanation:
          'La virtualización (con librerías como @tanstack/react-virtual) renderiza solo los elementos visibles en el viewport, mejorando drasticamente el rendimiento de listas largas.',
      },
    ],
  },
  // Quiz Module 6: Seguridad en Apps Móviles
  {
    id: 'quiz-module-6',
    moduleId: 'module-6',
    passingScore: 70,
    xpReward: 25,
    questions: [
      {
        id: 'q6-1',
        text: '¿Cuál es la principal ventaja de usar autenticación biométrica en apps móviles?',
        options: [
          'Reemplaza completamente la necesidad de contraseñas',
          'Es más barata de implementar',
          'Mejora la UX al ser más rápida y segura que teclear contraseñas',
          'No requiere ninguna configuración especial',
        ],
        correctIndex: 2,
        explanation:
          'La biometría mejora la experiencia de usuario al ser más rápida y conveniente, además de ser más segura que contraseñas que pueden ser robadas o adivinadas. Sin embargo, siempre debe tener un fallback.',
      },
      {
        id: 'q6-2',
        text: '¿Qué problema resuelve PKCE en el flujo OAuth 2.0?',
        options: [
          'Hace que el login sea más rápido',
          'Protege contra interceptación del authorization code en apps públicas',
          'Elimina la necesidad de refresh tokens',
          'Permite usar OAuth sin internet',
        ],
        correctIndex: 1,
        explanation:
          'PKCE (Proof Key for Code Exchange) añade un desafío criptográfico que previene ataques donde un atacante intercepta el authorization code antes de que la app legítima pueda canjearlo.',
      },
      {
        id: 'q6-3',
        text: '¿Por qué NO se debe usar localStorage para almacenar tokens de acceso en apps Capacitor?',
        options: [
          'Porque localStorage es muy lento',
          'Porque localStorage tiene límite de tamaño',
          'Porque los datos se almacenan en texto plano sin cifrado',
          'Porque no funciona en iOS',
        ],
        correctIndex: 2,
        explanation:
          'localStorage almacena datos en texto plano, fácilmente accesibles mediante ingeniería inversa o en dispositivos rooteados. Los tokens deben almacenarse en Keychain (iOS) o EncryptedSharedPreferences (Android).',
      },
      {
        id: 'q6-4',
        text: '¿Qué es SSL Pinning y por qué es importante?',
        options: [
          'Un método para comprimir datos SSL',
          'Verificar que el certificado del servidor coincide con uno conocido, previniendo ataques MITM',
          'Una forma de acelerar conexiones HTTPS',
          'Un tipo de autenticación de dos factores',
        ],
        correctIndex: 1,
        explanation:
          'SSL Pinning verifica que el certificado del servidor coincide con uno pre-definido ("pineado") en la app, evitando que atacantes intercepten el tráfico usando certificados falsos de CAs comprometidas.',
      },
      {
        id: 'q6-5',
        text: '¿Por qué es importante incluir un pin de backup en SSL Pinning?',
        options: [
          'Para tener mejor rendimiento',
          'Porque iOS lo requiere',
          'Para evitar que la app deje de funcionar cuando el certificado expire o cambie',
          'Para poder usar múltiples servidores',
        ],
        correctIndex: 2,
        explanation:
          'Si el único certificado pineado expira o cambia sin un backup, la app rechazará todas las conexiones. El pin de backup del nuevo certificado permite rotación segura.',
      },
      {
        id: 'q6-6',
        text: '¿Qué técnica de hardening dificulta la ingeniería inversa del código JavaScript en apps Capacitor?',
        options: [
          'Minificación únicamente',
          'Obfuscación de código con herramientas como javascript-obfuscator',
          'Compresión gzip',
          'Usar TypeScript',
        ],
        correctIndex: 1,
        explanation:
          'La obfuscación transforma el código para hacerlo difícil de entender: renombra variables, aplana el flujo de control, inyecta código muerto, cifra strings, etc. La minificación solo reduce el tamaño.',
      },
      {
        id: 'q6-7',
        text: '¿Qué debe hacer una app de alta seguridad cuando detecta que el dispositivo está rooteado/jailbroken?',
        options: [
          'Ignorarlo porque no afecta la seguridad',
          'Mostrar una advertencia pero continuar funcionando',
          'Bloquear el acceso o degradar funcionalidad sensible según el nivel de riesgo',
          'Borrar todos los datos inmediatamente',
        ],
        correctIndex: 2,
        explanation:
          'Apps de alta seguridad (fintech, salud) deben evaluar el riesgo y responder apropiadamente: bloquear acceso, deshabilitar funciones sensibles, o al menos advertir al usuario según la política de seguridad.',
      },
      {
        id: 'q6-8',
        text: 'Según OWASP Mobile Top 10, ¿cuál es la vulnerabilidad M2?',
        options: [
          'Uso impropio de la plataforma',
          'Almacenamiento inseguro de datos',
          'Comunicación insegura',
          'Autenticación insegura',
        ],
        correctIndex: 1,
        explanation:
          'M2 (Insecure Data Storage) se refiere a almacenar datos sensibles de forma insegura, como guardar tokens en localStorage o logs que contienen información personal.',
      },
      {
        id: 'q6-9',
        text: '¿Qué configuración de WebView es crítica deshabilitar en producción en Android?',
        options: [
          'JavaScript',
          'Cookies',
          'webContentsDebuggingEnabled',
          'Mixed content',
        ],
        correctIndex: 2,
        explanation:
          'webContentsDebuggingEnabled permite inspeccionar el WebView con Chrome DevTools. En producción debe estar en false para prevenir que atacantes inspeccionen y manipulen el contenido de la app.',
      },
      {
        id: 'q6-10',
        text: '¿Qué herramienta se recomienda para detectar vulnerabilidades en dependencias npm?',
        options: [
          'ESLint',
          'Prettier',
          'npm audit o Snyk',
          'TypeScript',
        ],
        correctIndex: 2,
        explanation:
          'npm audit (integrado) y Snyk analizan las dependencias del proyecto y reportan vulnerabilidades conocidas con sus niveles de severidad y recomendaciones de actualización.',
      },
    ],
  },
  // Quiz Module 11: Deep Linking
  {
    id: 'quiz-module-11',
    moduleId: 'module-11',
    passingScore: 70,
    xpReward: 25,
    questions: [
      {
        id: 'q11-1',
        text: '¿Cuál es la principal diferencia entre Universal Links y Custom URL Schemes?',
        options: [
          'Universal Links son solo para iOS, Custom URL Schemes solo para Android',
          'Universal Links funcionan sin instalar la app, Custom URL Schemes requieren la app instalada',
          'Universal Links son más seguros y verificados por el sistema, Custom URL Schemes no requieren verificación',
          'No hay diferencia, son términos intercambiables',
        ],
        correctIndex: 2,
        explanation:
          'Universal Links (iOS) y App Links (Android) requieren verificación del dominio mediante archivos del servidor, ofreciendo mayor seguridad. Custom URL Schemes (miapp://) pueden ser registrados por cualquier app sin verificación.',
      },
      {
        id: 'q11-2',
        text: '¿Qué es un archivo AASA y dónde debe estar hospedado?',
        options: [
          'Un archivo de configuración de Android, en el directorio /assets/',
          'Apple App Site Association, en https://dominio.com/.well-known/apple-app-site-association',
          'Un certificado SSL para la app',
          'Un archivo de metadatos para la App Store',
        ],
        correctIndex: 1,
        explanation:
          'El archivo AASA (Apple App Site Association) es un JSON que asocia tu dominio con tu app iOS. Debe estar en https://tudominio.com/.well-known/apple-app-site-association y ser servido con content-type application/json.',
      },
      {
        id: 'q11-3',
        text: '¿Qué campo del archivo AASA vincula las rutas del sitio web con la app?',
        options: [
          'webcredentials',
          'applinks',
          'activitycontinuation',
          'urlrouting',
        ],
        correctIndex: 1,
        explanation:
          'El campo "applinks" en el archivo AASA especifica qué rutas (paths) del dominio deben abrir la app. También incluye el appID (Team ID + Bundle ID) para vincular correctamente.',
      },
      {
        id: 'q11-4',
        text: '¿Qué elemento de AndroidManifest.xml se usa para configurar App Links?',
        options: [
          '<activity> con atributo android:deepLink',
          '<intent-filter> con android:autoVerify="true" y categoría BROWSABLE',
          '<meta-data> con nombre deeplink.config',
          '<receiver> con action VIEW',
        ],
        correctIndex: 1,
        explanation:
          'Se usa <intent-filter> dentro de <activity> con android:autoVerify="true", action VIEW, categoría DEFAULT y BROWSABLE, más <data> especificando el scheme, host y pathPrefix.',
      },
      {
        id: 'q11-5',
        text: '¿Cómo se maneja un deep link en Capacitor?',
        options: [
          'Mediante el evento window.location.hash',
          'Con App.addListener("appUrlOpen", callback)',
          'Usando el plugin DeepLink.listen()',
          'A través de navigator.deeplink',
        ],
        correctIndex: 1,
        explanation:
          'En Capacitor se usa App.addListener("appUrlOpen", (data) => { ... }) para capturar deep links. El objeto data contiene la URL completa que abrió la app, permitiendo extraer parámetros y navegar.',
      },
      {
        id: 'q11-6',
        text: '¿Qué es deferred deep linking?',
        options: [
          'Deep links que expiran después de cierto tiempo',
          'Llevar al usuario a contenido específico DESPUÉS de instalar la app por primera vez',
          'Deep links que solo funcionan en modo diferido/offline',
          'Un método para postponer la apertura de links',
        ],
        correctIndex: 1,
        explanation:
          'Deferred deep linking permite que un usuario haga clic en un link, instale la app, y al abrirla por primera vez sea llevado al contenido específico del link original. Requiere SDKs especializados como Branch o Firebase.',
      },
      {
        id: 'q11-7',
        text: '¿Cuál es una ventaja de Branch.io sobre Firebase Dynamic Links?',
        options: [
          'Branch.io es gratuito, Firebase no',
          'Branch.io ofrece más analytics y atribución de marketing que Firebase Dynamic Links (descontinuado)',
          'Branch.io solo funciona en iOS',
          'Firebase Dynamic Links es más moderno',
        ],
        correctIndex: 1,
        explanation:
          'Firebase Dynamic Links fue descontinuado en 2023. Branch.io ofrece deep linking robusto, atribución de marketing, analytics detallados, A/B testing de links, y mejor soporte para casos de uso complejos.',
      },
      {
        id: 'q11-8',
        text: '¿Qué archivo debe servir Android para verificar App Links?',
        options: [
          'assetlinks.json en /.well-known/',
          'android-app-site-association.json',
          'app-links.json en /assets/',
          'digital-asset-links.xml',
        ],
        correctIndex: 0,
        explanation:
          'Android requiere un archivo assetlinks.json en https://dominio.com/.well-known/assetlinks.json que especifica qué apps (por package name y SHA256 del certificado) pueden manejar links del dominio.',
      },
      {
        id: 'q11-9',
        text: '¿Qué problema resuelven los Universal Links/App Links vs Custom URL Schemes?',
        options: [
          'Son más rápidos de implementar',
          'Evitan el prompt "Abrir con..." cuando la app no está instalada y previenen hijacking de esquemas',
          'Funcionan sin conexión a internet',
          'No requieren permisos especiales',
        ],
        correctIndex: 1,
        explanation:
          'Universal Links/App Links evitan el diálogo de confirmación, caen gracefully al navegador si la app no está instalada, y previenen que apps maliciosas registren el mismo custom scheme. Son verificados por el sistema operativo.',
      },
      {
        id: 'q11-10',
        text: '¿Cómo se prueba que un Universal Link está correctamente configurado en iOS?',
        options: [
          'Abriendo el link desde Safari en el mismo dispositivo',
          'Abriendo el link desde Notes, Messages o una app diferente (no Safari)',
          'Usando el navegador Chrome en iOS',
          'Ejecutando npm run test-deeplink',
        ],
        correctIndex: 1,
        explanation:
          'Los Universal Links NO funcionan si se abren desde Safari en la misma página (para permitir navegación web normal). Deben probarse desde Notes, Messages, Mail u otra app. También puedes usar long-press > Open in [App].',
      },
    ],
  },
  // Quiz Module 12: Hardware APIs
  {
    id: 'quiz-module-12',
    moduleId: 'module-12',
    passingScore: 70,
    xpReward: 25,
    questions: [
      {
        id: 'q12-1',
        text: '¿Cuál es la principal diferencia entre Bluetooth Classic y BLE (Bluetooth Low Energy)?',
        options: [
          'BLE tiene mayor alcance que Classic',
          'BLE consume significativamente menos energía, ideal para IoT y wearables',
          'Classic es más moderno que BLE',
          'BLE solo funciona en Android',
        ],
        correctIndex: 1,
        explanation:
          'BLE (Bluetooth 4.0+) fue diseñado para consumir mucha menos energía que Bluetooth Classic, siendo ideal para dispositivos que transmiten datos pequeños periódicamente como sensores, wearables y beacons.',
      },
      {
        id: 'q12-2',
        text: '¿Qué es un GATT Service en Bluetooth BLE?',
        options: [
          'Un protocolo de seguridad para conexiones Bluetooth',
          'Una colección de características (characteristics) que representan funcionalidad del dispositivo',
          'El nombre del dispositivo Bluetooth',
          'Un tipo de batería de bajo consumo',
        ],
        correctIndex: 1,
        explanation:
          'GATT (Generic Attribute Profile) Services son contenedores de características relacionadas. Por ejemplo, un "Heart Rate Service" contendría características como "Heart Rate Measurement" y "Body Sensor Location".',
      },
      {
        id: 'q12-3',
        text: '¿Qué es una Characteristic en el contexto de GATT?',
        options: [
          'La marca del dispositivo Bluetooth',
          'Un valor de dato específico que puede leerse, escribirse o notificarse (ej: temperatura, battery level)',
          'El color del LED del dispositivo',
          'El rango de conexión Bluetooth',
        ],
        correctIndex: 1,
        explanation:
          'Las Characteristics son puntos de datos individuales en un Service. Cada una tiene un UUID único, un valor, y propiedades (read, write, notify, indicate) que definen cómo interactuar con ella.',
      },
      {
        id: 'q12-4',
        text: '¿Qué permisos se necesitan en Android 12+ para usar la cámara?',
        options: [
          'Solo CAMERA',
          'CAMERA y WRITE_EXTERNAL_STORAGE',
          'CAMERA; el almacenamiento usa Scoped Storage sin permiso explícito',
          'No se necesitan permisos, es automático',
        ],
        correctIndex: 2,
        explanation:
          'Desde Android 10, Scoped Storage elimina la necesidad de WRITE_EXTERNAL_STORAGE para guardar fotos tomadas. Solo se requiere el permiso CAMERA. En iOS se necesita NSCameraUsageDescription en Info.plist.',
      },
      {
        id: 'q12-5',
        text: '¿Qué modo de precisión de geolocalización consume MENOS batería?',
        options: [
          'enableHighAccuracy: true con timeout corto',
          'enableHighAccuracy: false (usa WiFi/Cell towers en lugar de GPS)',
          'maximumAge: 0 para datos frescos',
          'GPS con actualización cada segundo',
        ],
        correctIndex: 1,
        explanation:
          'enableHighAccuracy: false usa triangulación de WiFi y torres celulares en lugar de GPS, siendo mucho más eficiente en batería. La precisión es menor (10-100m vs 5-10m) pero suficiente para muchos casos de uso.',
      },
      {
        id: 'q12-6',
        text: '¿Cuál es la diferencia entre acelerómetro y giroscopio?',
        options: [
          'El acelerómetro mide aceleración lineal (movimiento), el giroscopio mide rotación (orientación)',
          'Son lo mismo, solo cambia el nombre',
          'El giroscopio es más antiguo que el acelerómetro',
          'El acelerómetro solo funciona en iOS',
        ],
        correctIndex: 0,
        explanation:
          'El acelerómetro mide aceleración en ejes X, Y, Z (detecta movimiento, sacudidas, inclinación por gravedad). El giroscopio mide velocidad angular (rotación). Combinados permiten tracking preciso de orientación 3D.',
      },
      {
        id: 'q12-7',
        text: '¿Qué tipos de autenticación biométrica soporta iOS?',
        options: [
          'Solo Touch ID',
          'Solo Face ID',
          'Touch ID, Face ID, y Optic ID (Vision Pro)',
          'Touch ID y contraseña únicamente',
        ],
        correctIndex: 2,
        explanation:
          'iOS soporta Touch ID (huella digital), Face ID (reconocimiento facial 3D), y Optic ID (escaneo de iris en Vision Pro). La API LAContext abstrae esto como "biometric authentication" sin importar el método.',
      },
      {
        id: 'q12-8',
        text: '¿Cómo se llama el sistema de autenticación biométrica de Android?',
        options: [
          'TouchID',
          'BiometricPrompt API',
          'FingerprintManager',
          'AndroidBiometric',
        ],
        correctIndex: 1,
        explanation:
          'BiometricPrompt es la API moderna de Android (API 28+) que unifica huella, reconocimiento facial e iris. Reemplazó a FingerprintManager (deprecated) y maneja automáticamente el tipo de biometría disponible.',
      },
      {
        id: 'q12-9',
        text: '¿Qué diferencia hay entre Geolocation.getCurrentPosition() y watchPosition()?',
        options: [
          'getCurrentPosition obtiene la ubicación una vez, watchPosition la monitorea continuamente',
          'watchPosition es más rápido que getCurrentPosition',
          'getCurrentPosition requiere más permisos',
          'Son idénticos, solo alias diferentes',
        ],
        correctIndex: 0,
        explanation:
          'getCurrentPosition() obtiene la ubicación actual una sola vez. watchPosition() retorna un ID de watch que actualiza continuamente la posición, útil para navegación. Debe llamarse clearWatch(id) para detenerlo.',
      },
      {
        id: 'q12-10',
        text: '¿Qué configuración de iOS limita el acceso a Bluetooth en background?',
        options: [
          'No hay limitaciones, siempre funciona',
          'Requiere UIBackgroundModes con "bluetooth-central" y el usuario debe aprobar',
          'Bluetooth nunca funciona en background en iOS',
          'Solo funciona si la app está en foreground siempre',
        ],
        correctIndex: 1,
        explanation:
          'Para usar Bluetooth BLE en background en iOS, debes declarar UIBackgroundModes con "bluetooth-central" en Info.plist. Además, el sistema mostrará una barra azul indicando uso de Bluetooth en background.',
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
