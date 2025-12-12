interface ContentBlock {
  type: 'text' | 'code' | 'tip' | 'warning' | 'info' | 'success' | 'list'
  content?: string
  items?: string[]
  code?: string
  language?: string
  filename?: string
  highlightLines?: number[]
}

export const LESSON_CONTENT: Record<string, ContentBlock[]> = {
  'what-is-capacitor': [
    {
      type: 'text',
      content: '**Capacitor** es un runtime nativo moderno que permite ejecutar aplicaciones web de forma nativa en iOS, Android y la Web. Creado por el equipo de Ionic, Capacitor es el sucesor espiritual de Apache Cordova.',
    },
    {
      type: 'info',
      content: 'Capacitor te permite reutilizar tu código web existente y acceder a APIs nativas de forma sencilla.',
    },
    {
      type: 'text',
      content: 'A diferencia de otras soluciones, Capacitor adopta un enfoque "web-first", lo que significa que tu aplicación se ejecuta principalmente como una aplicación web dentro de un WebView nativo.',
    },
    {
      type: 'list',
      items: [
        'Acceso completo a APIs nativas de iOS y Android',
        'Compatible con cualquier framework web (React, Vue, Angular, etc.)',
        'Sistema de plugins extensible y moderno',
        'Soporte para Progressive Web Apps (PWA)',
        'Integración con herramientas de desarrollo nativas',
      ],
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar Capacitor en un proyecto existente
npm install @capacitor/core @capacitor/cli

# Inicializar Capacitor
npx cap init "Mi App" com.ejemplo.miapp

# Agregar plataformas
npx cap add android
npx cap add ios`,
    },
    {
      type: 'tip',
      content: 'Capacitor funciona con cualquier proyecto web que genere archivos estáticos. No necesitas usar Ionic Framework.',
    },
  ],

  'architecture': [
    {
      type: 'text',
      content: 'La arquitectura de Capacitor se basa en tres componentes principales: el **WebView**, el **Bridge** y los **Plugins nativos**.',
    },
    {
      type: 'text',
      content: 'El **WebView** es un componente nativo que renderiza tu aplicación web. En iOS usa WKWebView y en Android usa Android WebView (basado en Chromium).',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'Flujo de comunicación',
      code: `// Tu código JavaScript
import { Camera } from '@capacitor/camera';

// 1. Llamas a un plugin de Capacitor
const photo = await Camera.getPhoto({
  quality: 90,
  source: CameraSource.Camera
});

// 2. El Bridge envía el mensaje al código nativo
// 3. El código nativo ejecuta la operación
// 4. El resultado vuelve a JavaScript`,
      highlightLines: [4, 5, 6, 7],
    },
    {
      type: 'info',
      content: 'El Bridge de Capacitor utiliza comunicación asíncrona basada en Promises, lo que hace el código más limpio y fácil de manejar.',
    },
    {
      type: 'warning',
      content: 'El WebView no tiene acceso directo al hardware del dispositivo. Siempre necesitas usar plugins para acceder a funcionalidades nativas.',
    },
    {
      type: 'text',
      content: 'Los **Plugins** son el puente entre tu código JavaScript y las APIs nativas. Capacitor incluye plugins oficiales para las funcionalidades más comunes.',
    },
    {
      type: 'list',
      items: [
        'Camera - Acceso a la cámara y galería',
        'Geolocation - Ubicación del dispositivo',
        'Push Notifications - Notificaciones push',
        'Storage - Almacenamiento persistente',
        'Haptics - Retroalimentación háptica',
      ],
    },
  ],

  'project-structure': [
    {
      type: 'text',
      content: 'Un proyecto Capacitor tiene una estructura específica que combina tu aplicación web con los proyectos nativos de iOS y Android.',
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'Estructura del proyecto',
      code: `mi-app/
├── src/                    # Código fuente de tu app web
├── dist/                   # Build de producción (o www/, build/)
├── android/                # Proyecto nativo Android Studio
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── assets/www/ # Tu app web copiada aquí
│   │   │   └── java/       # Código nativo Android
│   │   └── build.gradle
│   └── capacitor.settings.gradle
├── ios/                    # Proyecto nativo Xcode
│   └── App/
│       ├── App/
│       │   └── public/     # Tu app web copiada aquí
│       └── Podfile
├── capacitor.config.ts     # Configuración de Capacitor
└── package.json`,
    },
    {
      type: 'success',
      content: 'Los archivos en android/ e ios/ son proyectos nativos completos que puedes abrir y modificar directamente en Android Studio y Xcode.',
    },
    {
      type: 'text',
      content: 'El archivo **capacitor.config.ts** es el corazón de la configuración:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'capacitor.config.ts',
      code: `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ejemplo.miapp',
  appName: 'Mi App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e'
    }
  }
};

export default config;`,
      highlightLines: [4, 5, 6],
    },
    {
      type: 'tip',
      content: 'Usa capacitor.config.ts en lugar de .json para tener autocompletado y validación de tipos.',
    },
  ],

  'commands': [
    {
      type: 'text',
      content: 'La CLI de Capacitor proporciona comandos esenciales para gestionar tu proyecto. Aquí están los más importantes:',
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'Comandos básicos',
      code: `# Inicializar Capacitor en un proyecto existente
npx cap init [appName] [appId]

# Agregar una plataforma nativa
npx cap add android
npx cap add ios

# Sincronizar tu app web con los proyectos nativos
npx cap sync

# Copiar solo los archivos web (sin actualizar plugins)
npx cap copy

# Abrir el proyecto en el IDE nativo
npx cap open android
npx cap open ios`,
    },
    {
      type: 'warning',
      content: 'Siempre ejecuta "npx cap sync" después de instalar nuevos plugins o actualizar dependencias nativas.',
    },
    {
      type: 'text',
      content: 'El comando **sync** es una combinación de **copy** + **update**:',
    },
    {
      type: 'list',
      items: [
        'copy: Copia tu build web a los proyectos nativos',
        'update: Actualiza los plugins nativos de Capacitor',
        'sync: Ejecuta copy y update juntos',
      ],
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'Flujo típico de desarrollo',
      code: `# 1. Hacer cambios en tu código web
# 2. Construir la app
npm run build

# 3. Sincronizar con las plataformas nativas
npx cap sync

# 4. Ejecutar en dispositivo/emulador
npx cap run android
npx cap run ios`,
      highlightLines: [5, 8],
    },
    {
      type: 'tip',
      content: 'Usa "npx cap run" en lugar de "npx cap open" para compilar y ejecutar directamente desde la terminal.',
    },
  ],

  'live-reload': [
    {
      type: 'text',
      content: 'El **Live Reload** te permite ver los cambios de tu código web en tiempo real mientras desarrollas en un dispositivo o emulador.',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'capacitor.config.ts',
      code: `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ejemplo.miapp',
  appName: 'Mi App',
  webDir: 'dist',
  server: {
    // Habilitar live reload apuntando a tu servidor de desarrollo
    url: 'http://192.168.1.100:5173',
    cleartext: true
  }
};

export default config;`,
      highlightLines: [8, 9, 10],
    },
    {
      type: 'warning',
      content: 'Usa tu IP local, no localhost. El dispositivo/emulador necesita conectarse a tu máquina de desarrollo.',
    },
    {
      type: 'text',
      content: 'Pasos para configurar Live Reload:',
    },
    {
      type: 'list',
      items: [
        'Obtén tu IP local (ifconfig o ipconfig)',
        'Configura la URL del servidor en capacitor.config.ts',
        'Inicia tu servidor de desarrollo (npm run dev)',
        'Ejecuta npx cap sync para aplicar la configuración',
        'Abre y ejecuta la app en el IDE nativo',
      ],
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Obtener IP en Mac/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Obtener IP en Windows
ipconfig | findstr IPv4`,
    },
    {
      type: 'success',
      content: 'Con Live Reload configurado, cada vez que guardes un archivo, la app se recargará automáticamente en el dispositivo.',
    },
    {
      type: 'tip',
      content: 'Recuerda eliminar la configuración de server.url antes de hacer un build de producción.',
    },
  ],

  // =====================
  // MÓDULO 2: Plugins Core + Web-to-Native Bridge
  // =====================

  'app-plugin': [
    {
      type: 'text',
      content: 'El **App Plugin** es el plugin más fundamental de Capacitor. Proporciona acceso a información básica de la aplicación y eventos del ciclo de vida.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar el plugin App
npm install @capacitor/app
npx cap sync`,
    },
    {
      type: 'text',
      content: 'Con este plugin puedes detectar cuándo la app entra en segundo plano, vuelve al primer plano, o manejar el botón de retroceso en Android.',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/app-lifecycle.ts',
      code: `import { App } from '@capacitor/app';

// Escuchar cuando la app pasa a segundo plano
App.addListener('appStateChange', ({ isActive }) => {
  console.log('App activa:', isActive);

  if (!isActive) {
    // Guardar estado, pausar timers, etc.
    saveAppState();
  } else {
    // Restaurar estado, reanudar operaciones
    restoreAppState();
  }
});

// Manejar el botón de retroceso en Android
App.addListener('backButton', ({ canGoBack }) => {
  if (canGoBack) {
    window.history.back();
  } else {
    // Mostrar diálogo de confirmación para salir
    showExitConfirmation();
  }
});`,
      highlightLines: [4, 5, 15, 16],
    },
    {
      type: 'info',
      content: 'El evento backButton solo funciona en Android. En iOS, el sistema maneja la navegación de forma diferente.',
    },
    {
      type: 'text',
      content: 'También puedes obtener información útil de la app y abrir URLs externas:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/app-info.ts',
      code: `import { App } from '@capacitor/app';

// Obtener información de la app
const getAppInfo = async () => {
  const info = await App.getInfo();
  console.log('Nombre:', info.name);
  console.log('ID:', info.id);
  console.log('Versión:', info.version);
  console.log('Build:', info.build);
};

// Obtener estado de la app
const state = await App.getState();
console.log('¿Está activa?', state.isActive);

// Abrir URL externa en el navegador
await App.openUrl({ url: 'https://capacitorjs.com' });

// Minimizar la app (solo Android)
await App.minimizeApp();

// Salir de la app (solo Android)
await App.exitApp();`,
      highlightLines: [4, 5, 6, 7, 8],
    },
    {
      type: 'warning',
      content: 'exitApp() y minimizeApp() solo funcionan en Android. En iOS, Apple no permite que las apps se cierren programáticamente.',
    },
    {
      type: 'tip',
      content: 'Usa el evento appStateChange para pausar operaciones costosas (como animaciones o polling) cuando la app no está visible.',
    },
  ],

  'push-notifications': [
    {
      type: 'text',
      content: 'Las **Push Notifications** permiten enviar mensajes a los usuarios incluso cuando la app no está activa. Capacitor proporciona un plugin oficial para manejar notificaciones en iOS y Android.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar el plugin de Push Notifications
npm install @capacitor/push-notifications
npx cap sync`,
    },
    {
      type: 'warning',
      content: 'Para usar push notifications necesitas configurar Firebase Cloud Messaging (Android) y Apple Push Notification service (iOS).',
    },
    {
      type: 'text',
      content: 'El flujo básico para implementar push notifications:',
    },
    {
      type: 'list',
      items: [
        'Solicitar permisos al usuario',
        'Registrar el dispositivo y obtener el token',
        'Enviar el token a tu servidor',
        'Manejar las notificaciones entrantes',
      ],
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/push-notifications.ts',
      code: `import { PushNotifications } from '@capacitor/push-notifications';

// Solicitar permisos
const requestPermissions = async () => {
  const permission = await PushNotifications.requestPermissions();

  if (permission.receive === 'granted') {
    // Registrar el dispositivo
    await PushNotifications.register();
  } else {
    console.log('Permisos de notificaciones denegados');
  }
};

// Escuchar cuando se obtiene el token
PushNotifications.addListener('registration', (token) => {
  console.log('Token de push:', token.value);
  // Enviar el token a tu servidor
  sendTokenToServer(token.value);
});

// Manejar errores de registro
PushNotifications.addListener('registrationError', (error) => {
  console.error('Error de registro:', error);
});

// Notificación recibida mientras la app está abierta
PushNotifications.addListener('pushNotificationReceived', (notification) => {
  console.log('Notificación recibida:', notification);
  // Mostrar notificación in-app
  showInAppNotification(notification);
});

// Usuario tocó una notificación
PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
  console.log('Acción de notificación:', action);
  // Navegar a la sección correspondiente
  handleNotificationAction(action.notification.data);
});`,
      highlightLines: [5, 6, 16, 17, 27, 28],
    },
    {
      type: 'info',
      content: 'El token de push es único para cada dispositivo y puede cambiar. Siempre actualiza el token en tu servidor cuando se emita uno nuevo.',
    },
    {
      type: 'text',
      content: 'Para Android, necesitas agregar tu archivo google-services.json y para iOS, configurar el certificado de APNs en el Apple Developer Portal.',
    },
    {
      type: 'tip',
      content: 'Usa Firebase Cloud Messaging (FCM) como backend único para simplificar el envío de notificaciones a ambas plataformas.',
    },
  ],

  'splash-statusbar': [
    {
      type: 'text',
      content: 'El **Splash Screen** y la **Status Bar** son elementos visuales importantes para la experiencia del usuario. Capacitor proporciona plugins para personalizar ambos.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar plugins
npm install @capacitor/splash-screen @capacitor/status-bar
npx cap sync`,
    },
    {
      type: 'text',
      content: 'El Splash Screen se muestra mientras tu app carga. Puedes controlar su duración y animación:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'capacitor.config.ts',
      code: `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ejemplo.miapp',
  appName: 'Mi App',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#1a1a2e',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;`,
      highlightLines: [8, 9, 10, 11],
    },
    {
      type: 'text',
      content: 'También puedes controlar el splash screen programáticamente:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/splash.ts',
      code: `import { SplashScreen } from '@capacitor/splash-screen';

// Ocultar splash manualmente después de cargar datos
const initializeApp = async () => {
  try {
    await loadUserData();
    await loadInitialContent();
  } finally {
    // Ocultar splash cuando todo esté listo
    await SplashScreen.hide();
  }
};

// Mostrar splash (útil para transiciones)
await SplashScreen.show({
  showDuration: 1500,
  autoHide: true,
});`,
      highlightLines: [9, 10],
    },
    {
      type: 'text',
      content: 'La Status Bar puede personalizarse para que coincida con el diseño de tu app:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/statusbar.ts',
      code: `import { StatusBar, Style } from '@capacitor/status-bar';

// Cambiar estilo de la status bar
const setStatusBarStyle = async (isDarkMode: boolean) => {
  await StatusBar.setStyle({
    style: isDarkMode ? Style.Dark : Style.Light,
  });
};

// Cambiar color de fondo (solo Android)
await StatusBar.setBackgroundColor({ color: '#1a1a2e' });

// Ocultar status bar
await StatusBar.hide();

// Mostrar status bar
await StatusBar.show();

// Hacer la status bar overlay el contenido
await StatusBar.setOverlaysWebView({ overlay: true });`,
      highlightLines: [5, 6, 11],
    },
    {
      type: 'warning',
      content: 'setBackgroundColor() solo funciona en Android. En iOS, el color de la status bar depende del estilo (Dark/Light).',
    },
    {
      type: 'tip',
      content: 'Configura launchAutoHide: false si necesitas hacer tareas asíncronas antes de mostrar la app, y llama a hide() manualmente.',
    },
  ],

  'keyboard-browser': [
    {
      type: 'text',
      content: 'El **Keyboard Plugin** te permite controlar el comportamiento del teclado virtual, mientras que el **Browser Plugin** permite abrir URLs en un navegador in-app.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar plugins
npm install @capacitor/keyboard @capacitor/browser
npx cap sync`,
    },
    {
      type: 'text',
      content: 'El plugin de Keyboard es esencial para manejar inputs en dispositivos móviles:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/keyboard.ts',
      code: `import { Keyboard } from '@capacitor/keyboard';

// Escuchar cuando el teclado se muestra
Keyboard.addListener('keyboardWillShow', (info) => {
  console.log('Altura del teclado:', info.keyboardHeight);
  // Ajustar scroll o padding del contenedor
  adjustLayoutForKeyboard(info.keyboardHeight);
});

// Escuchar cuando el teclado se oculta
Keyboard.addListener('keyboardWillHide', () => {
  // Restaurar layout
  resetLayout();
});

// Ocultar teclado programáticamente
const hideKeyboard = async () => {
  await Keyboard.hide();
};

// Mostrar teclado (enfocar un input)
const showKeyboard = async () => {
  await Keyboard.show();
};`,
      highlightLines: [4, 5, 11, 12],
    },
    {
      type: 'info',
      content: 'Los eventos keyboardWillShow/Hide se disparan antes de la animación del teclado, permitiéndote sincronizar animaciones.',
    },
    {
      type: 'text',
      content: 'También puedes configurar el comportamiento del teclado en capacitor.config.ts:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'capacitor.config.ts',
      code: `const config: CapacitorConfig = {
  plugins: {
    Keyboard: {
      resize: 'body', // 'body' | 'ionic' | 'native' | 'none'
      style: 'dark', // 'dark' | 'light'
      resizeOnFullScreen: true,
    },
  },
};`,
      highlightLines: [4, 5],
    },
    {
      type: 'text',
      content: 'El Browser Plugin permite abrir URLs en un navegador in-app con mejor UX que redirigir al navegador del sistema:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/browser.ts',
      code: `import { Browser } from '@capacitor/browser';

// Abrir URL en navegador in-app
const openInAppBrowser = async (url: string) => {
  await Browser.open({
    url: url,
    windowName: '_blank',
    presentationStyle: 'popover', // iOS
    toolbarColor: '#1a1a2e',
  });
};

// Escuchar cuando el navegador se cierra
Browser.addListener('browserFinished', () => {
  console.log('Navegador cerrado');
  // Verificar si el usuario completó un flujo OAuth, etc.
});

// Escuchar cambios de URL
Browser.addListener('browserPageLoaded', () => {
  console.log('Página cargada');
});

// Cerrar navegador programáticamente
await Browser.close();`,
      highlightLines: [5, 6, 7, 8, 9],
    },
    {
      type: 'tip',
      content: 'Usa Browser.open() para flujos de OAuth, términos y condiciones, o cualquier contenido externo que no quieras cargar en tu WebView principal.',
    },
  ],

  'preferences': [
    {
      type: 'text',
      content: 'El **Preferences Plugin** (anteriormente Storage) proporciona almacenamiento persistente de clave-valor, perfecto para guardar configuraciones de usuario y datos pequeños.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar el plugin
npm install @capacitor/preferences
npx cap sync`,
    },
    {
      type: 'info',
      content: 'Preferences usa SharedPreferences en Android y UserDefaults en iOS, garantizando persistencia nativa.',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/storage.ts',
      code: `import { Preferences } from '@capacitor/preferences';

// Guardar un valor
const saveData = async (key: string, value: string) => {
  await Preferences.set({ key, value });
};

// Guardar objetos (serializar a JSON)
const saveObject = async (key: string, data: object) => {
  await Preferences.set({
    key,
    value: JSON.stringify(data),
  });
};

// Obtener un valor
const getData = async (key: string): Promise<string | null> => {
  const { value } = await Preferences.get({ key });
  return value;
};

// Obtener un objeto
const getObject = async <T>(key: string): Promise<T | null> => {
  const { value } = await Preferences.get({ key });
  return value ? JSON.parse(value) : null;
};

// Eliminar un valor
const removeData = async (key: string) => {
  await Preferences.remove({ key });
};

// Limpiar todo el storage
const clearAll = async () => {
  await Preferences.clear();
};

// Obtener todas las keys
const getAllKeys = async () => {
  const { keys } = await Preferences.keys();
  return keys;
};`,
      highlightLines: [4, 5, 17, 18, 23, 24],
    },
    {
      type: 'text',
      content: 'Ejemplo práctico: guardar preferencias de usuario',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/user-preferences.ts',
      code: `interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  fontSize: number;
}

const SETTINGS_KEY = 'user_settings';

export const userPreferences = {
  async get(): Promise<UserSettings> {
    const { value } = await Preferences.get({ key: SETTINGS_KEY });
    return value ? JSON.parse(value) : {
      theme: 'system',
      language: 'es',
      notifications: true,
      fontSize: 16,
    };
  },

  async set(settings: Partial<UserSettings>) {
    const current = await this.get();
    const updated = { ...current, ...settings };
    await Preferences.set({
      key: SETTINGS_KEY,
      value: JSON.stringify(updated),
    });
  },

  async reset() {
    await Preferences.remove({ key: SETTINGS_KEY });
  },
};`,
      highlightLines: [11, 12, 21, 22, 23],
    },
    {
      type: 'warning',
      content: 'Preferences no está diseñado para datos grandes. Para archivos o bases de datos, usa plugins específicos como Filesystem o SQLite.',
    },
    {
      type: 'tip',
      content: 'Crea un wrapper con TypeScript generics para tener type-safety en todas las operaciones de storage.',
    },
  ],

  'biometric': [
    {
      type: 'text',
      content: 'La **autenticación biométrica** permite a los usuarios autenticarse usando Face ID, Touch ID o huella dactilar. Es esencial para apps con datos sensibles como finanzas o salud.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar plugin de autenticación nativa
npm install @capgo/capacitor-native-biometric
npx cap sync`,
    },
    {
      type: 'warning',
      content: 'Este plugin requiere configuración adicional en los proyectos nativos para manejar permisos de biometría.',
    },
    {
      type: 'text',
      content: 'Primero, verifica si el dispositivo soporta autenticación biométrica:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/biometric-auth.ts',
      code: `import { NativeBiometric, BiometryType } from '@capgo/capacitor-native-biometric';

// Verificar disponibilidad de biometría
const checkBiometricAvailability = async () => {
  const result = await NativeBiometric.isAvailable();

  if (result.isAvailable) {
    console.log('Tipo de biometría:', result.biometryType);
    // BiometryType.FACE_ID, BiometryType.TOUCH_ID,
    // BiometryType.FINGERPRINT, BiometryType.IRIS
    return result.biometryType;
  }

  return null;
};

// Autenticar con biometría
const authenticateWithBiometric = async (): Promise<boolean> => {
  try {
    await NativeBiometric.verifyIdentity({
      reason: 'Por favor, autentícate para continuar',
      title: 'Autenticación',
      subtitle: 'Usa tu huella o rostro',
      description: 'Acceso seguro a tu cuenta',
      maxAttempts: 3,
    });
    return true;
  } catch (error) {
    console.error('Error de autenticación:', error);
    return false;
  }
};`,
      highlightLines: [5, 6, 19, 20, 21, 22, 23],
    },
    {
      type: 'text',
      content: 'El plugin también permite almacenar credenciales de forma segura usando el Keychain (iOS) o Keystore (Android):',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/secure-storage.ts',
      code: `// Guardar credenciales de forma segura
const saveCredentials = async (username: string, password: string) => {
  await NativeBiometric.setCredentials({
    username,
    password,
    server: 'com.miapp.auth',
  });
};

// Obtener credenciales con autenticación biométrica
const getCredentials = async () => {
  // Primero autenticar
  const authenticated = await authenticateWithBiometric();

  if (authenticated) {
    const credentials = await NativeBiometric.getCredentials({
      server: 'com.miapp.auth',
    });
    return credentials;
  }

  return null;
};

// Eliminar credenciales
const deleteCredentials = async () => {
  await NativeBiometric.deleteCredentials({
    server: 'com.miapp.auth',
  });
};`,
      highlightLines: [3, 4, 5, 6, 15, 16],
    },
    {
      type: 'info',
      content: 'Las credenciales almacenadas en el Keychain/Keystore están encriptadas y protegidas por el hardware del dispositivo.',
    },
    {
      type: 'text',
      content: 'Configuración necesaria en iOS (Info.plist):',
    },
    {
      type: 'code',
      language: 'xml',
      filename: 'ios/App/App/Info.plist',
      code: `<key>NSFaceIDUsageDescription</key>
<string>Usamos Face ID para autenticación segura</string>`,
    },
    {
      type: 'tip',
      content: 'Siempre ofrece una alternativa (PIN o contraseña) para usuarios que no tengan o no quieran usar biometría.',
    },
  ],

  // =====================
  // MÓDULO 3: Desarrollo + Build Processes
  // =====================

  'web-integration': [
    {
      type: 'text',
      content: 'Capacitor se integra perfectamente con cualquier framework web moderno. La clave está en configurar correctamente el **webDir** y entender cómo fluyen los datos entre tu app web y los componentes nativos.',
    },
    {
      type: 'info',
      content: 'Capacitor soporta React, Vue, Angular, Svelte, y cualquier framework que genere archivos estáticos.',
    },
    {
      type: 'text',
      content: 'Configuración para diferentes frameworks:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'capacitor.config.ts',
      code: `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ejemplo.miapp',
  appName: 'Mi App',
  // El directorio donde está tu build de producción
  webDir: 'dist',      // Vite, Vue CLI
  // webDir: 'build',  // Create React App
  // webDir: 'www',    // Angular CLI
  // webDir: 'out',    // Next.js static export
};

export default config;`,
      highlightLines: [7, 8, 9, 10],
    },
    {
      type: 'text',
      content: 'Para detectar si tu app está corriendo en un contexto nativo o web:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/utils/platform.ts',
      code: `import { Capacitor } from '@capacitor/core';

// Verificar plataforma
export const isNative = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform(); // 'ios' | 'android' | 'web'

// Uso condicional de APIs
const takePicture = async () => {
  if (isNative) {
    // Usar plugin nativo de cámara
    const { Camera } = await import('@capacitor/camera');
    return Camera.getPhoto({
      quality: 90,
      source: CameraSource.Camera,
    });
  } else {
    // Fallback para web
    return useWebCamera();
  }
};

// Verificar si un plugin está disponible
const isPluginAvailable = Capacitor.isPluginAvailable('Camera');`,
      highlightLines: [4, 5, 9, 10],
    },
    {
      type: 'text',
      content: 'Manejo de deep links y URLs personalizadas:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/deep-links.ts',
      code: `import { App } from '@capacitor/app';

// Escuchar deep links (URL schemes personalizados)
App.addListener('appUrlOpen', ({ url }) => {
  console.log('App abierta con URL:', url);

  // Parsear la URL y navegar
  const path = new URL(url).pathname;

  // Ejemplo: miapp://producto/123
  if (path.startsWith('/producto/')) {
    const productId = path.split('/')[2];
    navigateToProduct(productId);
  }
});

// Configurar URL scheme en capacitor.config.ts
// android: scheme en AndroidManifest.xml
// iOS: scheme en Info.plist`,
      highlightLines: [4, 5, 10, 11, 12],
    },
    {
      type: 'tip',
      content: 'Usa Capacitor.isNativePlatform() para habilitar funciones nativas solo cuando la app corre en dispositivos reales.',
    },
  ],

  'native-features': [
    {
      type: 'text',
      content: 'Capacitor proporciona acceso a funcionalidades nativas del dispositivo que no están disponibles en la web estándar. Veamos cómo usar las más comunes.',
    },
    {
      type: 'text',
      content: '**Cámara y Galería:**',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/features/camera.ts',
      code: `import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// Tomar foto con la cámara
const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri, // o Base64, DataUrl
    source: CameraSource.Camera,
    saveToGallery: true,
  });

  return image.webPath; // URL utilizable en <img src>
};

// Seleccionar de galería
const pickFromGallery = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Base64,
    source: CameraSource.Photos,
  });

  return \`data:image/jpeg;base64,\${image.base64String}\`;
};`,
      highlightLines: [5, 6, 7, 8, 9, 10],
    },
    {
      type: 'text',
      content: '**Geolocalización:**',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/features/location.ts',
      code: `import { Geolocation } from '@capacitor/geolocation';

// Obtener ubicación actual
const getCurrentPosition = async () => {
  const permission = await Geolocation.requestPermissions();

  if (permission.location === 'granted') {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
    };
  }

  throw new Error('Permiso de ubicación denegado');
};

// Seguimiento continuo de ubicación
const watchId = await Geolocation.watchPosition(
  { enableHighAccuracy: true },
  (position, err) => {
    if (position) {
      updateMapMarker(position.coords);
    }
  }
);

// Detener seguimiento
await Geolocation.clearWatch({ id: watchId });`,
      highlightLines: [5, 8, 9, 10, 23, 24],
    },
    {
      type: 'text',
      content: '**Haptics (Vibración):**',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/features/haptics.ts',
      code: `import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

// Vibración de impacto (para toques)
await Haptics.impact({ style: ImpactStyle.Medium });
// ImpactStyle: Heavy, Medium, Light

// Vibración de notificación
await Haptics.notification({ type: NotificationType.Success });
// NotificationType: Success, Warning, Error

// Vibración personalizada
await Haptics.vibrate({ duration: 300 });

// Selección (feedback sutil)
await Haptics.selectionStart();
// ... durante la selección
await Haptics.selectionChanged();
// ... al finalizar
await Haptics.selectionEnd();`,
      highlightLines: [4, 8, 12],
    },
    {
      type: 'warning',
      content: 'Siempre verifica los permisos antes de usar funcionalidades como cámara o ubicación. El usuario puede denegarlos.',
    },
    {
      type: 'tip',
      content: 'Usa Haptics para dar feedback táctil en acciones importantes como confirmaciones o errores.',
    },
  ],

  'android-build': [
    {
      type: 'text',
      content: 'Generar un build de Android para producción requiere varios pasos: compilar la app web, sincronizar con Capacitor, y crear el APK o AAB firmado.',
    },
    {
      type: 'text',
      content: 'Primero, asegúrate de tener configurado tu proyecto correctamente:',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# 1. Compilar tu app web
npm run build

# 2. Sincronizar con el proyecto nativo
npx cap sync android

# 3. Abrir en Android Studio
npx cap open android`,
    },
    {
      type: 'text',
      content: 'Para publicar en Google Play, necesitas crear un **Android App Bundle (AAB)** firmado:',
    },
    {
      type: 'list',
      items: [
        'Generar un keystore para firmar la app',
        'Configurar la firma en build.gradle',
        'Generar el AAB desde Android Studio',
        'Subir a Google Play Console',
      ],
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'Generar keystore',
      code: `# Generar keystore (solo una vez, ¡guárdalo seguro!)
keytool -genkey -v -keystore mi-app-release.keystore \\
  -alias mi-app-alias \\
  -keyalg RSA \\
  -keysize 2048 \\
  -validity 10000

# Te pedirá:
# - Contraseña del keystore
# - Datos de la organización
# - Contraseña de la key`,
    },
    {
      type: 'warning',
      content: 'NUNCA pierdas tu keystore ni olvides la contraseña. Sin ellos no podrás actualizar tu app en Google Play.',
    },
    {
      type: 'text',
      content: 'Configurar la firma en el proyecto Android:',
    },
    {
      type: 'code',
      language: 'groovy',
      filename: 'android/app/build.gradle',
      code: `android {
    signingConfigs {
        release {
            storeFile file('../keystores/mi-app-release.keystore')
            storePassword System.getenv('KEYSTORE_PASSWORD') ?: ''
            keyAlias 'mi-app-alias'
            keyPassword System.getenv('KEY_PASSWORD') ?: ''
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'),
                         'proguard-rules.pro'
        }
    }
}`,
      highlightLines: [4, 5, 6, 7, 13, 14],
    },
    {
      type: 'text',
      content: 'En Android Studio: **Build > Generate Signed Bundle / APK > Android App Bundle**',
    },
    {
      type: 'info',
      content: 'Google Play requiere AAB (App Bundle) para nuevas apps. Los APK solo se aceptan para actualizaciones de apps existentes.',
    },
    {
      type: 'tip',
      content: 'Usa variables de entorno para las contraseñas del keystore. Nunca las guardes en el código.',
    },
  ],

  'ios-build': [
    {
      type: 'text',
      content: 'Compilar para iOS requiere una Mac con Xcode instalado y una cuenta de Apple Developer. El proceso es más estricto que Android por los requisitos de firma de código.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# 1. Compilar tu app web
npm run build

# 2. Sincronizar con el proyecto nativo
npx cap sync ios

# 3. Abrir en Xcode
npx cap open ios`,
    },
    {
      type: 'text',
      content: 'Requisitos para publicar en App Store:',
    },
    {
      type: 'list',
      items: [
        'Cuenta Apple Developer ($99/año)',
        'Certificados de distribución configurados',
        'App ID registrado en Apple Developer Portal',
        'Perfil de aprovisionamiento (Provisioning Profile)',
        'Screenshots y metadata para App Store Connect',
      ],
    },
    {
      type: 'text',
      content: 'Configuración en Xcode:',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'Xcode Settings',
      code: `1. Selecciona tu proyecto en el navegador
2. En "Signing & Capabilities":
   - Team: Tu cuenta de desarrollador
   - Bundle Identifier: com.tuempresa.app
   - Signing Certificate: Distribution
   - Provisioning Profile: App Store

3. En "General":
   - Version: 1.0.0
   - Build: 1

4. Selecciona "Any iOS Device" como destino`,
    },
    {
      type: 'warning',
      content: 'El Bundle Identifier debe coincidir exactamente con el registrado en Apple Developer Portal y en capacitor.config.ts.',
    },
    {
      type: 'text',
      content: 'Para crear el archivo .ipa para App Store:',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'Proceso de Archive',
      code: `1. Product > Archive (con "Any iOS Device" seleccionado)

2. Una vez completado, se abre el Organizer

3. Click en "Distribute App"

4. Selecciona "App Store Connect"

5. Opciones de distribución:
   - Upload: Sube directamente a App Store Connect
   - Export: Genera .ipa para subir manualmente

6. Xcode validará la app y la subirá`,
    },
    {
      type: 'text',
      content: 'Configuraciones adicionales importantes en Info.plist:',
    },
    {
      type: 'code',
      language: 'xml',
      filename: 'ios/App/App/Info.plist',
      code: `<!-- Permisos de privacidad (requeridos por Apple) -->
<key>NSCameraUsageDescription</key>
<string>Necesitamos acceso a la cámara para tomar fotos</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Necesitamos acceso a tus fotos para seleccionar imágenes</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Necesitamos tu ubicación para mostrarte tiendas cercanas</string>

<key>NSFaceIDUsageDescription</key>
<string>Usa Face ID para acceso rápido y seguro</string>`,
      highlightLines: [2, 3, 5, 6, 8, 9],
    },
    {
      type: 'tip',
      content: 'Prueba siempre en dispositivos físicos antes de enviar a revisión. El simulador no detecta todos los problemas.',
    },
  ],

  'automation': [
    {
      type: 'text',
      content: 'Automatizar el proceso de build con CI/CD ahorra tiempo y reduce errores. Las herramientas más comunes son GitHub Actions, Fastlane, y servicios como Bitrise o App Center.',
    },
    {
      type: 'text',
      content: 'Ejemplo de workflow con GitHub Actions para Android:',
    },
    {
      type: 'code',
      language: 'yaml',
      filename: '.github/workflows/android-build.yml',
      code: `name: Android Build

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build web app
        run: npm run build

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Sync Capacitor
        run: npx cap sync android

      - name: Build APK
        working-directory: android
        run: ./gradlew assembleRelease

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-release
          path: android/app/build/outputs/apk/release/`,
      highlightLines: [24, 25, 33, 34, 37, 38],
    },
    {
      type: 'text',
      content: 'Fastlane simplifica la automatización de iOS y Android:',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar Fastlane
gem install fastlane

# Inicializar en el proyecto iOS
cd ios/App && fastlane init

# Inicializar en el proyecto Android
cd android && fastlane init`,
    },
    {
      type: 'code',
      language: 'ruby',
      filename: 'ios/App/fastlane/Fastfile',
      code: `default_platform(:ios)

platform :ios do
  desc "Build and upload to TestFlight"
  lane :beta do
    # Incrementar número de build
    increment_build_number

    # Compilar la app
    build_app(
      workspace: "App.xcworkspace",
      scheme: "App",
      export_method: "app-store"
    )

    # Subir a TestFlight
    upload_to_testflight(
      skip_waiting_for_build_processing: true
    )
  end

  desc "Deploy to App Store"
  lane :release do
    build_app(
      workspace: "App.xcworkspace",
      scheme: "App",
      export_method: "app-store"
    )

    upload_to_app_store(
      skip_screenshots: true,
      skip_metadata: true
    )
  end
end`,
      highlightLines: [5, 6, 10, 11, 12, 13, 17, 18],
    },
    {
      type: 'info',
      content: 'Fastlane maneja automáticamente certificados, provisioning profiles, y la subida a las tiendas.',
    },
    {
      type: 'text',
      content: 'Script npm para automatizar el proceso completo:',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'package.json',
      code: `{
  "scripts": {
    "build:android": "npm run build && npx cap sync android && cd android && ./gradlew assembleRelease",
    "build:ios": "npm run build && npx cap sync ios",
    "deploy:beta:android": "npm run build:android && cd android && fastlane beta",
    "deploy:beta:ios": "npm run build:ios && cd ios/App && fastlane beta"
  }
}`,
      highlightLines: [3, 4, 5, 6],
    },
    {
      type: 'tip',
      content: 'Configura notificaciones de Slack o Discord en tu CI/CD para saber cuándo los builds terminan o fallan.',
    },
  ],

  // =====================
  // MÓDULO 4: Testing + App Store Preparation
  // =====================

  'testing-strategy': [
    {
      type: 'text',
      content: 'Una estrategia de testing sólida es crucial para apps Capacitor. Debes cubrir tanto el código web como la integración con plugins nativos.',
    },
    {
      type: 'text',
      content: 'Niveles de testing para apps Capacitor:',
    },
    {
      type: 'list',
      items: [
        'Unit Tests: Lógica de negocio y componentes aislados',
        'Integration Tests: Interacción entre componentes',
        'E2E Tests: Flujos completos de usuario',
        'Native Tests: Funcionalidad específica de plataforma',
      ],
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/utils/__tests__/calculator.test.ts',
      code: `import { describe, it, expect } from 'vitest';
import { calculateInterest, formatCurrency } from '../finance';

describe('Finance Utils', () => {
  describe('calculateInterest', () => {
    it('should calculate simple interest correctly', () => {
      const result = calculateInterest(1000, 5, 1);
      expect(result).toBe(1050);
    });

    it('should handle zero interest rate', () => {
      const result = calculateInterest(1000, 0, 1);
      expect(result).toBe(1000);
    });
  });

  describe('formatCurrency', () => {
    it('should format MXN correctly', () => {
      const result = formatCurrency(1234.56, 'MXN');
      expect(result).toBe('$1,234.56');
    });
  });
});`,
      highlightLines: [6, 7, 8, 12, 13, 14],
    },
    {
      type: 'text',
      content: 'Para probar componentes que usan plugins de Capacitor, usa mocks:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/__mocks__/@capacitor/camera.ts',
      code: `export const Camera = {
  getPhoto: vi.fn().mockResolvedValue({
    webPath: 'mock-image-path.jpg',
    base64String: 'mock-base64-data',
  }),
  requestPermissions: vi.fn().mockResolvedValue({
    camera: 'granted',
    photos: 'granted',
  }),
};

export const CameraResultType = {
  Uri: 'uri',
  Base64: 'base64',
  DataUrl: 'dataUrl',
};

export const CameraSource = {
  Camera: 'CAMERA',
  Photos: 'PHOTOS',
  Prompt: 'PROMPT',
};`,
      highlightLines: [2, 3, 4, 5],
    },
    {
      type: 'text',
      content: 'Configuración de Vitest para proyectos Capacitor:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'vitest.config.ts',
      code: `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});`,
      highlightLines: [10, 11, 12, 18, 19, 20, 21],
    },
    {
      type: 'info',
      content: 'Configura umbrales de cobertura para mantener la calidad del código a lo largo del tiempo.',
    },
    {
      type: 'tip',
      content: 'Usa testing-library para tests de componentes: renderiza como lo haría un usuario, no los detalles de implementación.',
    },
  ],

  'play-store': [
    {
      type: 'text',
      content: 'Google Play Store tiene requisitos específicos que debes cumplir para publicar tu app. Vamos a revisar el proceso completo de publicación.',
    },
    {
      type: 'text',
      content: 'Requisitos previos para Google Play:',
    },
    {
      type: 'list',
      items: [
        'Cuenta de Google Play Developer ($25 una vez)',
        'AAB firmado con tu keystore de release',
        'Screenshots de la app (mínimo 2 por tipo de dispositivo)',
        'Ícono de la app (512x512 PNG)',
        'Feature graphic (1024x500)',
        'Descripción corta (80 caracteres) y larga (4000 caracteres)',
        'Política de privacidad (URL pública)',
      ],
    },
    {
      type: 'text',
      content: 'Pasos para publicar en Google Play Console:',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'Proceso de publicación',
      code: `1. CREAR APP
   - Google Play Console > Crear app
   - Nombre, idioma, tipo (app/juego), gratuita/pago

2. CONFIGURAR FICHA DE TIENDA
   - Descripción corta y completa
   - Screenshots (teléfono, tablet, si aplica)
   - Ícono y gráfico destacado
   - Categoría y etiquetas

3. DECLARACIONES DE CONTENIDO
   - Clasificación de contenido (cuestionario IARC)
   - Público objetivo y contenido
   - Anuncios en la app
   - Acceso a la app (si requiere login)

4. POLÍTICA DE PRIVACIDAD
   - URL pública obligatoria
   - Debe describir qué datos recopilas

5. CONFIGURACIÓN DE APP
   - Países de distribución
   - Precios (si aplica)
   - Testing interno/cerrado/abierto

6. SUBIR AAB
   - Production > Create new release
   - Subir el archivo .aab
   - Notas de versión`,
    },
    {
      type: 'warning',
      content: 'La primera revisión puede tardar hasta 7 días. Las actualizaciones suelen ser más rápidas (1-3 días).',
    },
    {
      type: 'text',
      content: 'Rechazos comunes y cómo evitarlos:',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'Causas frecuentes de rechazo',
      code: `❌ PERMISOS EXCESIVOS
   - Solo solicita permisos que realmente uses
   - Explica en la descripción por qué los necesitas

❌ POLÍTICA DE PRIVACIDAD FALTANTE O INCORRECTA
   - Debe ser accesible públicamente
   - Debe mencionar todos los datos que recopilas

❌ CONTENIDO ENGAÑOSO
   - Screenshots deben mostrar la app real
   - La descripción debe ser precisa

❌ FUNCIONALIDAD ROTA
   - Prueba todos los flujos antes de subir
   - Incluye credenciales de prueba si hay login

❌ PROPIEDAD INTELECTUAL
   - No uses marcas registradas sin permiso
   - Cuidado con assets de terceros

❌ INCUMPLIMIENTO DE POLÍTICAS DE FAMILIAS
   - Si tu app es para niños, cumple COPPA
   - Usa el programa "Diseñado para familias"`,
    },
    {
      type: 'info',
      content: 'Usa el testing interno para probar la app con un grupo pequeño antes del lanzamiento público.',
    },
    {
      type: 'tip',
      content: 'Responde rápido a los rechazos con las correcciones. Google prioriza desarrolladores que corrigen issues rápidamente.',
    },
  ],

  'app-store': [
    {
      type: 'text',
      content: 'Apple App Store tiene el proceso de revisión más estricto. La preparación adecuada es clave para evitar rechazos.',
    },
    {
      type: 'text',
      content: 'Requisitos para App Store Connect:',
    },
    {
      type: 'list',
      items: [
        'Cuenta Apple Developer ($99/año)',
        'App archivada y subida desde Xcode',
        'Screenshots para todos los tamaños de pantalla requeridos',
        'App Preview videos (opcional pero recomendado)',
        'Descripción, keywords, categoría',
        'Política de privacidad (obligatoria)',
        'App Privacy details (nutrition labels)',
      ],
    },
    {
      type: 'text',
      content: 'Tamaños de screenshots requeridos:',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'Screenshots requeridos',
      code: `IPHONE (obligatorio)
- 6.7" (iPhone 14 Pro Max): 1290 x 2796
- 6.5" (iPhone 14 Plus): 1284 x 2778
- 5.5" (iPhone 8 Plus): 1242 x 2208

IPAD (si soportas iPad)
- 12.9" iPad Pro: 2048 x 2732
- 11" iPad Pro: 1668 x 2388

TIPS:
- Mínimo 2 screenshots, máximo 10 por dispositivo
- Pueden ser diferentes por localización
- Los primeros 3 son los más importantes (preview)`,
    },
    {
      type: 'text',
      content: 'App Privacy "Nutrition Labels" - Debes declarar qué datos recopila tu app:',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'Categorías de datos',
      code: `DATOS DE CONTACTO
- Nombre, email, teléfono, dirección

DATOS DE SALUD Y FITNESS
- Datos de salud, datos de fitness

DATOS FINANCIEROS
- Información de pago, información crediticia

DATOS DE UBICACIÓN
- Ubicación precisa, ubicación aproximada

DATOS DE IDENTIFICACIÓN
- User ID, Device ID

DATOS DE USO
- Historial de compras, interacción con productos
- Datos de publicidad, otros datos de uso

DIAGNÓSTICOS
- Crash data, datos de rendimiento

Para cada tipo debes indicar:
- ¿Se usa para tracking?
- ¿Está vinculado a la identidad del usuario?`,
    },
    {
      type: 'warning',
      content: 'Apple rechaza apps que solicitan permisos sin justificación clara. Explica cada permiso en el mensaje de solicitud.',
    },
    {
      type: 'text',
      content: 'Rechazos comunes de Apple:',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'Guidelines comúnmente violadas',
      code: `2.1 APP COMPLETENESS
- La app debe estar completa y funcional
- Sin placeholders o "coming soon"

2.3 ACCURATE METADATA
- Screenshots deben mostrar la app real
- Descripción precisa de funcionalidad

3.1.1 IN-APP PURCHASE
- Contenido digital debe usar IAP de Apple
- No puedes mencionar métodos de pago externos

4.2 MINIMUM FUNCTIONALITY
- La app debe ofrecer valor real
- No puede ser solo un wrapper de un sitio web

5.1.1 DATA COLLECTION
- Debes tener política de privacidad
- Privacy labels deben ser precisos

5.1.2 DATA USE AND SHARING
- Pedir consentimiento antes de tracking
- Implementar ATT (App Tracking Transparency)`,
    },
    {
      type: 'info',
      content: 'La revisión inicial toma 24-48 horas en promedio. Durante temporadas altas puede ser más lento.',
    },
    {
      type: 'tip',
      content: 'Usa TestFlight para beta testing antes de enviar a revisión. Apple lo considera positivamente.',
    },
  ],

  'fintech-compliance': [
    {
      type: 'text',
      content: 'Las apps financieras (fintech) tienen requisitos adicionales de compliance tanto de las tiendas como de reguladores. Asegurar el cumplimiento es crítico.',
    },
    {
      type: 'text',
      content: 'Regulaciones clave para apps fintech:',
    },
    {
      type: 'list',
      items: [
        'PCI-DSS: Si manejas datos de tarjetas de crédito',
        'KYC (Know Your Customer): Verificación de identidad',
        'AML (Anti-Money Laundering): Prevención de lavado de dinero',
        'GDPR/LGPD: Protección de datos personales',
        'PSD2/Open Banking: Si operas en Europa',
        'Regulaciones locales del país (CNBV en México, etc.)',
      ],
    },
    {
      type: 'warning',
      content: 'Las apps financieras requieren licencias específicas en muchos países. Consulta con un abogado especializado.',
    },
    {
      type: 'text',
      content: 'Requisitos de seguridad esenciales:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/security/security-checks.ts',
      code: `import { App } from '@capacitor/app';

// Detectar si el dispositivo está rooteado/jailbroken
const checkDeviceSecurity = async () => {
  // Implementar verificaciones de seguridad
  const checks = {
    isEmulator: await detectEmulator(),
    isRooted: await detectRootedDevice(),
    isDebugMode: await detectDebugMode(),
    hasSecureScreen: await checkSecureScreen(),
  };

  if (checks.isRooted || checks.isEmulator) {
    // Bloquear funciones sensibles o toda la app
    showSecurityWarning();
    return false;
  }

  return true;
};

// Implementar timeout de sesión
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutos
let lastActivity = Date.now();

const checkSessionTimeout = () => {
  if (Date.now() - lastActivity > SESSION_TIMEOUT) {
    logoutUser();
    showTimeoutMessage();
  }
};

// Escuchar cuando la app va a background
App.addListener('appStateChange', ({ isActive }) => {
  if (!isActive) {
    // Ocultar contenido sensible (screenshot protection)
    hideSecureContent();
  } else {
    // Verificar sesión al volver
    checkSessionTimeout();
  }
});`,
      highlightLines: [5, 6, 7, 8, 9, 12, 13, 24, 25, 26],
    },
    {
      type: 'text',
      content: 'Implementar autenticación segura:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/security/auth-flow.ts',
      code: `// Flujo de autenticación seguro para fintech
const secureAuthFlow = {
  // 1. Autenticación multi-factor
  async performMFA(userId: string) {
    // Primer factor: credenciales
    const credentials = await validateCredentials();

    // Segundo factor: biometría o código SMS/email
    const secondFactor = await requestSecondFactor();

    // Tercer factor (para operaciones sensibles): PIN/contraseña
    const pin = await requestPIN();

    return validateAllFactors(credentials, secondFactor, pin);
  },

  // 2. Tokens seguros
  async storeTokenSecurely(token: string) {
    // Usar Keychain/Keystore, nunca localStorage
    await NativeBiometric.setCredentials({
      username: 'auth_token',
      password: token,
      server: 'com.miapp.fintech',
    });
  },

  // 3. Certificate pinning
  async validateCertificate(response: Response) {
    // Verificar que el certificado SSL es el esperado
    const certHash = response.headers.get('X-Certificate-Hash');
    if (certHash !== EXPECTED_CERT_HASH) {
      throw new SecurityError('Certificate mismatch');
    }
  },
};`,
      highlightLines: [4, 5, 8, 11, 19, 20, 21, 22],
    },
    {
      type: 'text',
      content: 'Checklist de compliance para apps fintech:',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'Fintech Compliance Checklist',
      code: `SEGURIDAD DE DATOS
□ Encriptación de datos en reposo (AES-256)
□ Encriptación de datos en tránsito (TLS 1.3)
□ Certificate pinning implementado
□ No almacenar datos sensibles en logs
□ Sanitizar inputs para prevenir injection

AUTENTICACIÓN
□ MFA obligatorio para transacciones
□ Biometría como opción de autenticación
□ Session timeout configurable
□ Bloqueo después de intentos fallidos
□ Logout automático en background prolongado

PRIVACIDAD
□ Política de privacidad clara y accesible
□ Consentimiento explícito para datos
□ Opción de eliminar cuenta y datos
□ Privacy labels actualizados (iOS)
□ Data Safety Section (Android)

CUMPLIMIENTO REGULATORIO
□ Licencias requeridas obtenidas
□ KYC implementado correctamente
□ Reportes AML configurados
□ Auditorías de seguridad realizadas
□ Penetration testing completado`,
    },
    {
      type: 'info',
      content: 'Las tiendas pueden solicitar documentación adicional para apps financieras: licencias, auditorías, y pruebas de compliance.',
    },
    {
      type: 'tip',
      content: 'Considera usar servicios especializados como Plaid, Stripe, o providers locales que ya tienen compliance para manejar datos financieros.',
    },
  ],

  // =====================
  // MÓDULO 5: Arquitectura Avanzada
  // =====================

  'monorepos-turborepo': [
    {
      type: 'text',
      content: 'Un **monorepo** es una estrategia de organización donde múltiples proyectos relacionados viven en un solo repositorio. Para apps Capacitor empresariales, esto permite compartir código entre web, mobile y backend.',
    },
    {
      type: 'info',
      content: 'Turborepo es una herramienta de build optimizada para monorepos JavaScript/TypeScript que cachea builds y ejecuta tareas en paralelo.',
    },
    {
      type: 'text',
      content: 'Estructura típica de un monorepo Capacitor:',
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'Estructura del monorepo',
      code: `mi-empresa/
├── apps/
│   ├── mobile/              # App Capacitor (React/Vue/Angular)
│   │   ├── src/
│   │   ├── android/
│   │   ├── ios/
│   │   └── capacitor.config.ts
│   ├── web/                 # Web app (Next.js, Remix, etc.)
│   └── admin/               # Panel de administración
├── packages/
│   ├── ui/                  # Componentes compartidos
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   ├── api-client/          # Cliente API compartido
│   ├── utils/               # Utilidades comunes
│   └── types/               # Tipos TypeScript compartidos
├── turbo.json               # Configuración Turborepo
├── package.json             # Root package.json
└── pnpm-workspace.yaml      # Definición del workspace`,
    },
    {
      type: 'text',
      content: 'Configuración de Turborepo para optimizar builds:',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'turbo.json',
      code: `{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "android/app/build/**", "ios/App/build/**"],
      "cache": true
    },
    "lint": {
      "outputs": [],
      "cache": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "mobile:android": {
      "dependsOn": ["^build"],
      "cache": false
    },
    "mobile:ios": {
      "dependsOn": ["^build"],
      "cache": false
    }
  }
}`,
      highlightLines: [5, 6, 7, 8, 14, 15],
    },
    {
      type: 'text',
      content: 'Configuración del workspace con pnpm:',
    },
    {
      type: 'code',
      language: 'yaml',
      filename: 'pnpm-workspace.yaml',
      code: `packages:
  - "apps/*"
  - "packages/*"`,
    },
    {
      type: 'code',
      language: 'json',
      filename: 'package.json (root)',
      code: `{
  "name": "mi-empresa-monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "mobile:dev": "turbo run dev --filter=mobile",
    "mobile:build:android": "turbo run mobile:android --filter=mobile",
    "mobile:build:ios": "turbo run mobile:ios --filter=mobile"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  },
  "packageManager": "pnpm@8.15.0"
}`,
      highlightLines: [5, 6, 7, 9, 10, 11],
    },
    {
      type: 'text',
      content: 'Ejemplo de package compartido de UI:',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'packages/ui/package.json',
      code: `{
  "name": "@mi-empresa/ui",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "lint": "eslint src/"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}`,
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'packages/ui/src/Button.tsx',
      code: `import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={\`btn btn-\${variant} btn-\${size}\`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  }
);`,
      highlightLines: [3, 4, 5, 6, 9, 10],
    },
    {
      type: 'text',
      content: 'Uso del package compartido en la app mobile:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'apps/mobile/src/App.tsx',
      code: `// Importar desde el package compartido
import { Button } from '@mi-empresa/ui';
import { formatCurrency, validateEmail } from '@mi-empresa/utils';
import { ApiClient } from '@mi-empresa/api-client';
import type { User, Product } from '@mi-empresa/types';

// Usar componentes compartidos
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
      <Button onClick={() => addToCart(product)}>
        Agregar al carrito
      </Button>
    </div>
  );
}`,
      highlightLines: [2, 3, 4, 5, 13, 14, 15],
    },
    {
      type: 'warning',
      content: 'Asegúrate de configurar el bundler de la app mobile para resolver correctamente los packages del workspace.',
    },
    {
      type: 'tip',
      content: 'Usa "turbo run build --filter=mobile..." para ejecutar comandos solo en la app mobile y sus dependencias.',
    },
  ],

  'feature-based-architecture': [
    {
      type: 'text',
      content: 'La **arquitectura basada en features** (o vertical slicing) organiza el código por dominio de negocio en lugar de por tipo técnico. Esto mejora la escalabilidad y mantenibilidad de apps grandes.',
    },
    {
      type: 'info',
      content: 'En lugar de agrupar todos los componentes juntos, todos los hooks juntos, etc., agrupamos todo lo relacionado a una feature (auth, products, cart) en una carpeta.',
    },
    {
      type: 'text',
      content: 'Comparación de estructuras:',
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'Estructura tradicional vs Feature-based',
      code: `# ❌ Estructura tradicional (por tipo)
src/
├── components/
│   ├── LoginForm.tsx
│   ├── ProductCard.tsx
│   └── CartItem.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useCart.ts
├── services/
│   ├── authService.ts
│   └── cartService.ts
└── pages/
    ├── Login.tsx
    └── Products.tsx

# ✅ Estructura Feature-based (por dominio)
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.ts
│   └── cart/
│       ├── components/
│       ├── hooks/
│       ├── store/
│       └── index.ts
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── app/
    ├── routes/
    └── providers/`,
    },
    {
      type: 'text',
      content: 'Estructura detallada de una feature:',
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'features/auth/',
      code: `features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ForgotPasswordForm.tsx
│   └── BiometricPrompt.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useLogin.ts
│   └── useBiometric.ts
├── services/
│   ├── authApi.ts
│   └── tokenService.ts
├── store/
│   └── authStore.ts        # Zustand store
├── utils/
│   └── validators.ts
├── types.ts                 # Tipos específicos de auth
├── constants.ts             # Constantes de auth
└── index.ts                 # Public API de la feature`,
    },
    {
      type: 'text',
      content: 'El archivo index.ts actúa como API pública de la feature:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/auth/index.ts',
      code: `// Solo exportamos lo que otras features pueden usar
// Esto crea un contrato claro y evita imports internos

// Componentes públicos
export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { BiometricPrompt } from './components/BiometricPrompt';

// Hooks públicos
export { useAuth } from './hooks/useAuth';
export { useLogin } from './hooks/useLogin';

// Tipos públicos
export type { User, AuthState, LoginCredentials } from './types';

// Store (si otras features necesitan el estado)
export { useAuthStore } from './store/authStore';

// NO exportamos:
// - Componentes internos
// - Servicios (son implementación interna)
// - Utils (son implementación interna)`,
      highlightLines: [5, 6, 7, 10, 11, 14, 17],
    },
    {
      type: 'text',
      content: 'Ejemplo de componente dentro de la feature:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/auth/components/LoginForm.tsx',
      code: `import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useBiometric } from '../hooks/useBiometric';
import { validateEmail, validatePassword } from '../utils/validators';
import type { LoginCredentials } from '../types';

// Imports de shared (componentes reutilizables)
import { Button, Input, Alert } from '@/shared/components';

export function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const { login, isLoading, error } = useLogin();
  const { isBiometricAvailable, authenticateWithBiometric } = useBiometric();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(credentials.email)) return;
    if (!validatePassword(credentials.password)) return;
    await login(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert type="error">{error}</Alert>}

      <Input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />

      <Input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
        placeholder="Contraseña"
      />

      <Button type="submit" loading={isLoading}>
        Iniciar sesión
      </Button>

      {isBiometricAvailable && (
        <Button type="button" onClick={authenticateWithBiometric}>
          Usar Face ID / Huella
        </Button>
      )}
    </form>
  );
}`,
      highlightLines: [2, 3, 4, 5, 8, 15, 16],
    },
    {
      type: 'text',
      content: 'Reglas para comunicación entre features:',
    },
    {
      type: 'list',
      items: [
        'Las features solo importan desde el index.ts de otras features',
        'Nunca importar archivos internos de otra feature',
        'Usar eventos o stores compartidos para comunicación cross-feature',
        'Shared/ contiene solo código verdaderamente reutilizable',
        'Cada feature puede tener su propio store de Zustand o contexto',
      ],
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/cart/hooks/useAddToCart.ts',
      code: `// ✅ Correcto: importar desde el índice público
import { useAuth } from '@/features/auth';

// ❌ Incorrecto: importar archivo interno
// import { authService } from '@/features/auth/services/authApi';

export function useAddToCart() {
  const { user, isAuthenticated } = useAuth();

  const addToCart = async (productId: string) => {
    if (!isAuthenticated) {
      throw new Error('Debes iniciar sesión');
    }
    // ... lógica de agregar al carrito
  };

  return { addToCart };
}`,
      highlightLines: [2, 5, 8],
    },
    {
      type: 'tip',
      content: 'Usa ESLint con reglas de import boundaries para prevenir imports incorrectos entre features.',
    },
  ],

  'tanstack-query': [
    {
      type: 'text',
      content: '**TanStack Query** (anteriormente React Query) es la librería estándar para manejo de estado del servidor en apps React. Proporciona caching, sincronización, y manejo de estados de carga de forma automática.',
    },
    {
      type: 'info',
      content: 'TanStack Query separa el estado del servidor (datos de APIs) del estado del cliente (UI, formularios). Esto simplifica enormemente la arquitectura.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar TanStack Query
npm install @tanstack/react-query @tanstack/react-query-devtools`,
    },
    {
      type: 'text',
      content: 'Configuración inicial del QueryClient:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/app/providers/QueryProvider.tsx',
      code: `import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo que los datos se consideran "frescos"
      staleTime: 1000 * 60 * 5, // 5 minutos
      // Tiempo que los datos permanecen en cache
      gcTime: 1000 * 60 * 30, // 30 minutos (antes cacheTime)
      // Reintentos en caso de error
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch automático
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}`,
      highlightLines: [7, 8, 10, 14, 15],
    },
    {
      type: 'text',
      content: 'Uso básico con useQuery para obtener datos:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/products/hooks/useProducts.ts',
      code: `import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/productsApi';
import type { Product } from '../types';

// Query keys organizadas
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Hook para obtener lista de productos
export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productsApi.getProducts(filters),
    // Opciones específicas para esta query
    staleTime: 1000 * 60 * 2, // 2 minutos
    select: (data) => data.products, // Transformar respuesta
  });
}

// Hook para obtener un producto por ID
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id, // Solo ejecutar si hay ID
  });
}`,
      highlightLines: [6, 7, 8, 9, 10, 11, 16, 17, 18, 27, 28, 29],
    },
    {
      type: 'text',
      content: 'Uso de useMutation para modificar datos:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/products/hooks/useCreateProduct.ts',
      code: `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../services/productsApi';
import { productKeys } from './useProducts';
import type { CreateProductData } from '../types';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductData) => productsApi.createProduct(data),

    // Optimistic update (actualizar UI antes de la respuesta)
    onMutate: async (newProduct) => {
      // Cancelar queries en progreso
      await queryClient.cancelQueries({ queryKey: productKeys.lists() });

      // Snapshot del estado actual
      const previousProducts = queryClient.getQueryData(productKeys.lists());

      // Actualizar optimisticamente
      queryClient.setQueryData(productKeys.lists(), (old: Product[]) => [
        ...old,
        { ...newProduct, id: 'temp-id' },
      ]);

      return { previousProducts };
    },

    // Si hay error, revertir al estado anterior
    onError: (err, newProduct, context) => {
      queryClient.setQueryData(productKeys.lists(), context?.previousProducts);
    },

    // Después de éxito o error, refrescar datos
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

// Uso en componente
function CreateProductForm() {
  const { mutate, isPending, error } = useCreateProduct();

  const handleSubmit = (data: CreateProductData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Producto creado');
        navigate('/products');
      },
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}`,
      highlightLines: [12, 13, 14, 15, 20, 21, 22, 23, 29, 30, 34, 35],
    },
    {
      type: 'text',
      content: 'Prefetching para mejorar UX:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/products/components/ProductList.tsx',
      code: `import { useQueryClient } from '@tanstack/react-query';
import { useProducts, productKeys } from '../hooks/useProducts';
import { productsApi } from '../services/productsApi';

export function ProductList() {
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useProducts();

  // Prefetch producto al hacer hover
  const handleProductHover = (productId: string) => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(productId),
      queryFn: () => productsApi.getProduct(productId),
      staleTime: 1000 * 60 * 5, // 5 minutos
    });
  };

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="product-grid">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onMouseEnter={() => handleProductHover(product.id)}
        />
      ))}
    </div>
  );
}`,
      highlightLines: [10, 11, 12, 13, 14, 26],
    },
    {
      type: 'text',
      content: 'Integración con Capacitor para offline-first:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/lib/queryPersister.ts',
      code: `import { Preferences } from '@capacitor/preferences';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

// Storage adapter para Capacitor Preferences
const capacitorStorage = {
  getItem: async (key: string) => {
    const { value } = await Preferences.get({ key });
    return value;
  },
  setItem: async (key: string, value: string) => {
    await Preferences.set({ key, value });
  },
  removeItem: async (key: string) => {
    await Preferences.remove({ key });
  },
};

// Configurar persistencia
export function setupQueryPersistence(queryClient: QueryClient) {
  const persister = createSyncStoragePersister({
    storage: capacitorStorage,
    key: 'app-query-cache',
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24, // 24 horas
  });
}`,
      highlightLines: [6, 7, 8, 9, 10, 20, 21, 22, 26, 27, 28],
    },
    {
      type: 'warning',
      content: 'Configura staleTime apropiadamente. Muy corto causa requests excesivos, muy largo muestra datos desactualizados.',
    },
    {
      type: 'tip',
      content: 'Usa las React Query DevTools para debuggear el estado del cache y entender cuándo se ejecutan las queries.',
    },
  ],

  'zustand': [
    {
      type: 'text',
      content: '**Zustand** es una librería de manejo de estado minimalista para React. Es perfecta para el estado del cliente (UI, preferencias, carrito) mientras TanStack Query maneja el estado del servidor.',
    },
    {
      type: 'info',
      content: 'Zustand tiene ~1KB gzipped, sin boilerplate, y funciona fuera de React Context, lo que mejora el rendimiento.',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar Zustand
npm install zustand`,
    },
    {
      type: 'text',
      content: 'Crear un store básico:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/cart/store/cartStore.ts',
      code: `import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CartItem, CartState } from '../types';

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        items: [],
        total: 0,

        // Acciones
        addItem: (newItem) => set((state) => {
          const existingItem = state.items.find(item => item.productId === newItem.productId);

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.productId === newItem.productId
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
              total: state.total + newItem.price * newItem.quantity,
            };
          }

          return {
            items: [...state.items, newItem],
            total: state.total + newItem.price * newItem.quantity,
          };
        }),

        removeItem: (productId) => set((state) => {
          const item = state.items.find(i => i.productId === productId);
          return {
            items: state.items.filter(i => i.productId !== productId),
            total: state.total - (item ? item.price * item.quantity : 0),
          };
        }),

        updateQuantity: (productId, quantity) => set((state) => {
          const item = state.items.find(i => i.productId === productId);
          if (!item) return state;

          const diff = quantity - item.quantity;
          return {
            items: state.items.map(i =>
              i.productId === productId ? { ...i, quantity } : i
            ),
            total: state.total + item.price * diff,
          };
        }),

        clearCart: () => set({ items: [], total: 0 }),
      }),
      {
        name: 'cart-storage', // nombre para localStorage
      }
    ),
    { name: 'CartStore' } // nombre para devtools
  )
);`,
      highlightLines: [13, 14, 15, 16, 22, 23, 24, 41, 42, 63, 64, 65],
    },
    {
      type: 'text',
      content: 'Uso del store en componentes:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/cart/components/CartButton.tsx',
      code: `import { useCartStore } from '../store/cartStore';

export function CartButton() {
  // Suscribirse solo a lo que necesitas (performance)
  const itemCount = useCartStore((state) => state.items.length);
  const total = useCartStore((state) => state.total);

  return (
    <button className="cart-button">
      <ShoppingCart />
      {itemCount > 0 && <span className="badge">{itemCount}</span>}
      <span className="total">{formatCurrency(total)}</span>
    </button>
  );
}

// Selectores para lógica derivada
export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const clearCart = useCartStore((state) => state.clearCart);

  // Calcular descuentos, impuestos, etc.
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.16;
  const shipping = subtotal > 500 ? 0 : 50;

  return (
    <div className="cart-summary">
      <p>Subtotal: {formatCurrency(subtotal)}</p>
      <p>IVA (16%): {formatCurrency(tax)}</p>
      <p>Envío: {formatCurrency(shipping)}</p>
      <p className="total">Total: {formatCurrency(subtotal + tax + shipping)}</p>
      <Button onClick={clearCart}>Vaciar carrito</Button>
    </div>
  );
}`,
      highlightLines: [5, 6, 19, 20, 21],
    },
    {
      type: 'text',
      content: 'Persistencia con Capacitor Preferences:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/lib/zustandCapacitorStorage.ts',
      code: `import { Preferences } from '@capacitor/preferences';
import { StateStorage } from 'zustand/middleware';

// Adapter de storage para Zustand con Capacitor
export const capacitorStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const { value } = await Preferences.get({ key: name });
    return value;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await Preferences.set({ key: name, value });
  },
  removeItem: async (name: string): Promise<void> => {
    await Preferences.remove({ key: name });
  },
};

// Uso en el store
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // ... estado y acciones
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => capacitorStorage),
    }
  )
);`,
      highlightLines: [5, 6, 7, 8, 10, 11, 14, 15, 25, 26],
    },
    {
      type: 'text',
      content: 'Slices para stores grandes:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/store/index.ts',
      code: `import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Slice de UI
interface UISlice {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const createUISlice = (set: any): UISlice => ({
  sidebarOpen: false,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
});

// Slice de notificaciones
interface NotificationSlice {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

const createNotificationSlice = (set: any): NotificationSlice => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
});

// Store combinado
type AppStore = UISlice & NotificationSlice;

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get, api) => ({
      ...createUISlice(set),
      ...createNotificationSlice(set),
    }),
    { name: 'AppStore' }
  )
);`,
      highlightLines: [12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 31, 41, 42, 43, 44],
    },
    {
      type: 'text',
      content: 'Usar Zustand fuera de componentes React:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/analytics.ts',
      code: `import { useCartStore } from '@/features/cart/store/cartStore';
import { useAuthStore } from '@/features/auth/store/authStore';

// Acceder al store fuera de React
export function trackPurchase() {
  // getState() para leer
  const cartItems = useCartStore.getState().items;
  const user = useAuthStore.getState().user;

  analytics.track('purchase', {
    userId: user?.id,
    items: cartItems,
    total: useCartStore.getState().total,
  });

  // Modificar estado
  useCartStore.getState().clearCart();
}

// Suscribirse a cambios
const unsubscribe = useCartStore.subscribe(
  (state) => state.total,
  (total, prevTotal) => {
    if (total > 1000) {
      showFreeShippingBanner();
    }
  }
);`,
      highlightLines: [7, 8, 16, 20, 21, 22, 23],
    },
    {
      type: 'warning',
      content: 'Evita poner estado del servidor (datos de API) en Zustand. Usa TanStack Query para eso.',
    },
    {
      type: 'tip',
      content: 'Usa selectores (state => state.something) para optimizar re-renders. El componente solo se actualiza cuando el valor seleccionado cambia.',
    },
  ],

  'native-bridge-patterns': [
    {
      type: 'text',
      content: 'El **Bridge** de Capacitor es el mecanismo de comunicación entre JavaScript y código nativo. Entender patrones avanzados permite crear plugins personalizados y optimizar el rendimiento.',
    },
    {
      type: 'info',
      content: 'El Bridge usa comunicación asíncrona basada en Promises. Los mensajes se serializan a JSON y se envían al código nativo, que los procesa y devuelve resultados.',
    },
    {
      type: 'text',
      content: 'Anatomía de una llamada al Bridge:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'Flujo de comunicación',
      code: `// 1. Tu código JavaScript llama a un plugin
import { Camera } from '@capacitor/camera';
const photo = await Camera.getPhoto({ quality: 90 });

// 2. Internamente, el Bridge serializa la llamada:
// {
//   "pluginId": "Camera",
//   "methodName": "getPhoto",
//   "options": { "quality": 90 },
//   "callbackId": "12345"
// }

// 3. El código nativo (Swift/Kotlin) recibe el mensaje,
//    ejecuta la operación, y devuelve:
// {
//   "callbackId": "12345",
//   "success": true,
//   "data": { "webPath": "file://...", "base64String": "..." }
// }

// 4. El Bridge resuelve la Promise con los datos`,
    },
    {
      type: 'text',
      content: 'Creación de un plugin personalizado:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/plugins/DeviceSecurityPlugin/definitions.ts',
      code: `// Definir la interfaz del plugin
export interface DeviceSecurityPlugin {
  // Verificar si el dispositivo está rooteado/jailbroken
  isDeviceSecure(): Promise<{ isSecure: boolean; reason?: string }>;

  // Obtener información de seguridad
  getSecurityInfo(): Promise<SecurityInfo>;

  // Verificar integridad de la app
  verifyAppIntegrity(): Promise<{ isValid: boolean; signature?: string }>;

  // Añadir listener para cambios de seguridad
  addListener(
    eventName: 'securityStateChange',
    listenerFunc: (state: SecurityState) => void
  ): Promise<PluginListenerHandle>;
}

export interface SecurityInfo {
  isRooted: boolean;
  isEmulator: boolean;
  isDebugMode: boolean;
  hasSecureHardware: boolean;
  osVersion: string;
}

export interface SecurityState {
  type: 'rootDetected' | 'debuggerAttached' | 'tamperingDetected';
  timestamp: number;
}`,
      highlightLines: [3, 4, 7, 10, 13, 14, 15],
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/plugins/DeviceSecurityPlugin/index.ts',
      code: `import { registerPlugin } from '@capacitor/core';
import type { DeviceSecurityPlugin } from './definitions';

// Registrar el plugin con web fallback
const DeviceSecurity = registerPlugin<DeviceSecurityPlugin>(
  'DeviceSecurity',
  {
    web: () => import('./web').then(m => new m.DeviceSecurityWeb()),
  }
);

export * from './definitions';
export { DeviceSecurity };`,
      highlightLines: [5, 6, 7, 8, 9],
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/plugins/DeviceSecurityPlugin/web.ts',
      code: `import { WebPlugin } from '@capacitor/core';
import type { DeviceSecurityPlugin, SecurityInfo } from './definitions';

// Implementación web (fallback)
export class DeviceSecurityWeb extends WebPlugin implements DeviceSecurityPlugin {
  async isDeviceSecure(): Promise<{ isSecure: boolean; reason?: string }> {
    // En web, siempre consideramos que no hay root/jailbreak
    return { isSecure: true };
  }

  async getSecurityInfo(): Promise<SecurityInfo> {
    return {
      isRooted: false,
      isEmulator: false,
      isDebugMode: import.meta.env.DEV,
      hasSecureHardware: false, // Web no tiene secure enclave
      osVersion: navigator.userAgent,
    };
  }

  async verifyAppIntegrity(): Promise<{ isValid: boolean }> {
    // No hay verificación de integridad en web
    return { isValid: true };
  }
}`,
      highlightLines: [5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17],
    },
    {
      type: 'text',
      content: 'Implementación nativa en Swift (iOS):',
    },
    {
      type: 'code',
      language: 'swift',
      filename: 'ios/App/App/Plugins/DeviceSecurityPlugin.swift',
      code: `import Capacitor
import Foundation

@objc(DeviceSecurityPlugin)
public class DeviceSecurityPlugin: CAPPlugin {
    @objc func isDeviceSecure(_ call: CAPPluginCall) {
        var isSecure = true
        var reason: String? = nil

        // Verificar jailbreak
        if FileManager.default.fileExists(atPath: "/Applications/Cydia.app") ||
           FileManager.default.fileExists(atPath: "/private/var/lib/apt") {
            isSecure = false
            reason = "Jailbreak detected"
        }

        call.resolve([
            "isSecure": isSecure,
            "reason": reason as Any
        ])
    }

    @objc func getSecurityInfo(_ call: CAPPluginCall) {
        call.resolve([
            "isRooted": isJailbroken(),
            "isEmulator": isSimulator(),
            "isDebugMode": isDebugBuild(),
            "hasSecureHardware": hasSecureEnclave(),
            "osVersion": UIDevice.current.systemVersion
        ])
    }

    private func isSimulator() -> Bool {
        #if targetEnvironment(simulator)
        return true
        #else
        return false
        #endif
    }
}`,
      highlightLines: [6, 7, 11, 12, 17, 18, 19, 23, 24, 25, 26, 27],
    },
    {
      type: 'text',
      content: 'Uso del plugin personalizado en la app:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/features/security/hooks/useSecurity.ts',
      code: `import { useEffect, useState } from 'react';
import { DeviceSecurity } from '@/plugins/DeviceSecurityPlugin';
import { Capacitor } from '@capacitor/core';

export function useSecurity() {
  const [securityInfo, setSecurityInfo] = useState<SecurityInfo | null>(null);
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    const checkSecurity = async () => {
      // Solo verificar en plataformas nativas
      if (!Capacitor.isNativePlatform()) {
        setIsSecure(true);
        return;
      }

      try {
        const [secureResult, info] = await Promise.all([
          DeviceSecurity.isDeviceSecure(),
          DeviceSecurity.getSecurityInfo(),
        ]);

        setIsSecure(secureResult.isSecure);
        setSecurityInfo(info);

        // Bloquear app si no es segura
        if (!secureResult.isSecure) {
          throw new SecurityError(secureResult.reason);
        }
      } catch (error) {
        console.error('Security check failed:', error);
        setIsSecure(false);
      }
    };

    checkSecurity();

    // Escuchar cambios de seguridad
    const listener = DeviceSecurity.addListener(
      'securityStateChange',
      (state) => {
        if (state.type === 'rootDetected') {
          setIsSecure(false);
        }
      }
    );

    return () => {
      listener.then(l => l.remove());
    };
  }, []);

  return { isSecure, securityInfo };
}`,
      highlightLines: [11, 12, 17, 18, 19, 20, 26, 27, 37, 38, 39, 40, 41],
    },
    {
      type: 'warning',
      content: 'Los datos que cruzan el Bridge se serializan a JSON. Evita enviar objetos grandes o datos binarios frecuentemente.',
    },
    {
      type: 'tip',
      content: 'Para datos binarios grandes (imágenes, archivos), usa file:// URLs en lugar de base64 para mejor rendimiento.',
    },
  ],

  'performance-optimization': [
    {
      type: 'text',
      content: 'Las apps Capacitor pueden sufrir problemas de rendimiento si no se optimizan correctamente. Veremos técnicas para mejorar el rendimiento del WebView, reducir el bundle size, y optimizar la comunicación con el Bridge.',
    },
    {
      type: 'info',
      content: 'El rendimiento percibido es tan importante como el rendimiento real. Usa skeleton loaders, transiciones, y feedback inmediato.',
    },
    {
      type: 'text',
      content: 'Optimización del bundle con code splitting:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/routes/index.tsx',
      code: `import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from '@/shared/components';

// Lazy loading de páginas
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));

// Prefetch de rutas probables
const prefetchCheckout = () => {
  import('@/pages/Checkout');
};

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/cart"
          element={<Cart />}
          // Prefetch checkout cuando se renderiza cart
          loader={() => { prefetchCheckout(); return null; }}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Suspense>
  );
}`,
      highlightLines: [6, 7, 8, 9, 10, 13, 14, 19, 27, 28],
    },
    {
      type: 'text',
      content: 'Configuración de Vite para optimización:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'vite.config.ts',
      code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // Analizar bundle size
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Separar vendors en chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar librerías grandes
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          // Agrupar plugins de Capacitor
          'capacitor-core': ['@capacitor/core', '@capacitor/app'],
          'capacitor-plugins': [
            '@capacitor/camera',
            '@capacitor/geolocation',
            '@capacitor/preferences',
          ],
        },
      },
    },
    // Optimizaciones adicionales
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false, // Deshabilitar en producción
  },
});`,
      highlightLines: [9, 10, 11, 12, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    },
    {
      type: 'text',
      content: 'Optimización de listas con virtualización:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/products/components/ProductList.tsx',
      code: `import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useProducts } from '../hooks/useProducts';

export function VirtualizedProductList() {
  const parentRef = useRef<HTMLDivElement>(null);
  const { data: products } = useProducts();

  const virtualizer = useVirtualizer({
    count: products?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Altura estimada de cada item
    overscan: 5, // Items extra a renderizar fuera de vista
  });

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto"
    >
      <div
        style={{
          height: \`\${virtualizer.getTotalSize()}px\`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: \`\${virtualItem.size}px\`,
              transform: \`translateY(\${virtualItem.start}px)\`,
            }}
          >
            <ProductCard product={products![virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}`,
      highlightLines: [9, 10, 11, 12, 13, 22, 23, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    },
    {
      type: 'text',
      content: 'Optimización de imágenes:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'shared/components/OptimizedImage.tsx',
      code: `import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generar srcset para diferentes densidades
  const generateSrcSet = (baseSrc: string) => {
    const baseUrl = baseSrc.replace(/\\.[^.]+$/, '');
    const ext = baseSrc.match(/\\.[^.]+$/)?.[0] ?? '.jpg';
    return \`
      \${baseUrl}-1x\${ext} 1x,
      \${baseUrl}-2x\${ext} 2x,
      \${baseUrl}-3x\${ext} 3x
    \`;
  };

  return (
    <div
      ref={imgRef}
      className={\`relative overflow-hidden \${className}\`}
      style={{ width, height }}
    >
      {/* Placeholder blur mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {isInView && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={\`
            transition-opacity duration-300
            \${isLoaded ? 'opacity-100' : 'opacity-0'}
          \`}
        />
      )}
    </div>
  );
}`,
      highlightLines: [23, 24, 25, 26, 27, 28, 29, 30, 40, 41, 42, 43, 44, 45, 46, 66, 67],
    },
    {
      type: 'text',
      content: 'Memoización y prevención de re-renders:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'features/products/components/ProductCard.tsx',
      code: `import { memo, useCallback, useMemo } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Memo para evitar re-renders innecesarios
export const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  // useCallback para callbacks estables
  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
  }, [onAddToCart, product]);

  // useMemo para cálculos costosos
  const discountedPrice = useMemo(() => {
    if (!product.discount) return product.price;
    return product.price * (1 - product.discount / 100);
  }, [product.price, product.discount]);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(discountedPrice);
  }, [discountedPrice]);

  return (
    <div className="product-card">
      <OptimizedImage
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
      />
      <h3>{product.name}</h3>
      <p className="price">{formattedPrice}</p>
      {product.discount && (
        <span className="discount">-{product.discount}%</span>
      )}
      <button onClick={handleAddToCart}>Agregar</button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Comparador personalizado (return true si son iguales)
  return prevProps.product.id === nextProps.product.id &&
         prevProps.product.price === nextProps.product.price;
});`,
      highlightLines: [10, 15, 16, 17, 20, 21, 22, 23, 25, 26, 27, 28, 29, 48, 49, 50, 51],
    },
    {
      type: 'text',
      content: 'Monitoreo de rendimiento:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/utils/performance.ts',
      code: `// Medir tiempo de renderizado
export function measureRender(componentName: string) {
  const start = performance.now();

  return () => {
    const end = performance.now();
    const duration = end - start;

    if (duration > 16) { // Más de 1 frame (60fps)
      console.warn(
        \`[Performance] \${componentName} render took \${duration.toFixed(2)}ms\`
      );
    }

    // Enviar a analytics en producción
    if (import.meta.env.PROD && duration > 100) {
      analytics.track('slow_render', {
        component: componentName,
        duration,
      });
    }
  };
}

// Web Vitals
export function reportWebVitals() {
  import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB }) => {
    onCLS(console.log);  // Cumulative Layout Shift
    onFID(console.log);  // First Input Delay
    onLCP(console.log);  // Largest Contentful Paint
    onFCP(console.log);  // First Contentful Paint
    onTTFB(console.log); // Time to First Byte
  });
}`,
      highlightLines: [2, 3, 9, 10, 11, 16, 17, 18, 19, 26, 27, 28, 29, 30, 31],
    },
    {
      type: 'warning',
      content: 'No optimices prematuramente. Usa las DevTools de React y el Performance tab del navegador para identificar bottlenecks reales.',
    },
    {
      type: 'tip',
      content: 'El mayor impacto en rendimiento suele venir de: bundle size, cantidad de re-renders, y operaciones síncronas bloqueantes.',
    },
  ],

  // ===== MODULE 6: SEGURIDAD EN APPS MÓVILES =====

  'biometric-authentication': [
    {
      type: 'text',
      content: 'La **autenticación biométrica** permite a los usuarios autenticarse usando características físicas únicas como huellas digitales, reconocimiento facial o iris. En Capacitor, el plugin **@capacitor-community/biometric-auth** y el plugin oficial **@capacitor/identity-vault** proporcionan acceso a estas APIs nativas.',
    },
    {
      type: 'info',
      content: 'La biometría no reemplaza las contraseñas, sino que las complementa. Siempre debes tener un método de autenticación alternativo.',
    },
    {
      type: 'text',
      content: '## Configuración del Plugin Biométrico\n\nPrimero, instalamos el plugin de autenticación biométrica:',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Instalar el plugin de biometría
npm install @capacitor-community/biometric-auth

# Sincronizar con los proyectos nativos
npx cap sync`,
    },
    {
      type: 'text',
      content: '## Configuración para iOS\n\nEn iOS, necesitas agregar la descripción de uso en `Info.plist`:',
    },
    {
      type: 'code',
      language: 'xml',
      filename: 'ios/App/App/Info.plist',
      code: `<key>NSFaceIDUsageDescription</key>
<string>Usamos Face ID para autenticarte de forma segura</string>`,
    },
    {
      type: 'text',
      content: '## Verificar Disponibilidad\n\nAntes de usar biometría, verifica si el dispositivo la soporta:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/biometric.service.ts',
      code: `import { BiometricAuth, BiometryType } from '@capacitor-community/biometric-auth';

export class BiometricService {
  private available = false;
  private biometryType: BiometryType = BiometryType.none;

  async checkAvailability(): Promise<{
    available: boolean;
    type: string;
    reason?: string;
  }> {
    try {
      const result = await BiometricAuth.checkBiometry();

      this.available = result.isAvailable;
      this.biometryType = result.biometryType;

      return {
        available: result.isAvailable,
        type: this.getBiometryTypeName(result.biometryType),
        reason: result.reason,
      };
    } catch (error) {
      console.error('Error checking biometry:', error);
      return { available: false, type: 'none', reason: 'Error checking' };
    }
  }

  private getBiometryTypeName(type: BiometryType): string {
    switch (type) {
      case BiometryType.touchId:
        return 'Touch ID';
      case BiometryType.faceId:
        return 'Face ID';
      case BiometryType.fingerprintAuthentication:
        return 'Fingerprint';
      case BiometryType.faceAuthentication:
        return 'Face Recognition';
      case BiometryType.irisAuthentication:
        return 'Iris';
      default:
        return 'None';
    }
  }
}`,
      highlightLines: [8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      type: 'text',
      content: '## Autenticar al Usuario\n\nUna vez verificada la disponibilidad, puedes solicitar autenticación:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/biometric.service.ts',
      code: `async authenticate(reason: string = 'Confirma tu identidad'): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!this.available) {
    return { success: false, error: 'Biometría no disponible' };
  }

  try {
    await BiometricAuth.authenticate({
      reason,
      cancelTitle: 'Cancelar',
      allowDeviceCredential: true, // Permite PIN/patrón como fallback
      iosFallbackTitle: 'Usar contraseña',
      androidTitle: 'Autenticación biométrica',
      androidSubtitle: 'Confirma tu identidad',
      androidConfirmationRequired: true,
    });

    return { success: true };
  } catch (error: any) {
    // Manejar errores específicos
    if (error.code === 'userCancel') {
      return { success: false, error: 'Autenticación cancelada' };
    }
    if (error.code === 'biometryLockout') {
      return { success: false, error: 'Demasiados intentos fallidos' };
    }
    return { success: false, error: error.message };
  }
}`,
      highlightLines: [9, 10, 11, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27],
    },
    {
      type: 'text',
      content: '## Hook de React para Biometría',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/hooks/useBiometric.ts',
      code: `import { useState, useEffect, useCallback } from 'react';
import { BiometricService } from '../services/biometric.service';

const biometricService = new BiometricService();

export function useBiometric() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState<string>('none');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    checkBiometry();
  }, []);

  const checkBiometry = async () => {
    const result = await biometricService.checkAvailability();
    setIsAvailable(result.available);
    setBiometryType(result.type);
  };

  const authenticate = useCallback(async (reason?: string) => {
    if (!isAvailable) return { success: false, error: 'No disponible' };

    setIsAuthenticating(true);
    try {
      const result = await biometricService.authenticate(reason);
      return result;
    } finally {
      setIsAuthenticating(false);
    }
  }, [isAvailable]);

  return {
    isAvailable,
    biometryType,
    isAuthenticating,
    authenticate,
    checkBiometry,
  };
}`,
      highlightLines: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    },
    {
      type: 'text',
      content: '## Ejemplo de Uso en Componente',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/components/BiometricLogin.tsx',
      code: `import { useBiometric } from '../hooks/useBiometric';
import { useAuth } from '../hooks/useAuth';

export function BiometricLogin() {
  const { isAvailable, biometryType, isAuthenticating, authenticate } = useBiometric();
  const { loginWithBiometric } = useAuth();

  const handleBiometricLogin = async () => {
    const result = await authenticate('Inicia sesión con ' + biometryType);

    if (result.success) {
      // Recuperar credenciales almacenadas de forma segura
      await loginWithBiometric();
    } else {
      // Mostrar error o fallback a login tradicional
      console.error(result.error);
    }
  };

  if (!isAvailable) {
    return null; // No mostrar botón si no está disponible
  }

  return (
    <button
      onClick={handleBiometricLogin}
      disabled={isAuthenticating}
      className="biometric-button"
    >
      {isAuthenticating ? 'Autenticando...' : \`Usar \${biometryType}\`}
    </button>
  );
}`,
      highlightLines: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    },
    {
      type: 'warning',
      content: 'Nunca almacenes tokens de sesión o credenciales en localStorage cuando uses biometría. Usa el Secure Storage del dispositivo.',
    },
    {
      type: 'tip',
      content: 'Configura allowDeviceCredential: true para permitir PIN/patrón como alternativa. Esto mejora la UX cuando la biometría falla.',
    },
  ],

  'oauth-pkce': [
    {
      type: 'text',
      content: '**OAuth 2.0 con PKCE** (Proof Key for Code Exchange) es el estándar de seguridad recomendado para autenticación en aplicaciones móviles. PKCE protege contra ataques de interceptación de código de autorización, especialmente críticos en apps nativas.',
    },
    {
      type: 'info',
      content: 'PKCE fue diseñado específicamente para apps públicas (móviles y SPAs) que no pueden almacenar un client_secret de forma segura.',
    },
    {
      type: 'text',
      content: '## ¿Por qué PKCE?\n\nEn una app móvil, el flujo OAuth tradicional tiene un problema: cualquier app maliciosa puede interceptar el redirect URI y robar el código de autorización. PKCE resuelve esto añadiendo un desafío criptográfico.',
    },
    {
      type: 'code',
      language: 'text',
      code: `Flujo OAuth 2.0 + PKCE:

1. App genera: code_verifier (string aleatorio)
2. App calcula: code_challenge = SHA256(code_verifier)
3. App → Auth Server: authorization request + code_challenge
4. Usuario se autentica en Auth Server
5. Auth Server → App: authorization_code (via redirect)
6. App → Auth Server: code + code_verifier
7. Auth Server verifica: SHA256(code_verifier) === code_challenge
8. Auth Server → App: access_token + refresh_token`,
    },
    {
      type: 'text',
      content: '## Implementación con capacitor-oauth2',
    },
    {
      type: 'code',
      language: 'bash',
      code: `npm install @byteowls/capacitor-oauth2`,
    },
    {
      type: 'text',
      content: '## Servicio de Autenticación OAuth',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/oauth.service.ts',
      code: `import { OAuth2Client } from '@byteowls/capacitor-oauth2';
import { Capacitor } from '@capacitor/core';

interface OAuthConfig {
  authorizationBaseUrl: string;
  tokenUrl: string;
  clientId: string;
  redirectUrl: string;
  scope: string;
}

const config: OAuthConfig = {
  authorizationBaseUrl: 'https://auth.example.com/authorize',
  tokenUrl: 'https://auth.example.com/oauth/token',
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  redirectUrl: Capacitor.isNativePlatform()
    ? 'com.myapp://oauth/callback'
    : \`\${window.location.origin}/oauth/callback\`,
  scope: 'openid profile email offline_access',
};

export class OAuthService {
  async login(): Promise<{ accessToken: string; refreshToken?: string }> {
    try {
      const response = await OAuth2Client.authenticate({
        appId: config.clientId,
        authorizationBaseUrl: config.authorizationBaseUrl,
        accessTokenEndpoint: config.tokenUrl,
        scope: config.scope,
        redirectUrl: config.redirectUrl,
        responseType: 'code',
        pkceEnabled: true, // ¡Crucial! Habilita PKCE
        web: {
          redirectUrl: config.redirectUrl,
          windowOptions: 'height=600,width=400',
        },
        android: {
          redirectUrl: config.redirectUrl,
          handleResultOnNewIntent: true,
          handleResultOnActivityResult: true,
        },
        ios: {
          redirectUrl: config.redirectUrl,
          siwaUseScope: true,
        },
      });

      return {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      };
    } catch (error: any) {
      if (error.message?.includes('cancelled')) {
        throw new Error('Login cancelado por el usuario');
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await OAuth2Client.logout({
        appId: config.clientId,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}`,
      highlightLines: [15, 16, 17, 30, 31, 32],
    },
    {
      type: 'text',
      content: '## Configuración de Deep Links\n\nPara que el redirect funcione en apps nativas, configura deep links:',
    },
    {
      type: 'code',
      language: 'xml',
      filename: 'android/app/src/main/AndroidManifest.xml',
      code: `<activity
    android:name=".MainActivity"
    android:exported="true">

    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="com.myapp"
            android:host="oauth"
            android:pathPrefix="/callback" />
    </intent-filter>
</activity>`,
      highlightLines: [9, 10, 11, 12],
    },
    {
      type: 'code',
      language: 'swift',
      filename: 'ios/App/App/Info.plist',
      code: `<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.myapp</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.myapp</string>
        </array>
    </dict>
</array>`,
    },
    {
      type: 'text',
      content: '## Refresh Token Flow',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/oauth.service.ts',
      code: `async refreshToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken?: string;
}> {
  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: config.clientId,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || refreshToken,
  };
}`,
      highlightLines: [10, 11, 12, 13],
    },
    {
      type: 'text',
      content: '## Hook useAuth con OAuth PKCE',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/hooks/useAuth.ts',
      code: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OAuthService } from '../services/oauth.service';
import { SecureStorage } from '../services/secure-storage.service';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const oauthService = new OAuthService();

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accessToken: null,
      user: null,

      login: async () => {
        const tokens = await oauthService.login();

        // Almacenar refresh token de forma segura
        await SecureStorage.set('refresh_token', tokens.refreshToken);

        // Obtener info del usuario
        const user = await fetchUserInfo(tokens.accessToken);

        set({
          isAuthenticated: true,
          accessToken: tokens.accessToken,
          user,
        });
      },

      logout: async () => {
        await oauthService.logout();
        await SecureStorage.remove('refresh_token');
        set({ isAuthenticated: false, accessToken: null, user: null });
      },

      refreshSession: async () => {
        const refreshToken = await SecureStorage.get('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        const tokens = await oauthService.refreshToken(refreshToken);
        await SecureStorage.set('refresh_token', tokens.refreshToken);

        set({ accessToken: tokens.accessToken });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);`,
      highlightLines: [24, 25, 26, 27, 28, 29, 44, 45, 46, 47, 48, 49, 50],
    },
    {
      type: 'warning',
      content: 'Nunca almacenes el refresh_token en localStorage o AsyncStorage. Usa siempre Secure Storage nativo (Keychain en iOS, EncryptedSharedPreferences en Android).',
    },
    {
      type: 'tip',
      content: 'Configura tiempos de expiración cortos para access_tokens (15 min) y usa refresh_tokens con rotación automática para máxima seguridad.',
    },
  ],

  'secure-storage': [
    {
      type: 'text',
      content: 'El **almacenamiento seguro** en apps móviles es fundamental para proteger datos sensibles como tokens, credenciales y información personal. En Capacitor, el plugin **@capacitor/preferences** NO es seguro para datos sensibles - necesitas usar almacenamiento cifrado nativo.',
    },
    {
      type: 'warning',
      content: 'localStorage, sessionStorage y @capacitor/preferences almacenan datos en texto plano. NUNCA uses estos para tokens, contraseñas o datos sensibles.',
    },
    {
      type: 'text',
      content: '## Opciones de Almacenamiento Seguro\n\n| Solución | iOS | Android | Características |\n|----------|-----|---------|----------------|\n| @capacitor-community/secure-storage | Keychain | EncryptedSharedPreferences | Básico, gratuito |\n| @ionic-enterprise/identity-vault | Keychain | Android Keystore | Avanzado, biometría integrada |\n| Implementación custom | Keychain Services | Android Keystore | Control total |',
    },
    {
      type: 'text',
      content: '## Usando @capacitor-community/secure-storage',
    },
    {
      type: 'code',
      language: 'bash',
      code: `npm install @capacitor-community/secure-storage-plugin
npx cap sync`,
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/secure-storage.service.ts',
      code: `import { SecureStoragePlugin } from '@capacitor-community/secure-storage-plugin';

export class SecureStorage {
  private static readonly PREFIX = 'app_secure_';

  /**
   * Almacena un valor de forma segura
   */
  static async set(key: string, value: string): Promise<void> {
    try {
      await SecureStoragePlugin.set({
        key: this.PREFIX + key,
        value,
      });
    } catch (error) {
      console.error('SecureStorage set error:', error);
      throw new Error('Failed to store secure data');
    }
  }

  /**
   * Recupera un valor almacenado
   */
  static async get(key: string): Promise<string | null> {
    try {
      const result = await SecureStoragePlugin.get({
        key: this.PREFIX + key,
      });
      return result.value;
    } catch (error) {
      // El plugin lanza error si la key no existe
      return null;
    }
  }

  /**
   * Elimina un valor
   */
  static async remove(key: string): Promise<void> {
    try {
      await SecureStoragePlugin.remove({
        key: this.PREFIX + key,
      });
    } catch (error) {
      // Ignorar si no existe
    }
  }

  /**
   * Elimina todos los valores de la app
   */
  static async clear(): Promise<void> {
    try {
      await SecureStoragePlugin.clear();
    } catch (error) {
      console.error('SecureStorage clear error:', error);
    }
  }

  /**
   * Almacena un objeto JSON
   */
  static async setObject<T>(key: string, value: T): Promise<void> {
    await this.set(key, JSON.stringify(value));
  }

  /**
   * Recupera un objeto JSON
   */
  static async getObject<T>(key: string): Promise<T | null> {
    const value = await this.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
}`,
      highlightLines: [10, 11, 12, 13, 25, 26, 27, 58, 59, 65, 66, 67, 68, 69, 70],
    },
    {
      type: 'text',
      content: '## Gestión Segura de Tokens',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/token.service.ts',
      code: `import { SecureStorage } from './secure-storage.service';

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export class TokenService {
  private static readonly TOKEN_KEY = 'auth_tokens';
  private static tokenCache: TokenData | null = null;

  static async saveTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ): Promise<void> {
    const tokenData: TokenData = {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000,
    };

    await SecureStorage.setObject(this.TOKEN_KEY, tokenData);
    this.tokenCache = tokenData;
  }

  static async getAccessToken(): Promise<string | null> {
    // Primero verificar cache en memoria
    if (this.tokenCache && !this.isExpired(this.tokenCache)) {
      return this.tokenCache.accessToken;
    }

    // Cargar desde storage seguro
    const tokenData = await SecureStorage.getObject<TokenData>(this.TOKEN_KEY);

    if (!tokenData) return null;

    if (this.isExpired(tokenData)) {
      // Token expirado, intentar refresh
      return null;
    }

    this.tokenCache = tokenData;
    return tokenData.accessToken;
  }

  static async getRefreshToken(): Promise<string | null> {
    if (this.tokenCache) {
      return this.tokenCache.refreshToken;
    }

    const tokenData = await SecureStorage.getObject<TokenData>(this.TOKEN_KEY);
    return tokenData?.refreshToken || null;
  }

  static async clearTokens(): Promise<void> {
    await SecureStorage.remove(this.TOKEN_KEY);
    this.tokenCache = null;
  }

  private static isExpired(tokenData: TokenData): boolean {
    // Considerar expirado 5 minutos antes para dar margen
    const bufferMs = 5 * 60 * 1000;
    return Date.now() >= tokenData.expiresAt - bufferMs;
  }
}`,
      highlightLines: [17, 18, 19, 20, 21, 22, 23, 24, 28, 29, 30, 31, 37, 38, 39, 40, 59, 60, 61, 62],
    },
    {
      type: 'text',
      content: '## Interceptor HTTP con Tokens',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/api.service.ts',
      code: `import { TokenService } from './token.service';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const accessToken = await TokenService.getAccessToken();

    const headers = new Headers(options.headers);

    if (accessToken) {
      headers.set('Authorization', \`Bearer \${accessToken}\`);
    }

    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      ...options,
      headers,
    });

    // Si el token expiró, intentar refresh
    if (response.status === 401) {
      const newToken = await this.refreshAndRetry();
      if (newToken) {
        headers.set('Authorization', \`Bearer \${newToken}\`);
        const retryResponse = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
          ...options,
          headers,
        });
        return retryResponse.json();
      }
      throw new Error('Session expired');
    }

    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }

    return response.json();
  }

  private async refreshAndRetry(): Promise<string | null> {
    const refreshToken = await TokenService.getRefreshToken();
    if (!refreshToken) return null;

    try {
      // Llamar al endpoint de refresh
      const response = await fetch(\`\${this.baseUrl}/auth/refresh\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) return null;

      const data = await response.json();
      await TokenService.saveTokens(
        data.access_token,
        data.refresh_token,
        data.expires_in
      );

      return data.access_token;
    } catch {
      return null;
    }
  }
}

export const api = new ApiService(import.meta.env.VITE_API_URL);`,
      highlightLines: [14, 17, 18, 19, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    },
    {
      type: 'tip',
      content: 'Usa un cache en memoria para el access_token y solo accede al Secure Storage cuando sea necesario. Esto mejora el rendimiento significativamente.',
    },
    {
      type: 'info',
      content: 'En iOS, Keychain persiste los datos incluso después de desinstalar la app. Considera limpiar los datos en el primer lanzamiento post-instalación.',
    },
  ],

  'ssl-pinning': [
    {
      type: 'text',
      content: '**SSL/Certificate Pinning** es una técnica de seguridad que protege tu app contra ataques Man-in-the-Middle (MITM) al verificar que el certificado del servidor coincide con un certificado conocido "pineado" en la app.',
    },
    {
      type: 'info',
      content: 'Sin SSL Pinning, un atacante con acceso a la red (WiFi público, proxy corporativo) puede interceptar el tráfico HTTPS usando un certificado falso.',
    },
    {
      type: 'text',
      content: '## ¿Cómo Funciona SSL Pinning?\n\n1. **Sin Pinning:** App confía en cualquier certificado firmado por una CA\n2. **Con Pinning:** App solo confía en certificados específicos que tú defines\n\nPuedes pinear:\n- El certificado completo\n- La clave pública (public key)\n- El hash del certificado (más común)',
    },
    {
      type: 'text',
      content: '## Implementación con capacitor-ssl-pinning',
    },
    {
      type: 'code',
      language: 'bash',
      code: `npm install @phuocbv/capacitor-ssl-pinning
npx cap sync`,
    },
    {
      type: 'text',
      content: '## Obtener el Hash del Certificado\n\nPrimero, necesitas obtener el hash SHA-256 del certificado de tu servidor:',
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Obtener el certificado y calcular su hash SHA-256
echo | openssl s_client -servername api.tudominio.com -connect api.tudominio.com:443 2>/dev/null | \\
  openssl x509 -pubkey -noout | \\
  openssl pkey -pubin -outform der | \\
  openssl dgst -sha256 -binary | \\
  openssl enc -base64

# Output ejemplo: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=`,
    },
    {
      type: 'text',
      content: '## Configurar SSL Pinning',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/ssl-pinning.service.ts',
      code: `import { SSLPinning } from '@phuocbv/capacitor-ssl-pinning';
import { Capacitor } from '@capacitor/core';

// Configuración de pines por dominio
const SSL_PINS: Record<string, string[]> = {
  'api.tudominio.com': [
    // Pin actual
    'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
    // Pin de backup (siguiente certificado)
    'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=',
  ],
  'auth.tudominio.com': [
    'sha256/CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC=',
  ],
};

export class SSLPinningService {
  private static initialized = false;

  static async initialize(): Promise<void> {
    // Solo necesario en plataformas nativas
    if (!Capacitor.isNativePlatform()) {
      console.log('SSL Pinning: Skipped on web');
      return;
    }

    if (this.initialized) return;

    try {
      // Configurar los pines
      for (const [hostname, pins] of Object.entries(SSL_PINS)) {
        await SSLPinning.addCertificate({
          hostname,
          pins,
        });
      }

      // Habilitar pinning
      await SSLPinning.enable();

      this.initialized = true;
      console.log('SSL Pinning: Enabled');
    } catch (error) {
      console.error('SSL Pinning setup failed:', error);
      // En producción, podrías querer bloquear la app aquí
      if (import.meta.env.PROD) {
        throw new Error('Security configuration failed');
      }
    }
  }

  static async disable(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;

    await SSLPinning.disable();
    this.initialized = false;
  }
}`,
      highlightLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 29, 30, 31, 32, 33, 34, 36],
    },
    {
      type: 'text',
      content: '## Inicializar en el Arranque de la App',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/main.tsx',
      code: `import { SSLPinningService } from './services/ssl-pinning.service';

async function bootstrap() {
  // Inicializar SSL Pinning ANTES de cualquier llamada HTTP
  await SSLPinningService.initialize();

  // Resto de la inicialización de la app
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<App />);
}

bootstrap().catch(console.error);`,
      highlightLines: [4, 5],
    },
    {
      type: 'text',
      content: '## Implementación Alternativa: Plugin Nativo Custom\n\nPara mayor control, puedes implementar SSL Pinning directamente en código nativo:',
    },
    {
      type: 'code',
      language: 'kotlin',
      filename: 'android/app/src/main/java/SSLPinningPlugin.kt',
      code: `// Android: Usando OkHttp CertificatePinner
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

val certificatePinner = CertificatePinner.Builder()
    .add("api.tudominio.com", "sha256/AAAA...")
    .add("api.tudominio.com", "sha256/BBBB...") // Backup pin
    .build()

val client = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .build()`,
      highlightLines: [5, 6, 7],
    },
    {
      type: 'code',
      language: 'swift',
      filename: 'ios/App/App/SSLPinning.swift',
      code: `// iOS: Usando URLSession delegate
import Foundation
import CommonCrypto

class SSLPinningDelegate: NSObject, URLSessionDelegate {
    let pinnedHashes: Set<String> = [
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
        "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB="
    ]

    func urlSession(_ session: URLSession,
                    didReceive challenge: URLAuthenticationChallenge,
                    completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {

        guard let serverTrust = challenge.protectionSpace.serverTrust,
              let certificate = SecTrustGetCertificateAtIndex(serverTrust, 0) else {
            completionHandler(.cancelAuthenticationChallenge, nil)
            return
        }

        let serverHash = sha256Hash(of: certificate)

        if pinnedHashes.contains(serverHash) {
            completionHandler(.useCredential, URLCredential(trust: serverTrust))
        } else {
            completionHandler(.cancelAuthenticationChallenge, nil)
        }
    }
}`,
      highlightLines: [6, 7, 8, 9, 22, 23, 24, 25, 26],
    },
    {
      type: 'warning',
      content: 'Siempre incluye al menos 2 pines: el actual y uno de backup. Si el certificado expira o cambia sin tener un backup, tu app dejará de funcionar.',
    },
    {
      type: 'text',
      content: '## Rotación de Certificados\n\nCuando tu certificado esté por expirar:\n\n1. Obtén el hash del nuevo certificado\n2. Agrégalo como pin de backup en una actualización de la app\n3. Espera a que los usuarios actualicen\n4. Rota el certificado en el servidor\n5. En la siguiente versión, remueve el pin antiguo',
    },
    {
      type: 'tip',
      content: 'En desarrollo, puedes deshabilitar SSL Pinning para permitir proxies como Charles o Fiddler. Usa variables de entorno para controlar esto.',
    },
  ],

  'app-hardening': [
    {
      type: 'text',
      content: 'El **hardening de aplicaciones** comprende técnicas para dificultar la ingeniería inversa, manipulación y ataques a tu app móvil. Aunque ninguna protección es 100% efectiva, múltiples capas de seguridad aumentan significativamente el esfuerzo requerido para comprometer tu app.',
    },
    {
      type: 'text',
      content: '## Detección de Root/Jailbreak\n\nDetectar si el dispositivo está rooteado (Android) o con jailbreak (iOS) es importante para apps que manejan datos sensibles:',
    },
    {
      type: 'code',
      language: 'bash',
      code: `npm install @AyushmehtaTech/capacitor-root-jailbreak-detector
npx cap sync`,
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/device-integrity.service.ts',
      code: `import { RootJailbreakDetector } from '@AyushmehtaTech/capacitor-root-jailbreak-detector';
import { Capacitor } from '@capacitor/core';

export interface DeviceIntegrityResult {
  isCompromised: boolean;
  isRooted: boolean;
  isJailbroken: boolean;
  isEmulator: boolean;
  isDebugMode: boolean;
}

export class DeviceIntegrityService {
  static async check(): Promise<DeviceIntegrityResult> {
    if (!Capacitor.isNativePlatform()) {
      // En web, no podemos verificar
      return {
        isCompromised: false,
        isRooted: false,
        isJailbroken: false,
        isEmulator: false,
        isDebugMode: import.meta.env.DEV,
      };
    }

    const platform = Capacitor.getPlatform();

    try {
      if (platform === 'android') {
        const [rootResult, emulatorResult] = await Promise.all([
          RootJailbreakDetector.isRooted(),
          RootJailbreakDetector.isRunningOnEmulator(),
        ]);

        return {
          isCompromised: rootResult.isRooted || emulatorResult.isRunningOnEmulator,
          isRooted: rootResult.isRooted,
          isJailbroken: false,
          isEmulator: emulatorResult.isRunningOnEmulator,
          isDebugMode: await this.isDebuggable(),
        };
      } else {
        const [jailbreakResult, emulatorResult] = await Promise.all([
          RootJailbreakDetector.isJailbroken(),
          RootJailbreakDetector.isRunningOnSimulator(),
        ]);

        return {
          isCompromised: jailbreakResult.isJailbroken || emulatorResult.isRunningOnSimulator,
          isRooted: false,
          isJailbroken: jailbreakResult.isJailbroken,
          isEmulator: emulatorResult.isRunningOnSimulator,
          isDebugMode: await this.isDebuggable(),
        };
      }
    } catch (error) {
      console.error('Device integrity check failed:', error);
      // En caso de error, asumir comprometido por seguridad
      return {
        isCompromised: true,
        isRooted: false,
        isJailbroken: false,
        isEmulator: false,
        isDebugMode: true,
      };
    }
  }

  private static async isDebuggable(): Promise<boolean> {
    // Verificación adicional de modo debug
    try {
      const result = await RootJailbreakDetector.isDebuggable();
      return result.isDebuggable;
    } catch {
      return false;
    }
  }
}`,
      highlightLines: [13, 14, 15, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38],
    },
    {
      type: 'text',
      content: '## Protección del Código JavaScript\n\nPara apps Capacitor, el código JS está accesible en el bundle. Usa ofuscación para dificultar la ingeniería inversa:',
    },
    {
      type: 'code',
      language: 'bash',
      code: `npm install --save-dev javascript-obfuscator rollup-plugin-obfuscator`,
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'vite.config.ts',
      code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscatorPlugin from 'rollup-plugin-obfuscator';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        // Solo en producción
        process.env.NODE_ENV === 'production' && obfuscatorPlugin({
          options: {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: true,
            debugProtectionInterval: 2000,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 10,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 0.75,
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
          },
        }),
      ].filter(Boolean),
    },
  },
});`,
      highlightLines: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    },
    {
      type: 'text',
      content: '## Detección de Tampering\n\nVerifica la integridad de tu app para detectar modificaciones:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/integrity-check.service.ts',
      code: `import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

export class IntegrityCheckService {
  // Hash esperado del bundle en producción
  private static readonly EXPECTED_CHECKSUMS: Record<string, string> = {
    ios: import.meta.env.VITE_IOS_BUNDLE_CHECKSUM || '',
    android: import.meta.env.VITE_ANDROID_BUNDLE_CHECKSUM || '',
  };

  static async verifyAppSignature(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return true;

    try {
      const info = await App.getInfo();
      const platform = Capacitor.getPlatform();

      // Verificar que el ID de la app no fue modificado
      const expectedBundleId = import.meta.env.VITE_BUNDLE_ID;
      if (info.id !== expectedBundleId) {
        console.error('Bundle ID mismatch:', info.id);
        return false;
      }

      // En producción, verificar firma
      if (import.meta.env.PROD) {
        // Implementar verificación de firma nativa
        // Esto requiere código nativo adicional
        return await this.verifyNativeSignature();
      }

      return true;
    } catch (error) {
      console.error('Integrity check failed:', error);
      return false;
    }
  }

  private static async verifyNativeSignature(): Promise<boolean> {
    // Esta verificación debe implementarse en código nativo
    // Android: Verificar certificado de firma
    // iOS: Verificar provisioning profile
    return true; // Placeholder
  }

  static async checkAtLaunch(): Promise<void> {
    const [deviceIntegrity, appIntegrity] = await Promise.all([
      import('./device-integrity.service').then(m => m.DeviceIntegrityService.check()),
      this.verifyAppSignature(),
    ]);

    if (deviceIntegrity.isCompromised) {
      // Decidir qué hacer: bloquear, advertir, o degradar funcionalidad
      console.warn('Device integrity compromised');

      // Para apps de alta seguridad (fintech, salud):
      if (import.meta.env.VITE_STRICT_SECURITY === 'true') {
        throw new Error('This app cannot run on compromised devices');
      }
    }

    if (!appIntegrity) {
      console.error('App integrity check failed');
      throw new Error('App integrity verification failed');
    }
  }
}`,
      highlightLines: [11, 12, 13, 19, 20, 21, 22, 23, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57],
    },
    {
      type: 'text',
      content: '## Configuración Android: ProGuard',
    },
    {
      type: 'code',
      language: 'text',
      filename: 'android/app/proguard-rules.pro',
      code: `# Reglas de ProGuard para Capacitor
-keep class com.getcapacitor.** { *; }
-keep class * extends com.getcapacitor.Plugin { *; }

# Ofuscar nombres de clases y métodos
-repackageclasses ''
-allowaccessmodification
-optimizations !code/simplification/arithmetic

# Eliminar logs en release
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}

# Proteger código sensible
-keep,allowobfuscation class com.tuapp.security.** { *; }`,
      highlightLines: [6, 7, 8, 11, 12, 13, 14, 15],
    },
    {
      type: 'warning',
      content: 'El hardening aumenta la seguridad pero también puede afectar el rendimiento y la experiencia de desarrollo. Usa diferentes configuraciones para dev y producción.',
    },
    {
      type: 'tip',
      content: 'Considera usar soluciones comerciales como Guardsquare (DexGuard/iXGuard) para apps que requieren máxima protección contra ingeniería inversa.',
    },
  ],

  'owasp-compliance': [
    {
      type: 'text',
      content: 'El **OWASP Mobile Application Security Verification Standard (MASVS)** define los requisitos de seguridad para aplicaciones móviles. Cumplir con OWASP te ayuda a identificar y mitigar las vulnerabilidades más comunes en apps móviles.',
    },
    {
      type: 'info',
      content: 'OWASP MASVS tiene 3 niveles: L1 (estándar), L2 (defense-in-depth), y R (resistencia a ingeniería inversa). La mayoría de apps comerciales deben cumplir al menos L1.',
    },
    {
      type: 'text',
      content: '## OWASP Mobile Top 10 (2024)\n\n| # | Vulnerabilidad | Mitigación en Capacitor |\n|---|----------------|------------------------|\n| M1 | Improper Platform Usage | Usar APIs nativas correctamente |\n| M2 | Insecure Data Storage | Secure Storage, no localStorage |\n| M3 | Insecure Communication | SSL Pinning, HTTPS only |\n| M4 | Insecure Authentication | OAuth PKCE, biometría |\n| M5 | Insufficient Cryptography | Usar crypto nativo, no JS |\n| M6 | Insecure Authorization | Validar permisos server-side |\n| M7 | Client Code Quality | Code review, linting |\n| M8 | Code Tampering | App hardening, integrity checks |\n| M9 | Reverse Engineering | Ofuscación, SSL Pinning |\n| M10 | Extraneous Functionality | Remover debug code |',
    },
    {
      type: 'text',
      content: '## Checklist de Seguridad OWASP',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/utils/security-checklist.ts',
      code: `/**
 * Security Checklist basado en OWASP MASVS
 * Ejecutar antes de cada release
 */
export const SECURITY_CHECKLIST = {
  // MASVS-STORAGE: Almacenamiento de datos
  storage: {
    noSensitiveDataInLogs: 'No loguear tokens, contraseñas o PII',
    secureStorageForCredentials: 'Usar Keychain/Keystore para credenciales',
    noSensitiveDataInBackups: 'Excluir datos sensibles de backups',
    noSensitiveDataInClipboard: 'Limpiar clipboard después de pegar',
    noDataLeakageViaSnapshots: 'Ocultar contenido en app switcher',
  },

  // MASVS-CRYPTO: Criptografía
  crypto: {
    strongAlgorithms: 'Usar AES-256, RSA-2048+, SHA-256+',
    secureKeyStorage: 'Keys en Keychain/Keystore, no hardcoded',
    secureRandomGeneration: 'Usar SecureRandom, no Math.random',
    noBrokenCrypto: 'No usar MD5, SHA1, DES, 3DES',
  },

  // MASVS-AUTH: Autenticación
  auth: {
    biometricAsSecondFactor: 'Biometría complementa, no reemplaza',
    sessionManagement: 'Tokens con expiración, refresh rotation',
    securePasswordPolicy: 'Mínimo 8 caracteres, complejidad',
    accountLockout: 'Bloqueo después de intentos fallidos',
  },

  // MASVS-NETWORK: Comunicación
  network: {
    httpsOnly: 'Solo conexiones HTTPS',
    certificatePinning: 'SSL Pinning implementado',
    noCustomCAs: 'No aceptar CAs personalizadas en producción',
    secureWebViews: 'Deshabilitar file:// y content:// en WebView',
  },

  // MASVS-PLATFORM: Uso de plataforma
  platform: {
    minimumPermissions: 'Solo permisos necesarios',
    secureDeepLinks: 'Validar todas las URLs de deep links',
    secureWebViewConfig: 'JavaScript deshabilitado si no es necesario',
    exportedComponentsSecurity: 'Componentes exportados protegidos',
  },

  // MASVS-CODE: Calidad de código
  code: {
    noDebugCode: 'Sin console.log en producción',
    noHardcodedSecrets: 'Sin API keys en código',
    inputValidation: 'Validar todos los inputs',
    errorHandling: 'No exponer stack traces',
  },

  // MASVS-RESILIENCE: Resistencia
  resilience: {
    rootDetection: 'Detectar root/jailbreak',
    tamperDetection: 'Verificar integridad de la app',
    antiDebugging: 'Detectar debuggers en producción',
    codeObfuscation: 'Ofuscar código en producción',
  },
};`,
      highlightLines: [8, 9, 10, 11, 12, 16, 17, 18, 19, 23, 24, 25, 26, 30, 31, 32, 33],
    },
    {
      type: 'text',
      content: '## Implementación de Controles de Seguridad',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'src/services/security.service.ts',
      code: `import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { DeviceIntegrityService } from './device-integrity.service';
import { SSLPinningService } from './ssl-pinning.service';

interface SecurityConfig {
  enforceSSLPinning: boolean;
  blockRootedDevices: boolean;
  blockEmulators: boolean;
  enableAntiTampering: boolean;
  sessionTimeoutMinutes: number;
}

const DEFAULT_CONFIG: SecurityConfig = {
  enforceSSLPinning: true,
  blockRootedDevices: false, // true para apps de alta seguridad
  blockEmulators: false,     // true para producción
  enableAntiTampering: true,
  sessionTimeoutMinutes: 30,
};

export class SecurityService {
  private static config: SecurityConfig = DEFAULT_CONFIG;
  private static sessionTimeout: NodeJS.Timeout | null = null;

  static async initialize(customConfig?: Partial<SecurityConfig>): Promise<void> {
    this.config = { ...DEFAULT_CONFIG, ...customConfig };

    // 1. Verificar integridad del dispositivo
    await this.checkDeviceIntegrity();

    // 2. Configurar SSL Pinning
    if (this.config.enforceSSLPinning) {
      await SSLPinningService.initialize();
    }

    // 3. Configurar listeners de seguridad
    this.setupSecurityListeners();

    // 4. Iniciar timeout de sesión
    this.resetSessionTimeout();

    console.log('Security initialized');
  }

  private static async checkDeviceIntegrity(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;

    const integrity = await DeviceIntegrityService.check();

    if (this.config.blockRootedDevices && (integrity.isRooted || integrity.isJailbroken)) {
      throw new SecurityError(
        'DEVICE_COMPROMISED',
        'Esta app no puede ejecutarse en dispositivos rooteados'
      );
    }

    if (this.config.blockEmulators && integrity.isEmulator) {
      throw new SecurityError(
        'EMULATOR_DETECTED',
        'Esta app no puede ejecutarse en emuladores'
      );
    }
  }

  private static setupSecurityListeners(): void {
    // Detectar cuando la app va a background
    App.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) {
        // Ocultar contenido sensible para screenshot
        this.hideSecureContent();
        // Pausar timeout de sesión
        this.pauseSessionTimeout();
      } else {
        this.showSecureContent();
        this.resetSessionTimeout();
      }
    });

    // Detectar capturas de pantalla (iOS)
    App.addListener('screenshotTaken', () => {
      // Advertir al usuario o loguear evento
      console.warn('Screenshot detected');
      this.logSecurityEvent('screenshot_taken');
    });
  }

  private static hideSecureContent(): void {
    // Agregar overlay para ocultar datos sensibles en app switcher
    const overlay = document.createElement('div');
    overlay.id = 'security-overlay';
    overlay.style.cssText = \`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      z-index: 99999;
    \`;
    document.body.appendChild(overlay);
  }

  private static showSecureContent(): void {
    const overlay = document.getElementById('security-overlay');
    overlay?.remove();
  }

  private static resetSessionTimeout(): void {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }

    this.sessionTimeout = setTimeout(() => {
      this.logSecurityEvent('session_timeout');
      // Disparar evento de timeout
      window.dispatchEvent(new CustomEvent('security:session-timeout'));
    }, this.config.sessionTimeoutMinutes * 60 * 1000);
  }

  private static pauseSessionTimeout(): void {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
      this.sessionTimeout = null;
    }
  }

  private static logSecurityEvent(event: string, data?: Record<string, any>): void {
    // Enviar a tu sistema de analytics/logging
    console.log('Security event:', event, data);
  }
}

class SecurityError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'SecurityError';
  }
}`,
      highlightLines: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 44, 45, 46, 47, 48, 49, 50, 51, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73],
    },
    {
      type: 'text',
      content: '## Configuración Segura de WebView',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'capacitor.config.ts',
      code: `import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuapp.segura',
  appName: 'Tu App Segura',
  webDir: 'dist',

  // Configuración de seguridad del WebView
  server: {
    // Solo en desarrollo
    ...(process.env.NODE_ENV === 'development' && {
      url: 'http://localhost:5173',
      cleartext: true,
    }),
  },

  android: {
    // Deshabilitar backup de datos
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false, // IMPORTANTE en producción
  },

  ios: {
    // Configuración de seguridad iOS
    contentInset: 'always',
    allowsLinkPreview: false,
    scrollEnabled: true,
  },

  plugins: {
    // Configuración de plugins de seguridad
    SplashScreen: {
      launchAutoHide: false, // Control manual para verificaciones
    },
  },
};

export default config;`,
      highlightLines: [9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21],
    },
    {
      type: 'text',
      content: '## Auditoría de Seguridad Automatizada',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'package.json',
      code: `{
  "scripts": {
    "security:audit": "npm audit --audit-level=moderate",
    "security:check": "snyk test",
    "security:lint": "eslint src --ext .ts,.tsx --rule 'no-console: error' --rule 'no-debugger: error'",
    "prebuild": "npm run security:audit && npm run security:lint"
  },
  "devDependencies": {
    "snyk": "^1.1200.0",
    "eslint-plugin-security": "^2.1.0"
  }
}`,
      highlightLines: [3, 4, 5, 6],
    },
    {
      type: 'warning',
      content: 'La seguridad es un proceso continuo. Realiza auditorías periódicas, mantén dependencias actualizadas, y considera penetration testing antes de lanzamientos importantes.',
    },
    {
      type: 'tip',
      content: 'Usa herramientas como OWASP ZAP, MobSF, o Frida para probar la seguridad de tu app antes del lanzamiento. Muchas vulnerabilidades solo se detectan con testing activo.',
    },
  ],
}
