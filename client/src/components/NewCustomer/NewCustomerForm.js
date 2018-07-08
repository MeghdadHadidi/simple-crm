import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { addCustomer, getCustomer, editCustomer } from '../../actions/customers';
import { showFlashMessage } from '../../actions/flashMessages';

class NewCustomerForm extends Component {
    state = {
        customer: {
            customerID: '',
            firstname: '',
            lastname: '',
            gender: '',
            description: '',
            birthday: ''
        }
    }

    componentWillMount(){
        const { match } = this.props;

        if(match.params.id){
            this.props.getCustomer(match.params.id)
                .then(({ data }) => {
                    if(data.ok){
                        let customer = data.customer;
                        customer.firstname = customer.name.first;
                        customer.lastname = customer.name.last;
                        delete customer.name;
                        this.setState({
                            customer
                        });
                    }
                });
        }
    }

    addNewCustomer = () => {
        this.props.addCustomer(this.state.customer)
            .then(({ data }) => {
                if(data.ok){
                    this.props.showFlashMessage({
                        type: 'success',
                        title: 'Successful',
                        text: 'Customer added successfuly'
                    });

                    this.props.history.push('/customers');
                }
                else{
                    this.props.showFlashMessage({
                        type: 'error',
                        title: 'Error',
                        text: 'Problem occured when adding customer'
                    });
                }
            })
    }

    editCustomer = () => {
        this.props.editCustomer(this.state.customer)
            .then(({ data }) => {
                if(data.ok){
                    this.props.showFlashMessage({
                        type: 'info',
                        title: 'Edit',
                        text: 'Customer edited successfuly'
                    });
                    this.props.history.push('/customers');
                }
            });
    }

    handleSubmit = () => {
        if(this.state.customer.customerID){
            this.editCustomer();
        }
        else{
            this.addNewCustomer();
        }
    }

    handleChange = (e, component) => {
        this.setState({
            customer: {
                ...this.state.customer,
                [component.name]: component.value
            }
        })
    }

    render() {
        let { customer } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group unstackable widths={2}>
                    <Form.Input onChange={this.handleChange} required value={customer.firstname} name='firstname' label='First name' placeholder='First name' />
                    <Form.Input onChange={this.handleChange} required value={customer.lastname} name='lastname' label='Last name' placeholder='Last name' />
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input onChange={this.handleChange} required value={customer.birthday} name='birthday' label='Birthdate' placeholder='Birthdate' />
                    <Form.Input onChange={this.handleChange} required value={customer.gender} name='gender' label='Gender' placeholder='Gender' />
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.TextArea onChange={this.handleChange} required name='description' value={customer.description} placeholder='Enter customer description'></Form.TextArea>
                </Form.Group>
                <Button type='submit'>{this.state.customer.customerID ? 'Edit' : 'Add'}</Button>
            </Form>
        );
    }
}

NewCustomerForm.propTypes = {
    addCustomer: PropTypes.func.isRequired,
    editCustomer: PropTypes.func.isRequired,
    customer: PropTypes.object,
    match: PropTypes.object.isRequired,
    showFlashMessage: PropTypes.func.isRequired,
    getCustomer: PropTypes.func.isRequired
}

export default withRouter(connect(null, { addCustomer, getCustomer, editCustomer, showFlashMessage })(NewCustomerForm));