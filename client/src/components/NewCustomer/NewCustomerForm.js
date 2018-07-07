import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCustomer, editCustomer } from '../../actions/customers';

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
            .then((res) => {
                if(res.ok){
                    this.context.router.push('/customers');
                    debugger;
                }
            })
    }

    editCustomer = () => {
        this.props.editCustomer(this.state)
            .then((res) => {
                if(res.ok){
                    this.context.router.push('/customers');
                    debugger;
                }
                else{
                    console.error(res);
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

    handleChange = (e) => {
        this.setState(...this.state, {
            [e.target.name]: [e.target.value]
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
    editCustomer: PropTypes.func.isRequired
}

NewCustomerForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { addCustomer, editCustomer })(NewCustomerForm);