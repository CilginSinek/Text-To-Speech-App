const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const { MainController } = require("./controller/mainController");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "client/pages/index.html"));
  return win;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  MainController(ipcMain, mainWindow);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
