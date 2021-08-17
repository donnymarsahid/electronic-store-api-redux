const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const account = require('../api/account.json');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const findAccount = account.find((data) => data.email === email);

  if (findAccount) {
    bcrypt.compare(password, findAccount.password, (err, result) => {
      if (result) {
        const data = findAccount.id;
        const token = jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: 300 });
        res.status(202).cookie('auth_token', token).send('cookie being initialised');
      } else {
        res.send({ message: 'password wrong' });
      }
    });
  } else {
    res.send({ message: 'email wrong' });
  }
});

module.exports = router;
