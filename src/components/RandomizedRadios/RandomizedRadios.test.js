import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import RandomizedRadios from './RandomizedRadios.vue'; 

test('verifyResponse function adds correct classes based on option', async () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

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
      attachTo: div
    });

    
    await wrapper.findAll('input')[0].trigger('change');
    expect(wrapper.find('#response-1').classes()).toContain('answer-good');
    
  
    // Assert that the correct classes are added based on the option's correctness
    await wrapper.findAll('input')[1].trigger('change');
    expect(wrapper.find('#response-2').classes()).toContain('answer-bad');
})