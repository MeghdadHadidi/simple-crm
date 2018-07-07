import { Schema } from 'mongoose';

const CustomerSchema = new Schema({
    name: {},
    birthday: String,
    gender: String,
    lastContact: String,
    customerLifetimeValue: Number
});

export default CustomerSchema;