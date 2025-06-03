const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());

const todoRoute = require('./routes/todos');
const authRoute = require('./routes/auth');

app.use('/todos', todoRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`server is at port ${port}`);
});
