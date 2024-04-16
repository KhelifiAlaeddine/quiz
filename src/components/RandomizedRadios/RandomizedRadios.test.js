import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import RandomizedRadios from './RandomizedRadios.vue'; 

beforeEach(() => {
    input = wrapper.find('input')
    jest.spyOn(wrapper.vm, 'input')
    jest.runAllTimers()
})

test('verifyResponse function adds correct classes based on option', async () => {
    // Define your options array
    let input
    
    const options = [
      { id: 1, name: 'Option 1', correct: true },
      { id: 2, name: 'Option 2', correct: false },
      // Add more options as needed for your test cases
    ];
  
    // Mount the component
    const wrapper = mount(RandomizedRadios, {
      props: {
        options: options,
      },
    });
  
    // Simulate user interaction and trigger the verifyResponse function
    await input.trigger('change');
  
    // Assert that the correct classes are added based on the option's correctness
    expect(wrapper.find('#response-1').classes()).toContain('answer-good');
    expect(wrapper.find('#response-2').classes()).toContain('answer-bad');
})
