const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);

let nodate = new Date;

const recordSchema = new mongoose.Schema({
    amount_paid:{type:String,required:true},
    subscription:{type:String,default:"1 day"},
    paid_on:{type:String}
});

const paySchema = new mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,required:true,ref:"User"},
    subscription:{type:String,default:"1 day"},
    remaining_days:{type:String},
    expired:{type:String,default:"no"},
    payment_records:[recordSchema]

});


const Payments = mongoose.model('Payments',paySchema);

module.exports = Payments;