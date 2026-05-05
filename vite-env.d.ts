/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_CLOUD_NAME: string
  readonly VITE_ENABLE_REMOTE_LOGGING?: string
  readonly VITE_LOCAL?: string
}

declare module '*.svg?react' {
  import { SVGProps } from 'react'
  const ReactComponent: (props: SVGProps<SVGSVGElement> & { title?: string }) => JSX.Element

  export default ReactComponent
}
