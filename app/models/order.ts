import mongoose, {models} from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema({
info:{
    type: Object,
    blackbox: true,
    request: true
},
    time:{
    type: String,
        request: true
    }
}, {timestamps: true})

export const  DBorder = mongoose.model('Order', orderSchema)
