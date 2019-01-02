import React from 'react'
import { Provider } from 'mobx-react'
import { createBrowserHistory } from 'history'
import Router from '../../router/router'
import { createStores } from '../../stores/createStore'
import UserModel from '../../models/UserModel'

const history = createBrowserHistory()
const stores = createStores(history)

const App = () => (
  <Provider {...stores}>
    <div>
      <Router history={history} />
    </div>
  </Provider>
)

export default App
