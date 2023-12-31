const express = require('express');
const bodyParser = require('body-parser');
//const cors = require("cors");
const path = require("path");
const app = express();
//app.use(express.json());
app.use(bodyParser.json());
//app.use(cors());

let todos = [];

var ctr = 1;
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    res.json(todos[todoIndex]);
  }
});

app.post('/todos', (req, res) => {
  console.log(req.body);
  const newTodo = {
    id: ctr, // unique random id
    title: "",
    message: "moj lo bhai",
    description: ""
  };

  if (req.body && req.body.title) {
    newTodo.title = req.body.title;
  }
  
  if (req.body && req.body.description) {
    newTodo.description = req.body.description;
  }
  console.log(newTodo);
  ctr++;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]);
  }
});

app.delete('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send();
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.use((req, res, next)=> {
  res.status(404).send();
})

app.listen(3000);
