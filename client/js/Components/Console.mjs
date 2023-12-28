const { ref, watch } = Vue;

const Console = {
  setup() {
    const consoleArray = ref([]);
    watch(
      () => window.myconsole,
      (newConsole, oldConsole) => {
        if (newConsole !== oldConsole) {
          const newData = { date: new Date(), data: newConsole };
          consoleArray.value.push(newData);
        }
      },
      { deep: true }
    );

    return { consoleArray };
  },
  template: `
  <div class="console">
    <div class="innerConsole">
        <template v-for="data in consoleArray">
            <div 
              :id="data.date" 
              class="consoleItem"><p>[{{data.date}}]: {{data.data}}</p>
            </div>
        </template>
    </div>
  </div>
  `,
};

export default Console;
