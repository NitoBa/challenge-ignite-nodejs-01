const { users } = require('../data/users.js');
const { v4: uuidv4 } = require('uuid');

const UserController = {
    create: async (request, response) => {
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
    }
}

module.exports = UserController;