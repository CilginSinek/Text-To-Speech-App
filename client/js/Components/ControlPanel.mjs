const { ref } = Vue;

const ControlPanel = {
  setup() {
    const isModule = ref(false);
    const language = ref("tr");
    const whisper = ref("none");
    const miceStatus = ref(false);

    const changeModule = (e) => {
      isModule.value = e.target.value;
    };

    const changeLanguage = (e) => {
      language.value = e.target.value;
    };

    const changeWhisper = (e) => {
      whisper.value = e.target.value;
    };

    const changeMiceStatus = (e) => {
      miceStatus.value = e;
    }

    return {
      isModule,
      language,
      whisper,
      changeModule,
      changeLanguage,
      changeWhisper,
      changeMiceStatus,
    };
  },
  template: `
    <div class="control-panel">
        <div class="left >
            <text-area 
              :isModule="isModule" 
              :language="language" 
              :whisper="whisper"
              :miceStatus="miceStatus"/>
            <mice-select 
              :miceStatus="miceStatus" 
              :changeMiceStatus="changeMiceStatus" />
        </div>
        <div class="right">
            <module-select 
              :isModule="isModule" 
              :changeModule="changeModule"/>
            <div class="voice-language-select" >
                <voice-select 
                  v-if="isModule"
                  :selectedVoice="whisper"
                  :changeVoice="changeWhisper" />
                <language-select 
                  :selectedLanguage="language" 
                  :changeLanguage="changeLanguage" />
            </div>
            <console/>
        </div>
    </div>
    `,
};

export default ControlPanel;
