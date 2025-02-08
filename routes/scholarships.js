import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import asyncHandler from 'express-async-handler';
import { Scholarship, validateCreateScholarship, validateUpdateScholarship } from '../schemas/Scholarship.js';
import { User } from '../schemas/User.js';

const router = Router();

/**
 * @desc Get all scholarships
 * @route /scholarships
 * @method GET
 * @access public
 */
router.get('/', verifyToken, asyncHandler(
  async (req, res) => {
    const scholarshipsList = await Scholarship.find().populate('publisher', [
      'name',
      'role'
    ]);
    res.status(200).json(scholarshipsList);
  }
))

/**
 * @desc Get a scholarship by id
 * @route /scholarships/:id
 * @method GET
 * @access public
 */
router.get('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const scholarship = await Scholarship.findById(req.params.id).populate('publisher', [
      'name',
      'role'
    ]);
    if (!scholarship) {
      res.status(404).json({ message: 'Scholarship does not exist' });
    }
    res.status(200).json(scholarship);
  }
))

/**
 * @desc Create a Scholarship Post
 * @route /scholarships
 * @method POST
 * @access public
 */
router.post('/', verifyToken, asyncHandler(
  async (req, res) => {
    const { error } = validateCreateScholarship(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    let scholarship = await Scholarship.findOne(req.body);
    if (scholarship) {
      res.status(409).json({ message: 'Scholarship already exists' })
    }
    scholarship = new Scholarship ({
      publisher: req.user.id,
      title: req.body.title,
      description: req.body.description,
      institution: req.body.institution,
      budget: req.body.budget,
      link: req.body.link
    })
    const result = await scholarship.save();
    const data = result._doc;
    const user = await User.findById(data.publisher);
    if (!user) {
      res.status(500).json({ message: 'Something went wrong' })
    }
    user.scholarshipPosts.push(data._id);
    await user.save();
    res.status(201).json(data);
  }
))

/**
 * @desc Update a scholarship by id
 * @route /scholarships/:id
 * @method PUT
 * @access private (only the admin and the publisher)
 */
router.put('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const { error } = validateUpdateScholarship(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      res.status(404).json({ message: 'Scholarship does not exist' })
    }
    if (req.user.id === scholarship.publisher || req.user.role === 'admin') {
      const result = await Scholarship.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(201).json(result);
    } else {
      res.status(401).json({ message: 'You are not allowed to perform this action' })
    }
  }
))

/**
 * @desc Delete a scholarship by id
 * @route /scholarships/:id
 * @method DELETE
 * @access private (only the admin and the publisher)
 */
router.delete('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      res.status(404).json({ message: 'Scholarship does not exist' })
    }
    if (req.user.id === scholarship.publisher || req.user.role === 'admin') {
      const result = await Scholarship.deleteOne({ _id: req.params.id });
      const user = await User.findById(data.publisher);
      if (!user) {
        res.status(500).json({ message: 'Something went wrong' })
      }
      const index = user.scholarshipPosts.indexOf(scholarship._id);
      if (index !== -1) {
        user.scholarshipPosts = [...user.scholarshipPosts.slice(0, index), ...user.scholarshipPosts.slice(index+1)];
        await user.save();
      }
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: 'You are not allowed to perform this action' })
    }
  }
))

export default router;
