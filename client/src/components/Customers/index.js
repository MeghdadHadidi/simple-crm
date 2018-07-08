import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Header, Ico, deleteCustomern, Menu, Grid, Loader, Dimmer
} from 'semantic-ui-react';

// Actions
import { getCustomersList, deleteCustomer } from '../../actions/customers';

// Components
import CustomerItem from '../CustomerItem';

class Customers extends Component {
    state = {
        loading: true,
        customers: null
    }

    componentWillMount(){
        this.props.getCustomersList()
            .then((res) => {
                this.setState({
                    loading: false,
                    customers: res.data.customerList
                })
            });
    }

    deleteCustomer = (customerID) => {
        this.props.deleteCustomer(customerID)
            .then(({ data }) => {
                if(data.ok){
                    
                }
            })
    }

    render() {
        const { customers, loading } = this.state;

        return (
            <React.Fragment>
                <Menu>
                    <Menu.Item icon as={Link} to='/customers/new' name='new'>
                        <Icon style={{marginRight: 10}} name='add' />
                          Add customer
                    </Menu.Item>
                    <Menu.Item icon as={Link} to='/customers' name='all'>
                        <Icon style={{marginRight: 10}} name='users' />
                          List customers
                    </Menu.Item>
                </Menu>
                <Grid padded columns={4}>
                    {loading && 
                        <Dimmer active inverted>
                            <Loader inverted>Loading Customers ...</Loader>
                        </Dimmer>
                    }
                    {(customers && !customers.length) && 
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='users' />
                            Customers
                            <Header.Subheader>No customers found! Try adding first customer</Header.Subheader>
                        </Header>
                    }

                    {
                        customers && this.state.customers.map((item, index) => (
                            <Grid.Column key={index}><CustomerItem onDelete={this.deleteCustomer} customer={item} /></Grid.Column>
                        ))
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

Customers.propTypes = {
    getCustomersList: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired
}

export default connect(null, { getCustomersList, deleteCustomer })(Customers);