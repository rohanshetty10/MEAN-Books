var express = require('express'),
app     = express(),
port    = 8080;

var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module
var mongojs = require('mongojs') // Require mongoskin module
var db = mongojs('mongodb://rohanvs10:rohandb@ds119988.mlab.com:19988/mean_books')
var mycollection = db.collection('books') // Connection MongoDB book collection DB
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});

//Get All books
app.get('/book',function(req,res){
	db.books.find(function(err,books){
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
	if(!!Bookname && !!Authorname && !!Price){
		db.collection('books').insert({bookname:Bookname , authorname: Authorname, price:Price}, function(err, result) {
			if(err){
				data["Books"] = "Error Adding data";
				res.send(err);
			}else{
				data["error"] = 0;
				data["Books"] = "Book Added Successfully";
				res.send(result);
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
		db.collection('books').update({_id:ObjectId(Id)}, {$set:{bookname:Bookname,authorname:Authorname,price:Price}}, function(err) {
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
		db.collection('books').remove({bookname:BookName}, function(err, result) {
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
