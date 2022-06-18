const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);

let nodate = new Date;

const recordSchema = new mongoose.Schema({
    _amount_paid:{type:String,required:true},
   _paid_on:{type:String}
});

const paySchema = new mongoose.Schema({
    _user:{type:mongoose.Schema.ObjectId,required:true,ref:"User"},
    _subscription:{type:String,default:"1 day"},
    _remaining_days:{type:String},
    _expired:{type:String,default:"no"},
    payment_records:[recordSchema]

});


const Payments = mongoose.model('Payments',paySchema);

module.exports = Payments;