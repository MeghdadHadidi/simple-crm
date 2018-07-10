import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import faker from 'faker';
import {
    Dimmer, Icon, Loader, Message, Segment, Menu, Header, Image, Divider
} from 'semantic-ui-react';

// Actions
import { getCustomer, deleteCustomer } from '../../actions/customers';
import { showFlashMessage } from '../../actions/flashMessages';

const ServiceCallingMessage = ({ error }) => {
    if(error){
        return(
            <Message negative>
                <Message.Header>Error:</Message.Header>
                <p>{error}</p>
            </Message>
        )
    }
    else{
        return '';
    }
}

class CustomerDetailPage extends Component {
    state = {
        loading: true,
        error: '',
        customer: {
            customerID: '',
            name: '',
            gender: '',
            description: '',
            birthday: '',
            lastContact: '',
            customerLifetimeValue: 0,

        }
    }

    componentWillMount(){
        const { match } = this.props;
        let customerId = match.params.id;

        this.props.getCustomer(customerId)
            .then(({ data }) => {
                if(data.ok){
                    this.setState({
                        loading: false,
                        customer: data.customer
                    });
                }
                else{
                    this.setState({
                        loading: false,
                        error: 'Error selecting customer. Check customer ID.'
                    });
                }
            });
    }

    deleteCustomer = () => {
        this.props.deleteCustomer(this.state.customer.customerID)
            .then(({ data }) => {
                if(data.ok){
                    this.props.showFlashMessage({
                        type: 'info',
                        title: 'Delete Successful',
                        text: 'Customer deleted successfuly'
                    });
                    this.props.history.push('/customers');
                }
            })
    }

    render() {
        const { customer, loading, error } = this.state;
        return (
            <React.Fragment>
                <Menu>
                    <Menu.Item icon as={Link} to='/customers' name='list'>
                        <Icon style={{marginRight: 10}} name='arrow left' />
                          Return to customers list
                    </Menu.Item>
                    <Menu.Item icon as={Link} to={`/customers/edit/${customer.customerID}`} name='edit'>
                        <Icon style={{marginRight: 10}} name='edit' />
                          Edit
                    </Menu.Item>
                    <Menu.Item icon onClick={this.deleteCustomer} name='delete'>
                        <Icon style={{marginRight: 10}} name='delete' />
                          Delete
                    </Menu.Item>
                </Menu>
                <Segment>
                    {loading && <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>}
                    <ServiceCallingMessage error={error} />
                    <Header as='h2' icon textAlign='center'>
                        <Image src={faker.internet.avatar()} style={{width: 150}} circular />
                        <Divider horizontal>{customer.name.first} {customer.name.last}</Divider>
                    </Header>
                    <Header.Subheader>{customer.description}</Header.Subheader>
                    <div>{customer.gender}</div>
                    <div>{customer.birthday}</div>
                    <div>{customer.lastContact}</div>
                    <div>{customer.customerLifetimeValue}</div>
                </Segment>
            </React.Fragment>
        );
    }
}

CustomerDetailPage.propTypes = {
    getCustomer: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
    showFlashMessage: PropTypes.func.isRequired
}

export default withRouter(connect(null, { getCustomer, deleteCustomer, showFlashMessage })(CustomerDetailPage));