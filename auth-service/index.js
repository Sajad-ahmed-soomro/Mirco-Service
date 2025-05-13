const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const users = [{ id: 1, username: 'admin', password: 'pass' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.sendStatus(401);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.listen(3001, () => console.log('Auth service running on 3001'));
