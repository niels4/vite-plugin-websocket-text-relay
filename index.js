import {WebsocketTextRelayClient} from './WebsocketTextRelayClient.js'

const websocketTextRelay = () => {
  let wtrClient

  return {
    name: 'websocket-text-relay',
    apply: "serve",
    enforce: "pre",
    configureServer(viteServer) {
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
