const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['applicant', 'recruiter'],
    required: true
  },
  firstName: {
    type: String,
    min:2,
    max:50,
    trim:true,
    required: function() {
      return this.role === 'applicant';
    }
  },
  lastName: {
    type: String,
    min:2,
    max:50,
    trim:true,
    required: function() {
      return this.role === 'applicant';
    }
  },
  contact_info: {
    type: String,
    required: function() {
      return this.role === 'applicant';
    }
  },
  education_level: {
    type: String,
    required: function() {
      return this.role === 'applicant';
    }
  },
  experience_level: {
    type: String,
    required: function() {
      return this.role === 'applicant';
    }
  },
  companyName: {
    type: String,
    min:5,
    max:255,
    trim:true,
    required: function() {
      return this.role === 'recruiter';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, role: this.role},config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);
function validate(user){
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().required(),
        role:Joi.string().required(),
        firstName:Joi.string().min(2).max(50),
        lastName:Joi.string().min(2).max(50),
        contact_info:Joi.string(),
        education_level:Joi.string(),
        experience_level:Joi.string(),
        companyName:Joi.string().min(5).max(255),
        createdAt:Joi.date(),
   
    });

    return schema.validate(user);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validate;


