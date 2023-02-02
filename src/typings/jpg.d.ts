declare module '*.jpg' {
    import type { DefineComponent } from 'jpg'

    const component: DefineComponent<{}, {}, any>
    export default component
  }