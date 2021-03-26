import jwt from 'jsonwebtoken';

export const signInController = (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 5 });
  res.cookie('token', token, { httpOnly: true });
  res.send(req.get('host'));
};

export const tokenController = (req, res) => {
  res.send(req.user);
};
