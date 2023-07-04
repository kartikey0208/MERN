const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

function middlewar1(req, res, next){ //defined a middleware
    next(); // next is responsible for sending controller to handlers
}
app.use(bodyParser.json());

function calculateSum(counter){
    var sum = 0;
    for(var i = 0; i<counter; i++){
        sum = sum +i;
    }
    return sum;
}

function handleFirstRequest(req, res){
    var counter = req.query.counter;
    var calculatedSum = calculateSum(counter);
        var answerObject = {
            sum: calculatedSum,
        }
        res.send(answerObject);
}

app.get('/handleSum', handleFirstRequest);

function started(){
    console.log(`Example app listening on port ${port}`)
}

app.listen(port, started);

