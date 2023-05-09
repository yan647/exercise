import { mount } from '@vue/test-utils';
import ExampleComponent from '../../ExampleComponent';

describe('ExampleComponent', function () {
  it('create', () => {
    const wrapper = mount(ExampleComponent);
    expect(wrapper.vm).to.exist;
  });
});
