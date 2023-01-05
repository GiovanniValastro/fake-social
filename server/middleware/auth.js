const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    if(token) {
      let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if(!decoded) return res.status(400).json({msg: 'Invalid Authentication.'})
      const creator = await User.findOne({_id: decoded.id})
      req.creator = creator;
    } else {
      console.log('ERROR')
    }
    next();
  }catch(err){
    return res.status(500).json({msg: err.message});
  }
}

module.exports = auth;