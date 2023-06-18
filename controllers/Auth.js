const User = require("../models/Users"),
  generateToken = require("../config/generateToken"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  fs = require("fs");

const encrypt = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// entity/login
exports.login = (req, res) => {
  const { email, password } = req.query;

  User.find({ $or: [{ email }] })
    .then(async users => {
      console.log(users);
      const user = users[0];
      if (user) {
        if (await user.matchPassword(password)) {
          res.json({ user: user, token: generateToken(user._id) });
        } else {
          res.json({ error: "Password is incorrect!" });
        }
      } else {
        res.json({ error: "Account is not in our database!" });
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/save
exports.save = (req, res) =>
  User.create(req.body)
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
