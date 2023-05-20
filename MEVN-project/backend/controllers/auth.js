import User from "../models/User";

export const loginUser = (req, res) => {
  User.findAll().then((users) => {
    res.json(users);
  });
};

export const registerUser = (req, res) => {
  const { name, email } = req.body;
  User.create({ name, email }).then((user) => {
    res.json(user);
  });
};
