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
}
