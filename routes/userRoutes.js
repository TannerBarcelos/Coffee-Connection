const router = require('express').Router(); // this will allow routing across multiple files
const User = require('../models/User');

// Middlewares
const {checkAdminMiddleware} = require('./sessionMiddleware');

// Must have admin privleges to see all users in the application (for dashboard purposes) so 
// must use the checkAdminMiddleware
router.get('/users', checkAdminMiddleware, async (req, res) => {
  // get all users from the user collection in the mongo store
  const userCollection = [];
  await User.find({}, (err, allUsers) => {
    allUsers.forEach((user) => {
      const {_id, name, email, role, date} = user; // pull our all properties except the password
      userCollection.push({_id, name, email, role, date});
    });
  })
  res.json({msg: 'Fetched users successfully', users: userCollection})
})

module.exports = router;