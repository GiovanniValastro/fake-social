const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

const signUp = async (req, res) => {

  const { username, email, password, confirmPassword } = req.body;  

  try {

    const emailExist = await User.findOne({ email });
    if(emailExist) return res.status(404).json({message: 'User already exists'});

    if(password !== confirmPassword) return res.status(400).json({message: 'Password don\'t match'})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hashedPassword })
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' } );

    res.status(201).json({ result: {...newUser._doc, password: password, token}});

  } catch(err) {

    res.status(500).json({ message: 'Something went wrong' });
    console.log(err);

  }   
}

const signIn = async (req, res) => {
  
  const { email, password } = req.body;  

  try {

    const emailExist = await User.findOne({ email }).populate('friends', 'username avatar');
    if(!emailExist) return res.status(404).json({message: 'Email or password is wrong'});

    const passwordValid = await bcrypt.compare(password, emailExist.password);
    if(!passwordValid) return res.status(400).json({message: 'Invalid credentials'});

    const token = jwt.sign({ email: emailExist.email, id: emailExist._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    res.status(200).json({ result: { ...emailExist._doc, password: password, token  }});

  } catch(err) {

    res.status(500).json({message: 'Something went wrong'});
 
  }
}

module.exports = { signUp, signIn }




 