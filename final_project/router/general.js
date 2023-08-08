const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if(username && password) {
      if(!isValid(username)) {
          return res.status(200).json({message: "Username already taken"});
      }
      else {
          const newUser = { username:username,password:password}
          users.push(newUser)
          return res.status(200).json({message: `Succesfully Registered.Welcome ${newUser.username}`});
      }
    }
    else {
      return res.status(200).json({message: "Please Provide username and password"});
    }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let result;
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      result = JSON.stringify(books)
      resolve("Promise resolved")
    },6000)})

   myPromise.then(()=>{
    return res.send(result)
   })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let book;
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      book = books[req.params.isbn];
      resolve("Promise resolved")
    },6000)})

   myPromise.then(()=>{
    
    if(book){
        return res.send(JSON.stringify(book))
    }
    else {
        return res.status(200).json({message: "Book not found"});
    }
   })
  
 

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const booksArr = Object.values(books)
  const book = booksArr.filter(book=>book.author === author);
  if(book){
    return res.send(JSON.stringify(book))
  }
  else {
    return res.status(200).json({message: "Book not found"});
  }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksArr = Object.values(books)
    const book = booksArr.filter(book=>book.title === title);
    if(book){
      return res.send(JSON.stringify(book))
    }
    else {
      return res.status(200).json({message: "Book not found"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const book = books[req.params.isbn];
    if(book){
      return res.send(JSON.stringify(book.reviews))
    }
    else {
      return res.status(200).json({message: "Book not found"});
    }
  
});

module.exports.general = public_users;
