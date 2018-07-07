import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'react-redux';

// Resources
import 'semantic-ui-css/sematic.min.css'

// Components
import Root from './Root';


import registerServiceWorker from './registerServiceWorker';

render(<Root />, document.getElementById('root'));
registerServiceWorker();
