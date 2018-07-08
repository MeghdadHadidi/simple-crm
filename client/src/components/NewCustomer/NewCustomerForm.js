import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { addCustomer, editCustomer } from '../../actions/customers';
import { showFlashMessage } from '../../actions/flashMessages';

class NewCustomerForm extends Component {
    state = {
        customerID: '',
        firstname: '',
        lastname: '',
        gender: '',
        birthday: ''
    }

    addNewCustomer = () => {
        this.props.addCustomer(this.state)
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
        this.props.editCustomer(this.state)
            .then(({ data }) => {
                if(data.ok){
                    this.props.history.push('/customers');
                    debugger;
                }
                else{
                    console.error(data);
                }
            });
    }

    handleSubmit = () => {
        if(this.state.customerID){
            this.editCustomer();
        }
        else{
            this.addNewCustomer();
        }
    }

    handleChange = (e, component) => {
        this.setState({
            [component.name]: component.value
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group unstackable widths={2}>
                    <Form.Input onChange={this.handleChange} required name='firstname' label='First name' placeholder='First name' />
                    <Form.Input onChange={this.handleChange} required name='lastname' label='Last name' placeholder='Last name' />
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input onChange={this.handleChange} required name='birthday' label='Birthdate' placeholder='Birthdate' />
                    <Form.Input onChange={this.handleChange} required name='gender' label='Gender' placeholder='Gender' />
                </Form.Group>
                <Button type='submit'>{this.state.customerID ? 'Edit' : 'Add'}</Button>
            </Form>
        );
    }
}

NewCustomerForm.propTypes = {
    addCustomer: PropTypes.func.isRequired,
    editCustomer: PropTypes.func.isRequired,
    showFlashMessage: PropTypes.func.isRequired,
}

export default withRouter(connect(null, { addCustomer, editCustomer, showFlashMessage })(NewCustomerForm));