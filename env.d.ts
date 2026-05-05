/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vanilla-tilt' {
  interface TiltOptions {
    max?: number
    speed?: number
    glare?: boolean
    'max-glare'?: number
  }
  const VanillaTilt: {
    init(el: HTMLElement, options?: TiltOptions): void
  }
  export default VanillaTilt
}
