import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Customer from '../Customer';
import { getCustomersList } from '../../actions/customers';

import {
    Header, Icon
} from 'semantic-ui-react';

class Customers extends Component {
    state = {
        customers: []
    }

    componentDidMount(){
        this.props.getCustomersList().then((res) => {
            console.log(res);
        });
    }

    renderCustomerList = () => {
        if(!this.state.customers.length){
            return(
                <Header as='h2' icon textAlign='center'>
                    <Icon name='users' />
                    Customers
                    <Header.Subheader>No customers found! Try adding first customer</Header.Subheader>
                </Header>
            )
        }

        this.state.customers.forEach(item => {
            return(
                <Customer customer={item} />
            )
        });
    }

    render() {
        return (
            <div id="CustomersPage">
                {this.renderCustomerList()}
            </div>
        );
    }
}

Customers.propTypes = {
    getCustomersList: PropTypes.func.isRequired
}

export default connect(null, { getCustomersList })(Customers);