import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { User, validateLoginUser, validateRegisterUser } from '../schemas/User.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

/**
 * @desc Register a User
 * @route /auth/login
 * @method POST
 * @access public
 */
router.post('/register', asyncHandler(
  async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json({ message: 'User already exists' })
    }
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      major: req.body.major,
      university: req.body.university
    });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    const data = user._doc;
    delete data.password;
    res.status(201).json({ token, ...data });
  }
))

/**
 * @desc Login User
 * @route /auth/login
 * @method POST
 * @access public
 */
router.post('/login', asyncHandler(
  async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: 'Wrong Email or Password' })
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      res.status(404).json({ message: 'Wrong Email or Password' })
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    const data = user._doc;
    delete data.password;
    console.log('request handled');
    res.status(200).json({ token, ...data });
  }
))

export default router;
