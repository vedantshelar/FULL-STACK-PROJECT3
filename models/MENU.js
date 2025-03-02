const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
    menuName: {
        type: String, required: true, trim: true,
        lowercase: true
    },
    fullFrontPrice: {
        type: Number,
        required: true,
        default: 0
    },
    fullBackPrice: {
        type: Number,
        required: true,
        default: 0
    },
    halfFrontPrice: {
        type: Number,
        required: true,
        default: 0
    },
    halfBackPrice: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        enum: ["rice", "noodle", "drink", "pizza", "burger", "sandwich"]
    },
    type: {
        type: String,
        enum: ["veg", "nonVeg"]
    },
    isBestSelling: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true,
        trim: true,
        default: 'no descrition has been provided',
    },
    ingredient: {
        type: String,
        required: true,
        trim: true,
        default: 'no ingredient has been provided',
    },
    menuImg:{
        type:String,
        required:true
    }
});

const MENU = mongoose.model('MENU',menuSchema);

module.exports=MENU;