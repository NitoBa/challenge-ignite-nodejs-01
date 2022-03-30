const checksExistsTodo = (request, response, next) => {
  const { user } = request
  const { id } = request.params

  const todoIndex = user.todos.findIndex(todo => todo.id === id);
  
  if (todoIndex < 0) {
    return response.status(404).json({ error: 'Todo not found' });
  }
  request.todo = user.todos[todoIndex]
  request.todoIndex = todoIndex
  next();
}

module.exports = checksExistsTodo