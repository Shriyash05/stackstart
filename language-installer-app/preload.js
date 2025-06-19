const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('installerAPI', {
  runInstallScript: (language, os) => ipcRenderer.invoke('run-install-script', { language, os })
}); 