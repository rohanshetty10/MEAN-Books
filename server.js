var express = require('express'),
app     = express(),
port    = 27017;

var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module
var mongo = require('mongoskin'); // Require mongoskin module
var db = mongo.db("mongodb://localhost:27017/books", {native_parser:true}); // Connection MongoDB book collection DB
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data
app.use(function(req,res,next){
	req.db = db;
    res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

http.listen(27017,function(){
	console.log("Connected & Listen to port 27017");
});

app.get('/book',function(req,res){
	var data = {
		"Data":""
	};
	var db = req.db;
	db.collection('books').find().toArray(function (err, items) {
		if(items.length != 0){
			data["error"] = 0;
			data["Books"] = items;
			res.json(items);
		}else{
			data["error"] = 1;
			data["Books"] = 'No books Found..';
			res.json(data);
		}
	});
});

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

app.put('/book',function(req,res){
	var Id = req.body.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Bookname && !!Authorname && !!Price){
		db.collection('books').update({_id:mongo.helper.toObjectID(Id)}, {$set:{bookname:Bookname,authorname:Authorname,price:Price}}, function(err) {
			if(!!err){
				data["Books"] = "Error Updating data";
				console.log("second");
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