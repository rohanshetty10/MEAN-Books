var express = require('express'),
app     = express(),
port    = 8080;

const path = require('path');
const cors = require('cors');
const passport = require('passport');

const users = require('./routes/users');

var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module
const mongoose = require('mongoose') // Require mongoskin module
const config = require('./config/database');

// Connect to Database 
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
	console.log("Connected to database "+config.database);
})

// On Error
mongoose.connection.on('error', (err) => {
	console.log("Database error: "+err);
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

// Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parse Middleware
app.use(bodyParser.json());

app.use('/users',users);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
})

// Start Server
http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});


// Book Schema 
const BookSchema = mongoose.Schema({
	bookname: {
		type: String,
		required: true
	},
	authorname: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
})

const Book = module.exports = mongoose.model('Book', BookSchema);

//Get All books
app.get('/book',function(req,res){
	Book.find(function(err,books){
		if(err){
			res.send(err);
		}
		res.json(books);
	})
});

//Add book
app.post('/book',function(req,res){
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	let newBook = new Book({
		bookname: req.body.booknamename,
		authorname: req.body.authorname,
		price: req.body.price
	});

	if(!!Bookname && !!Authorname && !!Price){
		Book.addBook(newBook, (err, user) => {
			if(err){
				data["Books"] = "Error Adding data";
				res.send(err);
			}else{
				data["error"] = 0;
				data["Books"] = "Book Added Successfully";
				res.send(createdBookObject);
			}
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
		res.json(data);
	}
});

//Update book
app.put('/book',function(req,res){
	var Id = req.body.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	var ObjectId = require('mongojs').ObjectID;
	if(!!Bookname && !!Authorname && !!Price){
		Book.update({_id:ObjectId(Id)}, {$set:{bookname:Bookname,authorname:Authorname,price:Price}}, function(err) {
			if(!!err){
				data["Books"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["Books"] = "Updated Book Successfully";
			}
			return res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
		return res.json(data);
	}
});

//Delete book
app.delete('/book/:bookname',function(req,res){
	var BookName = req.params.bookname;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!BookName){
		Book.remove({bookname:BookName}, function(err, result) {
			if(!!err){
				data["Books"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["Books"] = "Delete Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : bookname )";
		res.json(data);
	}
});
