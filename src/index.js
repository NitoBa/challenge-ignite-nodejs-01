const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  
  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  request.userId = user.id;
  next()
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  if (!name || !username) {
    return response.status(400).json({ error: 'Missing name or username' });
  }

  const userAlreadyExists = users.find(user => user.username === username);

  if (userAlreadyExists) {
    return response.status(400).json({ error: 'User already exists with this username' });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  }

  users.push(user);
  return response.status(201).json(user);
});


app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { userId } = request;

  const user = users.find(user => user.id === userId);

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { userId } = request;
  const { title, deadline } = request.body;

  if (!title || !deadline) {
    return response.status(400).json({ error: 'Missing title or deadline' });
  }

  const todo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline),
    done: false,
    created_at: new Date(),
  }

  const user = users.find(user => user.id === userId)

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { userId } = request;
  const { id } = request.params;

  const { title, deadline, done } = request.body;

  if (!title || !deadline || !done) {
    return response.status(400).json({ error: 'Missing title, deadline or done' });
  }

  const user = users.find(user => user.id === userId);

  const todo = user.todos.findIndex(todo => todo.id === id);

  if (todo < 0) {
    return response.status(404).json({ error: 'Todo not found' });
  }

  user.todos[todo] = {
    id,
    title,
    deadline: new Date(deadline),
  }



});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;