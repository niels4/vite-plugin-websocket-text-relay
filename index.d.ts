declare type PluginObject = {
  name: "websocket-text-relay"
  apply: "serve"
  enforce: "pre"
  configureServer: (viteServer: any) => void
  load: (id: string) => string
}

declare function pluginFunction(): PluginObject;

export default pluginFunction;
