import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import components
import MainLayout from './MainLayout';
import Greetings from './Greetings';
import Customers from './Customers';
import NewCustomer from './NewCustomer';

class componentName extends Component {
    render() {
        return (
            <Switch>
                <MainLayout>
                    <Route exact path="/" component={ Greetings }></Route>
                    <Route exact path="/customers" component={ Customers }></Route>
                    <Route path="/customers/new" component={ NewCustomer }></Route>
                </MainLayout>
            </Switch>
        )
    }
}
export default componentName;