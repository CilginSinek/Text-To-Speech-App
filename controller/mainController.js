const {
  SpeekerDevices,
  startSpeeker,
  ai,
  speeker,
} = require("../voiceScripts/speeker");
const {
  voiceWithOutGoogle,
  voiceWithGoogle,
} = require("../voiceScripts/voicer");
const { getLanguages, getVoices } = require("./util");

exports.MainController = (ipcMain, mainWindow) => {
  ipcMain.handle("getMics", SpeekerDevices);
  ipcMain.handle("getMiceStatus", ai == null);
  ipcMain.handle("getLanguages", getLanguages);
  ipcMain.handle("getVoices", getVoices);
  ipcMain.handle("startMice", (name) => {
    try {
      startSpeeker(name);
      mainWindow.webContents.send("event", {
        status: "success",
        message: name + " Mic is on",
      });
      return { status: "success" };
    } catch (error) {
      mainWindow.webContents.send("event", { status: "error", message: error });
      return { status: "error", message: error };
    }
  });
  ipcMain.handle("stopMice", () => {
    try {
      ai.close();
      ai = null;
      mainWindow.webContents.send("event", {
        status: "success",
        message: " Mic is off",
      });
      return { status: "success" };
    } catch (error) {
      mainWindow.webContents.send("event", { status: "error", message: error });
      return { status: "error", message: error };
    }
  });
  ipcMain.handle("runVoice", async (options) => {
    try {
      if (options.isModule) {
        if (options.whisper == "none") {
          await voiceWithOutGoogle(options.text, options.language);
        } else {
          await voiceWithOutGoogle(
            options.text,
            options.language,
            options.whisper
          );
        }
      } else {
        await voiceWithGoogle(options.text, options.language);
      }
      speeker();
      mainWindow.webContents.send("event", {
        status: "success",
        message: "Text is spoken",
      });
      return { status: "success" };
    } catch (error) {
      mainWindow.webContents.send("event", { status: "error", message: error });
      return { status: "error", message: error };
    }
  });
};
