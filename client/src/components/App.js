import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import components
import MainLayout from './MainLayout';
import Greetings from './Greetings';
import Customers from './Customers';

class componentName extends Component {
    render() {
        return (
            <Switch>
                <MainLayout>
                    <Route exact path="/" component={ Greetings }></Route>
                    <Route path="/customers" component={ Customers }></Route>
                </MainLayout>
            </Switch>
        )
    }
}
export default componentName;