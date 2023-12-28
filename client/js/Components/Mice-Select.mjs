const { ref, watchEffect, reactive } = Vue;
const MiceSelect = {
  props: ["miceStatus", "changeMiceStatus"],
  setup() {
    const loading = ref(false);
    const selects = ref(null);
    const selected = reactive(null);

    async function handleMicButton() {
      loading.value = true;
      if (props.miceStatus.value) {
        await window.bridge.stopMice();
      } else {
        await window.bridge.startMice(selected.value);
      }
      props.changeMiceStatus(await window.bridge.getMiceStatus());
      loading.value = false;
    }

    watchEffect(async () => {
      loading.value = true;
      selects.value = await window.voicer.getMices();
      selected.value = selects.value[0];
      props.changeMiceStatus(await window.voicer.getMiceStatus());
      loading.value = false;
    });

    return {
      selects,
      selected,
      handleMicButton,
      miceStatus: props.miceStatus,
      loading,
    };
  },
  template: `
  <div class="mice-select" >
    <div>
      <div :class="'circle ' + miceStatus ? 'active' : '' "></div>
    </div>
    <p v-if="loading" >Loading...</p>
    <select v-if="!loading" :value="selected" >
      <template v-for="select in selects">
        <option type="radio"
          :id="select.name"
          :value="select"
          name="select"
          v-model="selected">{{ select.name }}</option>
      </template>
    </select>
    <div>
      <button @disabled="loading" @onclick="handleMicButton">
        <img :src="miceStatus ? '../assets/stop.svg' : '../assets/start.svg'" />
      </button>
    </div>
  </div>
`,
};

export default MiceSelect;
