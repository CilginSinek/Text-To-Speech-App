const text2wav = require("text2wav");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**
 * create voice with npm module ( voice is not clear )
 * @param {string} text the text you want to be spoken
 * @param {string} language Language code of the text you want to be spoken
 * @param {string | null | undefined} whisper voice the text you want
 */
async function voiceWithOutGoogle(text, language, whisper) {
  try {
    deleteOldFiles();
    let defauldLanguage;
    if (language) {
      defauldLanguage = language;
    } else {
      defauldLanguage = "tr";
    }
    const voiceBuffer = await text2wav(text, {
      voice: whisper ? defauldLanguage + "+" + whisper : defauldLanguage,
    });
    fs.writeFileSync("output.wav", voiceBuffer);
  } catch (error) {
    console.log(error, "send front-end this information");
  }
}

/**
 * download google translate voice audio file
 * @param {string} text the text you want to be spoken
 * @param {string} language Language code of the text you want to be spoken
 */
async function voiceWithGoogle(text, language) {
  try {
    deleteOldFiles();
    let defauldLanguage;
    if (language) {
      defauldLanguage = language;
    } else {
      defauldLanguage = "tr";
    }
    const encodeText = encodeURI(text);
    const url =
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${defauldLanguage}&q=` +
      encodeText;
    const results = await downloadFile(url, "output.mp3");
    if (!results) {
      throw "An error occurred while downloading Google voice, please contact your software developer.";
    }
  } catch (error) {
    console.log(error, "send front-end this information");
  }
}

//* utils

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);

  return await axios({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on("close", () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  });
}

function deleteOldFiles() {
  try {
    const baseDir = __dirname + "/voiceScripts/";
    const files = fs.readdirSync(baseDir, { withFileTypes: true });

    files.forEach((file) => {
      if (file.endsWith(".mp3") || file.endsWith(".wav")) {
        const filePath = path.join(baseDir, file);
        fs.unlink(filePath);
      }
    });
  } catch (error) {
    console.log(error, "send this info");
    throw "An error in deleting old files: " + JSON.stringify(error);
  }
}

module.exports = {voiceWithGoogle,voiceWithOutGoogle}
