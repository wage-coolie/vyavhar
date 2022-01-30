const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

// update the user
// router.get('/',(req,res) => {
// 	res.send("Hey ")
// })
 
// update the user
router.put('/:id', async(req,res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin){
		if (req.body.password){
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password,salt);
			}catch(e){
				return res.status(403).json(e)
			}
		}
		try{
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("Account updated")
		}catch(e){
			return res.status(500).json(req.params.id)
		}
	}else{
		return res.status(403).jsoon("You can only update your own Account")
	}
})

// delete user
router.delete('/:id', async(req,res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin){
		try{
			const user = await User.findByIdAndDelete(req.params.id)
			res.status(200).json("Account Deleted")
		}catch(e){
			return res.status(500).json(req.params.id)
		}
	}else{
		return res.status(403).json("You can only delete your own Account")
	}
})

router.get("/all",async (req,res) => {
	try{
		const user = await User.find({})
		res.status(200).json(user)
	}catch(e){
		res.status(400).json(e)
	}
})

// get a user
router.get("/",async (req,res) => {
	const userId = req.query.userId;
	const username = req.query.username;
	try {
		const user = userId ? await User.findById(userId) : await User.findOne({ username : username })
		const {password , updatedAt, ...others} = user._doc
		res.status(200).json(others)
	} catch(e) {
		console.log(e);
		res.status(500).json(e);
	}
})

// get the friends of the user
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});


// follow another user
router.put("/:id/follow",async (req,res) => {
	if (req.body.userId !== req.params.id){
		try {
			const user = await User.findById(req.params.id)
			const currentUser = await User.findById(req.body.userId)
			if(!user.followers.includes(req.body.userId)){
				await user.updateOne({$push: {followers:req.body.userId}}) 
				await currentUser.updateOne({$push: {following:req.params.id}}) 
				res.status(200).json("User followed")
			}else{
				res.status(403).json("Already Followed")
			}
		} catch(e) {
			// statements
			console.log(e);
		}
	}else{
		res.status(403).json("You can't follow yourself, Get a life!")
	}
})

// unfollow a user
router.put("/:id/unfollow",async (req,res) => {
	if (req.body.userId !== req.params.id){
		try {
			const user = await User.findById(req.params.id)
			const currentUser = await User.findById(req.body.userId)
			if(user.followers.includes(req.body.userId)){
				await user.updateOne({$pull: {followers:req.body.userId}}) 
				await currentUser.updateOne({$pull: {following:req.params.id}}) 
				res.status(200).json("User has been unfollowed")
			}else{
				res.status(403).json("Already Unfollowed")
			}
		} catch(e) {
			// statements
			console.log(e);
		}
	}else{
		res.status(403).json("You can't unfollow yourself")
	}
})

module.exports = router;





// try{
// 			const user = await user.findByIdAndUpdate(req.params.id, {
// 				desc: req.body.desc,
// 			});
// 			res.status(200).json("Account updated")
// 		}catch(e){
// 			return res.status(500).json(req.params.id)
// 		}