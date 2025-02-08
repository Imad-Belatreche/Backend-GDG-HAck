import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { User, validateUpdateUser } from '../schemas/User.js';
import { verifyAdmin, verifyAdminAndUser } from '../middlewares/verifyToken.js';
import * as bcrypt from 'bcrypt';

const router = Router();

/**
 * @desc Get all users
 * @route /users
 * @method GET
 * @access private (only admin)
 */
router.get('/', verifyAdmin, asyncHandler(
  async (req, res) => {
    const userList = await User.find().select('-password');
    res.status(200).json(userList);
  }
))

/**
 * @desc Get a user by id
 * @route /users/:id
 * @method GET
 * @access private (only admin and user himself)
 */
router.get('/:id', verifyAdminAndUser, asyncHandler(
  async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User does not exist' })
    }
    res.status(200).json(user);
  }
))

/**
 * @desc Update a user's info
 * @route /users/:id
 * @method PUT
 * @access private (only admin and user himself)
 */
router.put('/:id', verifyAdminAndUser, asyncHandler(
  async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).json({ message: 'User does not exist' })
    }
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }
    const result = await User.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(201).json(result);
  }
))

/**
 * @desc Delete a user by id
 * @route /users/:id
 * @method DELETE
 * @access private (only admin and user himself)
 */
router.delete('/:id', verifyAdminAndUser, asyncHandler(
  async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).json({ message: 'User does not exist' })
    }
    const result = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  }
))

export default router;
