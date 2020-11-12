const router = require('express').Router(); // this will allow routing across multiple files
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Validation file
const {loginValidation, registerValidation} = require('../validation');


router.post('/login', async (req,res) => {
  const {email, password} = req.body;
  const {error} = loginValidation(req.body);

  if(error) return res.status(400).json({msg: "error with signing in", isAuthenticated: false});

  // Search the DB for if the user does exist
  try {
    const user = await User.findOne({email: email});     // Find the user if he/she exists BY EMAIL
    if(!user) return res.status(400).json({msg: 'Email or password is incorrect', isAuthenticated: false});     // if they do not exist
    
    const isValid = await bcrypt.compare(password, user.password);     // If they do exist, parse this users password and see if it matches the password entered
    if(!isValid) return res.status(400).json({msg: 'Username or password error', isAuthenticated: false}); // if password is not valid, send back error

    /**
     * If we fall here, the password is valid. From here we can update the users permissions to admin or member based off their user role
     * saved in the database for this user. We can basically re-establish the session with an updated role, and their information as the user for this session.
     * 
     * This will only make a change if there happens to be one, else, it will establish a new session/cookie
     * if need be sometime later.Right now we have no expiration on our cookie so it has an infinite session
     * 
     * The User.findOne() method returns the user to us, which holds the role for me, so, I can easilly re-assign role in the session with ease
     */
    req.session.regenerate((err) => {
      if (err) {console.log(err);}
      req.session.user = user;
      delete req.session.user.password; // we do NOT want to keep the password in the cookie. We already authenticated them so we can discard it!
      return res.status(200).json({msg:`${user.name} successfully logged in`, isAuthenticated: true, data: {name: user.name, email: user.email, role: user.role, id: user._id}}); // the cookie is already attached as a header, no need to send here
    });
  } 
  catch (err) {
      return res.status(401).json({msg: 'User not found'});
  }
});

router.post('/register', async (req,res) => {
  const {username, password, email} = req.body;

  // Validate the data entered using joi
  const {error} = registerValidation(req.body)

  // If validation fails, send back those errors to client to be shown
  if(error) 
    return res.status(400).json({msg: error.details[0].message})

  try {
    // If no errors, check the database for duplicate user registration by the email entered of course
    const userExists = await User.findOne({email: email});
    if(userExists) 
      return res.status(400).json({msg: 'User already exists'})
  } catch (error) {
    return res.send(error)
  }

  // ELSE, we can finally create the new user since we passed validation AND no duplicate user in DB already
    // Step 1) Secure the password
  // salt the password and hash it - this is to properly secure the password
  const salt = await bcrypt.genSalt()
  const hashedPass = await bcrypt.hash(password, salt);
  let role = '';
  process.env.ADMIN_KEY === email ? role = 'admin' : role = 'member';

  // Step 2) Create the new user for the DB using the hashed pass, role, and name/email
  const user = new User({
    name: username,
    email: email,
    password: hashedPass, // the HASHED PASSWORD,
    role: role
  });

  // Step 3) Save them and generate a new session
  try {
    const savedUser = await user.save();
    req.session.regenerate((err) => {
      if (err) {console.log(err);}
      req.session.user = savedUser;
      delete req.session.user.password; // we do NOT want to keep the password in the cookie. We already authenticated them so we can discard it!
      return res.status(200).json({msg:`${user.name} successfully logged in`, isAuthenticated: true, data: {name: user.name, email: user.email, role: user.role, id: user._id}}); // the cookie is already attached as a header, no need to send here
    });
  } catch (err) {
    return res.status(400).json({msg: "error"});
  }
})

// logout route - clears the cookie from cookie storage and if a user attempts to use protected routes,
// they WILL need to login to get there
router.get('/logout', function (req, res) {
	let options = req.session.cookie; // get any current options in the session cookie
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		}
		res.clearCookie('auth-token', options).json({message: "Goodbye"});
  })
});

module.exports = router;