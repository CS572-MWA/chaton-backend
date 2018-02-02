const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: false }));
app.set('x-powered-by', false);

app.listen(3000, function(){
    console.log('listening on *: 3000');
});