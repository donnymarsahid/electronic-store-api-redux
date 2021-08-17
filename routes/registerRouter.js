const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const saltRounds = 10;

const account = require('../api/account.json');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const findDuplicate = account.find((data) => data.email === email);

  if (findDuplicate) {
    res.send({ message: 'email has been use please login' });
    return false;
  }

  bcrypt.hash(password, saltRounds, (err, password) => {
    account.push({
      id: uuidv4(),
      email,
      password,
    });
    res.send({ message: 'success add account' });
    fs.writeFileSync('api/account.json', JSON.stringify(account), (err) => {
      console.log(err);
    });
  });
});

module.exports = router;
