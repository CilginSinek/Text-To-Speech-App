const languageJson = require("../jsons/languages.json");
const voicesJson = require("../jsons/voices.json");

/**
 * Retrieves the list of languages.
 * @typedef {Object} Language
 * @property {string} language The name of the language.
 * @property {string} code The language code.
 * @return {Array<Language>} The list of languages.
 */
exports.getLanguages = () => {
  return languageJson.languages;
};

/**
 * Retrieves the list of available voices.
 * @typedef {string} VoiceCode
 * @return {Array<Voice>} The list of available voices.
 */
exports.getVoices = () => {
  return voicesJson.voices;
};
