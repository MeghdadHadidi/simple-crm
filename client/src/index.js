import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

// Resources
import 'semantic-ui-css/semantic.min.css'
import 'izitoast/dist/css/iziToast.min.css'

// Components
import Root from './Root';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
)

render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
