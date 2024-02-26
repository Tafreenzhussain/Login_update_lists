const mongoose=require('mongoose');

const userschema= mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String
    }
})

const User=mongoose.model('User', userschema);

module.exports=User;


