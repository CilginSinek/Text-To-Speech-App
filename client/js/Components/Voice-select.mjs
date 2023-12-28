const { ref, watchEffect } = Vue;
const VoiceSelect = {
  props: ["selectedVoice", "changeVoice"],
  setup() {
    const loading = ref(false);
    const voices = ref(null);

    watchEffect(async () => {
      loading.value = true;
      voices.value = await window.voicer.getVoices();
      loading.value = false;
    });

    return {
      loading,
      voices,
      selectedVoice: props.selectedVoice,
      changeVoice: props.changeVoice,
    };
  },
  template: `
    <div>
      <p v-if="loading" >Loading...</p>
      <select v-if="!loading" :disabled="loading" :value="selectedVoice">
        <template v-for="voice in voices" >
            <option
              :id="voice"
              :value="voice"
              @click="changeVoice">{{voice}}</option>
        </template>
      </select>
    </div>
    `,
};

export default VoiceSelect;
