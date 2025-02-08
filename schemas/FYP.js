import { model, Schema } from "mongoose";
import Joi from 'joi';

export const FypSchema = new Schema({
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: ""
  },
  theme: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  },
  field: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  organism: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  },
  objectives: {
    type: [String],
    required: true
  }
}, { timestamps: true })

export const Fyp = model('Fyp', FypSchema);

export const validateCreateFyp = (obj) => {
  const schema = Joi.object({
    theme: Joi.string().trim().min(5).max(20).required(),
    description: Joi.string().trim().min(5).required(),
    field: Joi.string().trim().min(5).max(20).required(),
    organism: Joi.string().trim().min(5).required(),
    objectives: Joi.array().items(Joi.string().min(5)).unique().min(1).max(3).required()
  });
  return schema.validate(obj);
}

export const validateUpdateFyp = (obj) => {
  const schema = Joi.object({
    theme: Joi.string().trim().min(5).max(20),
    description: Joi.string().trim().min(5),
    field: Joi.string().trim().min(5).max(20),
    organism: Joi.string().trim().min(5),
    objectives: Joi.array().items(Joi.string().min(5)).unique().min(1).max(3)
  });
  return schema.validate(obj);
}
