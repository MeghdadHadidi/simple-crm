import axios from 'axios';

export function getCustomersList(){
    return dispatch => {
        return axios.get('/customers/all');
    }
}

export function getCustomer(identifier){
    return dispatch => {
        return axios.get(`/customers/${identifier}`);
    }
}

export function addCustomer(customerData){
    return dispatch => {
        return axios.post('/customers/new', customerData);
    }
}

export function deleteCustomer(identifier){
    return dispatch => {
        return axios.delete(`/customers/${identifier}`);
    }
}