declare module '*.pug' {
    import type { DefineComponent } from 'pug'

    const component: DefineComponent<{}, {}, any>
    export default component
  }