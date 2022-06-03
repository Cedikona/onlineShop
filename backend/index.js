const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require('./config/dbConfig');
const mongoose = require('mongoose');
const Users = require('./models/userModel');

const app = express();
mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log('MONGO DB IS CONNECTED'))
    .catch(err => console.log(`Error while connecting to mongo db: ${err}`)
    );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/login', function(req, res){
    console.log(req.body);
    const reqBody = req.body;

    const foundUser = Users.findOne(reqBody, (err, data) => {
        console.log(data);
        if (err) {
          const errorMsg = `Error on getting user from DB: ${err}`;
          console.log(errorMsg);
          res.send(errorMsg);
          return;
        }
        else {
    
        // way 1
        // if (data)
        //     res.send(data);
        // else
        //     res.send('User not found.');
    
        // way 2
        // res.send(data ? data : 'User not found.');
    
        // way 3
        res.send(data || "User not found.");
        }
      });
});

app.listen(4000, err => {
    if(err){
    console.log(err);
    }else{
    console.log(`Server is running on port: 4000`);
    }
});