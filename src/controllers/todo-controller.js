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
    const { user, todo, todoIndex } = request;
    const { id } = request.params;
    const { title, deadline } = request.body;
  
    if (!id) {
      return response.status(400).json({ error: 'Missing todo id' });
    }
  
    if (!title || !deadline) {
      return response.status(400).json({ error: 'Missing title or deadline' });
    }

    todo.title = title;
    todo.deadline = new Date(deadline);

    user.todos[todoIndex] = todo; 
  
    return response.json(todo);
  },
  updatePatch: (request, response) => {
    const { user, todo, todoIndex } = request;
    const { id } = request.params;
  
    if (!id) return response.status(400).json({ error: 'Missing todo id' });

    todo.done = true
    user.todos[todoIndex] = todo

    return response.status(200).json(todo);
  },

  delete: (request, response) => {
    const { user, todoIndex } = request;

    const { id } = request.params;
  
    if (!id) return response.status(400).json({ error: 'Missing todo id' });
  
    user.todos.splice(todoIndex, 1);
  
    return response.status(204).send();
  }
}

module.exports = TodoController;