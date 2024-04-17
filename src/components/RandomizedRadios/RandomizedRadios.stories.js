import RandomizedRadios from "./RandomizedRadios.vue";

export default {
  component: RandomizedRadios,
  tags: ['autodocs']
};

export const RadiosButtons = {
  render: (args) => ({
    components: { RandomizedRadios },
    setup() {
      return { args };
    },
    template: '<RandomizedRadios v-bind="args" />',
  }),
  args: {
    options : [
      { id: 1, name: 'Option 1', correct: false },
      { id: 2, name: 'Option 2', correct: false },
      { id: 3, name: 'Option 3', correct: true },
    ]
  },
};