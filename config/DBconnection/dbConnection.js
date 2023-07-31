const mongoose = require(('mongoose'))
const connectDB = async () =>{
  mongoose.connect('mongodb://127.0.0.1/JobsDB')
 .then(()=>console.log('Database connected...'))
 .catch(()=>console.error('could not connect to the database...'))
};

module.exports = connectDB;

