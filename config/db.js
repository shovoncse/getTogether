const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try{
    await mongoose.connect(db, { 
      useNewUrlParser: true 
    });
    console.log('Database Connected..')
  }catch(err){
    console.log(err.message)

    // Exit Process with failure
    process.exit(1);
  }
}

module.exports = connectDB;