const asyncHandler = require('express-async-handler');
const {User}= require('../schema/users');


const getUser = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).send('user not found')};
    res.status(200).json(user);
});

const deleteUser =asyncHandler(
    async(req,res) =>{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) res.status(400).send('user not found!')
        res.status(200).json(user)
        
    });

const updateUser =asyncHandler(
    async(req,res) =>{
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new:true})
    
        if(!user){
            res.status(404).send('user not found')};
        res.status(200).json(user);
});
    
module.exports ={getUser,deleteUser,updateUser}
