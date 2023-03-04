const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
};

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);

  //check if user has entered all details
  if (!email || !username || !password) {
    return res.status(400).json({ message: "Please enter all details" });
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(401).json({ message: "User already exists" });
  }

  //hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      //store hash in DB
      const user = await User.create({
        username,
        email,
        password: hash,
      });
      console.log(user);
      //check if user is created
      if (user) {
        return res.status(201).json({
          _id: user.id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
          message: "User created succesfully",
        });
      } else {
        return res.status(401).json({ message: "Inavalid User data" });
      }
    });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //check if email exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
      message: "User logged in succesfully",
    });
  } else {
    return res.status(401).json({
      message: "Invalid user credentials",
    });
  }
};

module.exports = { registerUser, loginUser };
