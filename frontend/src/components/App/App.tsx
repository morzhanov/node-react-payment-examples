import * as React from 'react';
import { createBrowserHistory } from 'history';
import Router from '../../router/router';

const history = createBrowserHistory();

const App = () => (
  <div>
    <Router history={history} />
  </div>
);

export default App;
