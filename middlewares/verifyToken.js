import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      res.status(400).json(new jwt.JsonWebTokenError());
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(401).json({ message: 'You are not allowed to perform this action' })
    }
  })
}

export const verifyAdminAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log("from verify token");
    if (req.user.id === req.params.id || req.user.role === 'admin') {
      next();
    } else {
      res.status(401).json({ message: 'You are not allowed to perform this action' })
    }
  })
}