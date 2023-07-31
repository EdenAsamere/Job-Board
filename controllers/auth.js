const asyncHandler = require('express-async-handler');
const {User,validate}= require('../schema/users');
const _ = require('lodash');
const bcrypt =require('bcrypt');


const signupUser = asyncHandler(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const { email, password, role } = req.body;
  
    if (role !== "applicant" && role !== "recruiter") {
      return res.status(400).send("Invalid role");
    }
  
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already registered");
  
    if (role === "applicant") {
      const {
        firstName,
        lastName,
        contact_info,
        education_level,
        experience_level,
        createdAt,
      } = req.body;
  
      if (!firstName || !lastName || !contact_info || !education_level || !experience_level) {
        return res.status(400).send("Missing required fields for applicant");
      }
  
      user = new User({
        email,
        password,
        role,
        firstName,
        lastName,
        contact_info,
        education_level,
        experience_level,
        createdAt,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
      const token = user.generateAuthToken();
      res.header("x-auth-token", token).json(_.pick(user, ["_id", "email", "role", "firstName", "lastName", "contact_info", "education_level", "experience_level"]));
    } 
    
    else if (role === "recruiter") {
      const { companyName } = req.body;
  
      if (!companyName) {
        return res.status(400).send("Missing required fields for recruiter");
      }
  
      user = new User({
        email,
        password,
        role,
        companyName,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
      const token = user.generateAuthToken();
      res.header("x-auth-token", token).send(_.pick(user, ["_id", "email", "role", "companyName"]));
    }
  });
  const loginUser =asyncHandler(
    async(req,res) =>{    
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).send('invalid email or password');

        const validatePassword = await bcrypt.compare(password,user.password);
        if(!validatePassword) return res.status(400).send('invalid email or password');

        const token = user.generateAuthToken();
        res.status(200).send(token);
        console.log(token)
});

const logoutUser = asyncHandler(async (req, res) => {
});

    
module.exports ={signupUser,loginUser,logoutUser}



