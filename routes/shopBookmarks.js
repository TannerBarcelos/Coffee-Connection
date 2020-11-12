const router = require('express').Router(); 

// Importing the user model
const User = require('../models/User');

// Will add a bookmarked shop to the corresponding user who bookmarked it.
router.post('/bookmark', async (req,res) => {
  const {shopName, image_url, url, phone, address, rating, shopID, userID} = req.body;   // Get all the data in the body of the request
  await User.findById(userID, async (err, user) => {   // lookup this user in the DB
    if(err) {
      return res.status(400).json({msg: 'User not found'});
    }else{
      /**
       * Go to models and create a model for a shop, and then see if instead of this array method to find duplicate,
       * see if there is a method to look in the array of shop models to basically prevent duplication that way
       */
      if(user.bookmarkedShops.find(bookmarkedCoffeeShop => bookmarkedCoffeeShop.name === shopName)) {
        return res.json({msg: "Item already bookmarked"});
      }else {
        const shop = {
          name: shopName,
          imageURL: image_url,
          url: url,
          phone: phone,
          address: address,
          shopID: shopID,
          rating: rating,
        };
        user.bookmarkedShops.push(shop); // push this shop to the array for this user
        await user.save();
        return res.json({msg: user})
      }
    }
  });
})

/**
 * Gets all bookmarked shops for this logged in user
 */
router.get('/shops/:userid', async (req, res) => {
  const userID = req.params.userid;
  console.log(userID)
  await User.findById(userID, async (err, user) => {
    if(err) {
      return res.status(400).json({msg: 'User not found'});
    }else{
        return res.json(user.bookmarkedShops)
    }
  });
});

/**
 * Removes a selected coffee shop that is bookmarked : accepts the coffee shops ID as the medium 
 * to find within the bookmarks array
*/
router.post('/remove', async (req, res) => {
  const {shopID, userID} = req.body;
  await User.findById(userID, async (err, user) => {
    if(err) {
      return res.status(400).json({msg: 'User not found'});
    }else{

        // we found the user signed in. Let's use the shopID to find the shop and remove it from 
        // the array in our user model
        const filteredOut = user.bookmarkedShops.filter(shop => {
          return shop.shopID !== shopID;
        });
        user.bookmarkedShops = null;
        user.bookmarkedShops = filteredOut;
        console.log(user.bookmarkedShops);
        await user.save();
        return res.json(user.bookmarkedShops)
    }
  });
})

module.exports = router;