const { ref } = Vue;
const Container = {
  setup() {
    const count = ref(0);
    console.log("anan");

    return { count };
  },
  template: `<div>count is {{ count }}</div>`
};

export default Container;
