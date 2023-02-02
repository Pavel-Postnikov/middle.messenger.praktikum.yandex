declare module '*.scss' {
    import type { DefineComponent } from 'scss'

    const component: DefineComponent<{}, {}, any>
    export default component
  }