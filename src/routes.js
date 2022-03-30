const { Router } = require('express');

const checksExistsUserAccount = require('./middlewares/check-exists-user-account.js');
const checksExistsTodo = require('./middlewares/check-exists-todo.js');
const UserController = require('./controllers/user-controller');
const TodoController = require('./controllers/todo-controller');

const router = Router();

router.post('/users', UserController.create);

router.get('/todos', checksExistsUserAccount, TodoController.index);

router.post('/todos', checksExistsUserAccount, TodoController.create);

router.put('/todos/:id', checksExistsUserAccount, checksExistsTodo, TodoController.update);

router.patch('/todos/:id/done', checksExistsUserAccount, checksExistsTodo, TodoController.updatePatch);

router.delete('/todos/:id', checksExistsUserAccount, checksExistsTodo, TodoController.delete);

module.exports = router