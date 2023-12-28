const { ref } = Vue;

const TextArea = {
  props: ["miceStatus", "miceStatus", "isModule", "language", "whisper"],
  setup(props) {
    const text = ref("");
    const handleSubmit = async () => {
      if (!text.value || !props.miceStatus) return;
      await window.voicer.runVoice({
        text: text.value,
        language: props.language.value,
        whisper: props.whisper.value,
        isModule: props.isModule.value,
      });
    };

    return { text, handleSubmit, miceStatus: props.miceStatus };
  },

  template: `
    <div class="text-area" >
      <textarea v-model="text"></textarea>
      <button 
        class="mice-button" 
        @onclick="handleSubmit" 
        :disabled="miceStatus">
      </button>
    </div>
    `,
};

export default TextArea;
