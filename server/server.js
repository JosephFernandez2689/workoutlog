var express = require('express');
var app = express();


var router = express.Router();
var multer = require('multer');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());


var storage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, './uploads/');
        },
        filename: function (request, file, callback) {

            callback(null, file.originalname);
        }
    });

var upload = multer({
                storage: storage
            }).single('file');


app.post('/upload', function(request, response) {
    upload(request,response,function(err){
        if(err){
             response.json({error_code:1,err_desc:err});
             return;
        }
         response.json({error_code:0,err_desc:null});
    });
});

app.use('/uploads',express.static(__dirname + '/uploads'));

app.get('/todolist', function (request, response) {
  db.todolist.find(function (error, doc) {
    response.json(doc);
  });
});

app.post('/todolist', function (request, response) {
  db.todolist.insert(request.body, function(error, doc) {
    response.json(doc);
  });
});

app.put('/todolist/:id', function (request, response) {
  db.todolist.findAndModify({
    query: {_id: mongojs.ObjectId(request.params.id)},
    update: {$set: {item: request.body.item,
      dueDate: request.body.dueDate,
      notes: request.body.notes,
      image: request.body.image
    }},
    new: true}, function (error, doc) {
      response.json(doc);
    }
  );
});

app.get('/todolist/:id', function (request, response) {
  db.todolist.findOne({_id: mongojs.ObjectId(request.params.id)}, function (error, doc) {
    response.json(doc);
  });
});

app.delete('/todolist/:id', function (request, response) {
  db.todolist.remove({_id: mongojs.ObjectId(request.params.id)}, function (error, doc) {
    response.json(doc);
  });
});


app.listen(3000);
console.log("Server is working out on port 3000");
