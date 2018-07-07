import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// components
import App from './components/App';

const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;