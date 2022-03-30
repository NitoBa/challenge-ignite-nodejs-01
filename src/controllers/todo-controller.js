const { users } = require('../data/users.js');
const { v4: uuidv4 } = require('uuid');

const TodoController = {
  index: (request, response) => {
    const { user } = request;

    return response.json(user.todos);
  },
  
  create: (request, response) => {
    const { user } = request;
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

    user.todos.push(todo);

    return response.status(201).json(todo);
  },

  update: (request, response) => {
    const { user } = request;
    const { id } = request.params;
    const { title, deadline } = request.body;
  
    if (!id) {
      return response.status(400).json({ error: 'Missing todo id' });
    }
  
    if (!title || !deadline) {
      return response.status(400).json({ error: 'Missing title or deadline' });
    }
  
    const todoIndex = user.todos.findIndex(todo => todo.id === id);
  
    if (todoIndex < 0) {
      return response.status(404).json({ error: 'Todo not found' });
    }
  
    user.todos[todoIndex] = {
      ...user.todos[todoIndex],
      title,
      deadline: new Date(deadline),
    }
  
    return response.json(user.todos[todoIndex]);
  },
  updatePatch: (request, response) => {
    const { user } = request;
    const { id } = request.params;
  
    if (!id) return response.status(400).json({ error: 'Missing todo id' });

    const todoIndex = user.todos.findIndex(todo => todo.id === id);
  
    if (todoIndex < 0) {
      return response.status(404).json({ error: 'Todo not found' });
    }
  
    user.todos[todoIndex] = {
      ...user.todos[todoIndex],
      done: true
    }
    return response.status(200).json(user.todos[todoIndex]);
  },

  delete: (request, response) => {
    const { user } = request;

    const { id } = request.params;
  
    if (!id) return response.status(400).json({ error: 'Missing todo id' });
  
    const todoIndex = user.todos.findIndex(todo => todo.id === id);
  
    if (todoIndex < 0) {
      return response.status(404).json({ error: 'Todo not found' });
    }
  
    user.todos.splice(todoIndex, 1);
  
    return response.status(204).send();
  }
}

module.exports = TodoController;