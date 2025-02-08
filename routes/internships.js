import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import asyncHandler from 'express-async-handler';
import { Internship, validateCreateInternship, validateUpdateInternship } from '../schemas/Internship.js';
import { User } from '../schemas/User.js';

const router = Router();

/**
 * @desc Get all internships
 * @route /internships
 * @method GET
 * @access public
 */
router.get('/', verifyToken, asyncHandler(
  async (req, res) => {
    const internshipList = await Internship.find().populate('publisher', [
      'name',
      'role'
    ]);
    res.status(200).json(internshipList);
  }
))

/**
 * @desc Get an internship by id
 * @route /internships/:id
 * @method GET
 * @access public
 */
router.get('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const internship = await Internship.findById(req.params.id).populate('publisher', [
      'name',
      'role'
    ]);
    if (!internship) {
      res.status(404).json({ message: 'Internship does not exist' })
    }
    res.status(200).json(internship);
  }
))

/**
 * @desc Create an internship post
 * @route /internships
 * @method POST
 * @access public
 */
router.post('/', verifyToken, asyncHandler(
  async (req, res) => {
    const { error } = validateCreateInternship(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    let internship = await Internship.findOne(req.body);
    if (internship) {
      res.status(409).json({ message: 'Internship already exists' })
    }
    internship = new Internship({
      publisher: req.user.id,
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      link: req.body.link
    })
    const result = await internship.save();
    const data = result._doc;
    const user = await User.findById(data.publisher);
    if (!user) {
      res.status(500).json({ message: 'Something went wrong' })
    }
    user.internshipPosts.push(data._id);
    await user.save();
    res.status(201).json(data);
  }
))

/**
 * @desc Update an internship post
 * @route /internships/:id
 * @method PUT
 * @access private (only the admin and the publisher)
 */
router.put('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const { error } = validateUpdateInternship(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message })
    }
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      res.status(404).json({ message: 'Internship does not exist' })
    }
    if (req.user.id === internship.publisher || req.user.role === 'admin') {
      const result = await Internship.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(201).json(result);
    } else {
      res.status(401).json({ message: 'You are not allowed to perform this action' })
    }
  }
))

/**
 * @desc Delete an internship by id
 * @route /internships/:id
 * @method DELETE
 * @access private (only the admin and the publisher)
 */
router.delete('/:id', verifyToken, asyncHandler(
  async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      res.status(404).json({ message: 'Internship does not exist' })
    }
    if (req.user.id === internship.publisher || req.user.role === 'admin') {
      const result = await Internship.deleteOne({ _id: req.params.id });
      const user = await User.findById(data.publisher);
      if (!user) {
        res.status(500).json({ message: 'Something went wrong' })
      }
      const index = user.internshipPosts.indexOf(internship._id);
      if (index !== -1) {
        user.internshipPosts = [...user.internshipPosts.slice(0, index), ...user.internshipPosts.slice(index+1)];
        await user.save();
      }
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: 'You are not allowed to perform this action' })
    }
  }
))

export default router;
