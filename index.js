const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(PORT, () => {
  console.log(`server is ok PORT : ${PORT}`);
});

module.exports = app;
