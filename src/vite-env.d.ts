/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
