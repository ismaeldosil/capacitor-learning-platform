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
}
