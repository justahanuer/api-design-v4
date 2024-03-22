import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const creatJWT = (user) => {
  return jwt.sign({
      id: user.id,
      username: user.username
    },
    process.env.JWT_SECRET);
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({message: 'Not authorized'});
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({message: 'Not valid token'});
    return;
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({message: 'Not valid token'});
    return;
  }
};
