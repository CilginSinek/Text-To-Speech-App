const { ref } = Vue;

const ModuleSelect = {
  props: ["isModule", "changeModule"],
  setup(props) {
    return { isModule: props.isModule, changeModule: props.changeModule };
  },
  template: `
    <div class="module-select" >
        <div>
            <input 
              type="radio" 
              id="module" 
              value="true" 
              :checked="isModule" 
              @click="changeModule">
            <label for="module">Module</label>
        </div>
        <div>
            <input 
              type="radio" 
              id="google" 
              value="false" 
              :checked="!isModule" 
              @click="changeModule">
            <label for="google">Google</label>
        </div>
    </div>`,
};

export default ModuleSelect;
