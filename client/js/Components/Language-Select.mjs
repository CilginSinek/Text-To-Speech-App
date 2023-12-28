const { ref, watchEffect } = Vue;

const LanguageSelect = {
  props: ["selectedLanguage", "changeLanguage"],
  setup() {
    const loading = ref(false);
    const languages = ref(null);

    watchEffect(async () => {
      loading.value = true;
      languages.value = await window.voicer.getLanguages();
      loading.value = false;
    });

    return {
      loading,
      languages,
      selectedLanguage: props.selectedLanguage,
      changeLanguage: props.changeLanguage,
    };
  },
  template: `
    <div>
        <p v-if="loading" >Loading...</p>
        <select v-if="!loading"  value="selectedLanguage">
            <template v-for="language in languages">
                <option 
                :value="language.code" 
                :id="language.code"
                @click="changeLanguage">{{language.language}}</option>
            </template>
        </select>
    </div>
    `,
};

export default LanguageSelect;
