const express= require('express');
const app=express();
const mongoose= require('mongoose');
const cors= require('cors');
const User=require('./user');
const Book = require('./boks');


let url='mongodb://localhost:27017/login'
mongoose.connect(url)
  .then(()=>{console.log("connected")})
  .catch((err)=>{console.log(err)})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hiiiiii Fayaz")
})

app.post('/login',async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;

    let user=await User.findOne({username:username});
    if(user){
        if(password== user.password)
        {
            res.json(user);

        }
        else{
            res.status(400).json({
                msg:'wrong password',
            });

        }
    }else{
        res.status(404).json({
            msg:'User not found',
        });

    }
   
})

app.get('/books',async(req, res)=>{
    let books= await Book.find({});

    res.send(books);
})

app.get('/get/book', async(req, res)=>{
    try{
        const {id}= req.query //same as const id= req.query.id
        let book = await Book.findById(id);

        if(book)
        {
            res.status(200).json(book);
        }
        else{
            res.status(404).json({msg:'404, Not Found'})
        }
    }
    catch(err){
        res.status(404).json({msg:'404, Not Found'})
    }

})

app.put('/update/:id',async(req,res)=>{
    const {id} = req.params
    const {bookname , author, price} = req.body;
    let book = await Book.findByIdAndUpdate(id,{
        bookname:bookname,
        author:author,
        price:price,
    })

    await book.save();
    res.send(book);


})

const port=8080;

app.listen(port,()=>{
    console.log(`App is listening at port ${port}`);
});