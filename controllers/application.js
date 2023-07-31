const asyncHandler = require('express-async-handler');
const {Applications,validateapp} = require('../schema/application');

const createapplication = asyncHandler(async (req, res) => {
    const { error } = validateapp(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    try {
      await auth(req);
    } catch (err) {
      res.status(401);
    }
    const application = new Applications(req.body);
        res.status(200).json(await application.save());  
  });
  

const getapplication = asyncHandler(async(req,res) =>{
    const application = await Applications.findById(req.body.id);
    if(!application){
        res.status(404).send('application not found');
        throw new Error('Not found!')};
    res.status(200).json(application);
});
const getapplications = asyncHandler(async(req,res) =>{
    const application = await Applications.find();
    if(!application){
        res.status(404).send('No applications')};
    res.status(200).json(application);
});

const deleteapplication =asyncHandler(
    async(req,res) =>{
        const application = await Applications.findByIdAndDelete(req.params.id);
        if(!application) res.status(400).send('application not found!')
        res.status(200).json(application)
        
    });
    
module.exports ={getapplication,getapplications,deleteapplication,createapplication}



