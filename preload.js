const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("voicer", {
  startMice: (name) => ipcRenderer.invoke("startMice", name),
  stopMice: () => ipcRenderer.invoke("stopMice"),

  getMics: () => ipcRenderer.invoke("getMics"),
  getLanguages: () => ipcRenderer.invoke("getLanguages"),
  getMiceStatus: () => ipcRenderer.invoke("getMiceStatus"),
  getVoices: () => ipcRenderer.invoke("getVoices"),

  runVoice: (options) => ipcRenderer.invoke("runVoice", options),
});

ipcRenderer.on("event", (data) => {
  window.myconsole = data;
});
