import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import asyncHandler from 'express-async-handler';
import { Fyp, validateCreateFyp, validateUpdateFyp } from '../schemas/FYP.js';
import { User } from '../schemas/User.js';

const router = Router();

/**
 * @desc Get all FYPs
 * @route /fyps
 * @method GET
 * @access public
 */
router.get('/', verifyToken, asyncHandler(
  async (req, res) => {
    const fypsList = await Fyp.find().populate('publisher', [
      'name',
      'role'
    ]);
    res.status(200).json(fypsList);
  }
))

/**
 * @desc Get a FYP by id
 * @route /fyps/:id
 * @method GET
 * @access public
 */
router.get('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const fyp = await Fyp.findById(req.params.id).populate('publisher', [
      'name',
      'role'
    ]);
    if (!fyp) {
      res.status(404).json({ message: 'Final Year Project does not exist' })
    }
    res.status(200).json(fyp);
  }
))

/**
 * @desc Create a Fyp Post
 * @route /fyps
 * @method POST
 * @access public
 */
router.post('/', verifyToken, asyncHandler(
  async (req, res) => {
    const { error } = validateCreateFyp(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    let fyp = await Fyp.findOne(req.body);
    if (fyp) {
      res.status(409).json({ message: 'Final Year Project already exists' })
    }
    fyp = new Fyp ({
      publisher: req.user.id,
      theme: req.body.theme,
      description: req.body.description,
      field: req.body.field,
      organism: req.body.organism,
      objectives: req.body.objectives
    })
    const result = await fyp.save();
    const data = result._doc;
    const user = await User.findById(data.publisher);
    if (!user) {
      res.status(500).json({ message: 'Something went wrong' })
    }
    user.fypPosts.push(data._id);
    await user.save();
    res.status(201).json(data);
  }
))

/**
 * @desc Update an fyp by id
 * @route /fyps/:id
 * @method PUT
 * @access private (only the admin and the publisher)
 */
router.put('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const { error } = validateUpdateFyp(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    const fyp = await Fyp.findById(req.params.id);
    if (!fyp) {
      res.status(404).json({ message: 'Final year project does not exist' })
    }
    if (req.user.id === fyp.publisher || req.user.role === 'admin') {
      const result = await Fyp.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(201).json(result);
    } else {
      res.status(401).json({ message: 'You are not allowed to perform this action' })
    }
  }
))

/**
 * @desc Delete an fyp by id
 * @route /fyps/:id
 * @method DELETE
 * @access private (only the admin and the publisher)
 */
router.delete('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const fyp = await Fyp.findById(req.params.id);
    if (!fyp) {
      res.status(404).json({ message: 'Final year project does not exist' })
    }
    if (req.user.id === fyp.publisher || req.user.role === 'admin') {
      const result = await Fyp.deleteOne({ _id: req.params.id });
      const user = await User.findById(data.publisher);
      if (!user) {
        res.status(500).json({ message: 'Something went wrong' })
      }
      const index = user.fypPosts.indexOf(fyp._id);
      if (index !== -1) {
        user.fypPosts = [...user.fypPosts.slice(0, index), ...user.fypPosts.slice(index+1)];
        await user.save();
      }
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: 'You are not allowed to perform this action' })
    }
  }
))

export default router;
