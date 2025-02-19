const mongoose = require('mongoose');
const {getCurrentDate,getCurrentTime} = require('../utils');
const { Schema } = mongoose;

const pendingOrdersSchema = new Schema({
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'MENU',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    isFullPlate: {
        type: Boolean,
        required: true
    },
    qnty: {
        type: Number,
        required: true
    },
    tableNo: {
        type: Number,
        required: true
    },
    cookingRequest: {
        type: String,
        default: 'No Cooking Request'
    },
    isStart:{
        type:Boolean,
        default:false,
        required:true
    },
    isComplete:{
        type:Boolean,
        default:false,
        required:true
    },
    isCancel:{
        type:Boolean,
        default:false,
        required:true
    },
    orderPlacedDate: { 
        type: String, 
        default:getCurrentDate,
        required: true 
    },
    orderPlacedTime: { 
        type: String, 
        default:getCurrentTime,
        required: true 
    }
});

const PENDING_ORDERS = mongoose.model('PENDING_ORDERS',pendingOrdersSchema);

module.exports = PENDING_ORDERS;