import WebSocket from 'ws'
import path from "node:path"

const WTR_PORT = 38378
const RECONNECT_DELAY_SECONDS = 1

export class WebsocketTextRelayClient {
  constructor ({viteServer}) {
    this.viteServer = viteServer
    this.projectName = path.basename(viteServer.config.root)
    this.connected = false
    this.watchedFiles = new Map()
    this._startClient = this._startClient.bind(this)
    this._onOpen = this._onOpen.bind(this)
    this._onClose = this._onClose.bind(this)
    this._onError = this._onError.bind(this)
    this._onMessage = this._onMessage.bind(this)
    this._startClient()
  }

  watchFile (fileId) {
    if (this.watchedFiles.has(fileId)) { return }
    this.watchedFiles.set(fileId, null)
    this._sendWatchMessage(fileId)
  }

  _startClient () {
    this.ws = new WebSocket(`ws://localhost:${WTR_PORT}`)
    this.ws.once('open', this._onOpen)
    this.ws.once('close', this._onClose)
    this.ws.once('error', this._onError)
    this.ws.on('message', this._onMessage)
  }

  _stopClient () {
    this.ws.close()
    this.ws.removeListener('open', this._onOpen)
    this.ws.removeListener('close', this._onClose)
    this.ws.removeListener('error', this._onError)
    this.ws.removeListener('message', this._onMessage)
    this.ws = null
  }

  _onOpen () {
    console.log("WebsocketTextRelayClient connected")
    this.ws.send(JSON.stringify({ method: "init", name: this.projectName }))
    this.connected = true
    for (const fileId of this.watchedFiles.keys()) {
      this._sendWatchMessage(fileId)
    }
  }

  _onClose () {
    console.log("WebsocketTextRelayClient closed")
    this._stopClient()
    setTimeout(this._startClient, RECONNECT_DELAY_SECONDS * 1000)
  }

  _onError (e) {
    console.log("Websocket text relay client error:", e)
  }

  _onMessage (data) {
    let msg
    try {
      msg = JSON.parse(data.toString())
    } catch (e) {
      console.error("WebsocketTextRelayClient: Error parsing JSON")
      return
    }
    const {method, contents, endsWith: fileId} = msg
    if (method === 'watch-file') {
      this.watchedFiles.set(fileId, contents)
      this.viteServer.watcher.emit('change', fileId)
    }
  }

  _sendWatchMessage (fileId) {
    if (!this.connected) { return }
    this.ws.send(JSON.stringify({method: 'watch-file', endsWith: fileId}))
  }
}
