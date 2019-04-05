import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'

registerRequireContextHook()

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })
// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.mount = mount

window.URL = {
  createObjectURL: () => 'stub'
}

jest.mock('react-modal', () => ({ children }) => (
  <div className="modal">{children}</div>
))
