import {WebsocketTextRelayClient} from './WebsocketTextRelayClient.js'

const websocketTextRelay = () => {
  let wtrClient

  return {
    name: 'websocket-text-relay',
    apply: "serve",
    enforce: "pre",
    configureServer(viteServer) {
      if (process.env.VITEST) {
        return // don't start plugin when running tests
      }
      wtrClient = new WebsocketTextRelayClient({viteServer})
    },
    load (id) {
      if (!wtrClient) { return }
      wtrClient.watchFile(id)
      return wtrClient.watchedFiles.get(id)
    }
  }
}

export default websocketTextRelay
