const { users } = require('../data/users.js');

const checksExistsUserAccount = (request, response, next) => {
  const { username } = request.headers;
  
  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  request.userId = user.id;
  next()
}

module.exports = checksExistsUserAccount;