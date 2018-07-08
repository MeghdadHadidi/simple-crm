import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCustomersList } from '../../actions/customers';
import {
    Header, Icon, Menu, Grid
} from 'semantic-ui-react';

// Components
import CustomerItem from '../CustomerItem';

class Customers extends Component {
    state = {
        customers: []
    }

    componentWillMount(){
        this.props.getCustomersList()
            .then((res) => {
                this.setState({
                    customers: this.state.customers.concat(res.data.customers)
                })
            });
    }

    render() {
        const { customers } = this.state;

        return (
            <React.Fragment>
                <Menu>
                    <Menu.Item icon as={Link} to='/customers/new' name='new'>
                        <Icon name='add' />
                        Add customer
                    </Menu.Item>
                    <Menu.Item icon as={Link} to='/customers' name='all'>
                        <Icon name='users' />
                        List customers
                    </Menu.Item>
                </Menu>
                <Grid padded columns={4}>
                    {!customers.length && 
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='users' />
                            Customers
                            <Header.Subheader>No customers found! Try adding first customer</Header.Subheader>
                        </Header>
                    }

                    {customers.length && 
                    this.state.customers.map((item, index) => (
                        <Grid.Column key={index}><CustomerItem customer={item} /></Grid.Column>
                    ))
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

Customers.propTypes = {
    getCustomersList: PropTypes.func.isRequired
}

export default connect(null, { getCustomersList })(Customers);