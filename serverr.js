const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the registration form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle registration form submission
app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.send('Registration failed.');
    } else {
      res.send('Registration successful.');
    }
  });
});

app.listen(port, () => {
  console.log(Server is running on http://localhost:${port});
});