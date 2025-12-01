const e = require('express');
const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true   
    },
    publishedYear:{
        type:Number,
        required:true   
    },
    price:{
        type:Number,
        required:true   
    },
    quantity:{
        type:Number,
        required:true   
    },
    status:{
        type:String,
        required:true,  
        enum:['available','unavailable'],
        default:'available' 
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Book=new mongoose.model('Book',bookSchema);
module.exports=Book;