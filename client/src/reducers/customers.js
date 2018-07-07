import { SET_CUSTOMER_LIST } from '../types';

export default (state = [], action = {}) => {
    switch(action.type){
        case SET_CUSTOMER_LIST:
            return [
                ...state,
                action.payload.customers
            ]
        default:
            return state;
    }
}