const mongoose= require('mongoose');
const bookschema= mongoose.Schema({
    bookname:{type:String},
    author:{type:String},
    price:{type:Number}
})

const Book=mongoose.model('Book',bookschema);
module.exports= Book;

