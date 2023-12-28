const portAudio = require("naudiodon");
const fs = require("fs");

let ai;

/**
 * gets input devices
 * @returns {Array}
 */
function SpeekerDevices() {
  const devices = portAudio.getDevices();
  const inputDevices = devices.map((item) => {
    if (item.maxInputChannels < 0) {
      return item;
    }
  });
  return inputDevices;
}

/**
 * start mic with selected device name
 * @param {string|null} deviceName | microphone device name
 */
function startSpeeker(deviceName) {
  try {
    let selectedDevice;
    if (deviceName) {
      const devices = portAudio.getDevices();
      selectedDevice = devices.find((item) => item.name == deviceName);
    } else {
      selectedDevice = {
        maxInputChannels: 2,
        id: -1,
      };
    }

    ai = new portAudio.AudioIO({
      inOptions: {
        channelCount: selectedDevice.maxInputChannels,
        sampleFormat: portAudio.SampleFormat16Bit,
        sampleRate: 44100,
        deviceId: selectedDevice.id,
        closeOnError: true,
      },
    });
    ai.start();
  } catch (error) {
    console.log("send this error to front-end: ", error);
    ai.on("closed", () => console.log("send this error to front-end: ", error));
    throw error;
  }
}

/**
 * pipe the audio in started input device
 */
function speeker() {
  try {
    if (ai === null) {
      startSpeeker(null);
    }
    const baseDir = __dirname + "/voiceScripts/";
    const files = fs.readdirSync(baseDir, { withFileTypes: true });

    files.forEach((file) => {
      if (file.endsWith(".mp3") || file.endsWith(".wav")) {
        const filePath = path.join(baseDir, file);
        const voice = fs.createReadStream(filePath);
        ai.pipe(voice);
      }
    });
  } catch (error) {
    console.log("send this error to front-end: ", error);
  }
}

module.exports = { SpeekerDevices, startSpeeker, speeker, ai };
