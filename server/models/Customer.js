import mongoose from 'mongoose';
import CustomerSchema from '../schemas/customerSchema';

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;