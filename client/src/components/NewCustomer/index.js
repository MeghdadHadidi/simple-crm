import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// Components
import NewCustomerForm from './NewCustomerForm';

class NewCustomerPage extends Component {
    render() {
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
                <NewCustomerForm />
            </React.Fragment>
        );
    }
}

export default NewCustomerPage;