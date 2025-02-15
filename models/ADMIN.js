const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
email:{
    type:String,
    required:[true,'Email is required'],
    validate:{
        validator: function (value){
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: 'Email Id is Invalid!'
    }
},
mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: 'Mobile number must be a 10-digit number',
    },
  },
password:{
    type:String,
    required:[true, 'Password is required']
}
});

const ADMIN = mongoose.model('ADMIN',adminSchema);

module.exports = ADMIN;