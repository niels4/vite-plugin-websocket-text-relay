# vite-plugin-websocket-text-relay

The `vite-plugin-websocket-text-relay` is a Vite plugin designed to work with the [websocket-text-relay](https://github.com/niels4/websocket-text-relay) language server to enhance real-time web development
workflows by automatically relaying file changes to the vite hot module reload lifecycle over WebSockets.

To use this vite plugin, first follow instructions in the [websocket-text-relay](https://github.com/niels4/websocket-text-relay) readme for installing the the language server plugin for your text editor.

Once your text editor is running the language server plugin, you should be able to see the status UI at [http://localhost:38378](http://localhost:38378). We are now ready to see live updates in our Vite projects.

## installation and usage

The vite plugin is installed and run just like any other vite plugin. Here is an example creating a new vite project using this plugin:

**First create a new vite project using typescript and react:**

```
npm create vite@latest
```

Choose a name for the project. In this example I choose "vite-wtr-demo"  
When asked which framework to use, use the arrow keys to select 'react' and press enter.  
When asked which variant, select typescript + swc  

The results should look like this:

```
% npm create vite@latest                                                                                                                                                                                                                                                                               127 ↵
Need to install the following packages:
create-vite@5.2.3
Ok to proceed? (y) y
✔ Project name: … vite-wtr-demo
✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC

Scaffolding project in /path/to/project/vite-wtr-demo...

Done. Now run:

  cd vite-wtr-demo
  npm install
  npm run dev

```

**Now we install and configure the plugin:**

```
cd vite-wtr-demo
npm install --save-dev vite-plugin-websocket-text-relay
```

Then open up the `vite.config.ts` file that was created, import the plugin and add it to the plugins list.

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import websocketTextRelay from 'vite-plugin-websocket-text-relay'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), websocketTextRelay()],
})
```

**Edit files and see live changes:**

Run the app using `npm run dev -- --open` and you should see your browser open up to the locally hosted app.

Now open up `src/App.tsx` in your text editor running the websocket-text-relay plugin. Try changing some text
in the header and see the text update immediately.

You can also open up `src/App.css` and see live updates from your css files as well.
