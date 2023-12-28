import Container from "./Components/Container.mjs";
import ModuleSelect from "./Components/ModuleSelect.mjs";
import MiceSelect from "./Components/Mice-Select.mjs";
import LanguageSelect from "./Components/Language-Select.mjs";
import TextArea from "./Components/TextArea.mjs";
import VoiceSelect from "./Components/Voice-select.mjs";
const { createApp } = Vue;

const app = createApp();

app.component("voice-select", VoiceSelect);
app.component("text-area", TextArea);
app.component("language-select", LanguageSelect);
app.component("mice-select", MiceSelect);
app.component("module-select", ModuleSelect);
app.component("my-container", Container);
app.mount("#app");
