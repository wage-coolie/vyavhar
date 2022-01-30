const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require("bcrypt")

// router.get('/',(req,res) => {
// 	res.send("Hey ")
// })

 // creating user 
router.post('/register',async (req,res) => {

	try {
		// generate password encryption
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password,salt)
		// creating user
		const newUser = await new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword
		})
		// saving user
		const user = await newUser.save();
		// sending response
		res.status(200).json(user);
	} catch(e) {
		// statements if error is encountered
		console.log(e); 
	}
 

})
 
// logging user 
router.post('/login',async (req,res) => {
	try {
		const user = await User.findOne({email: req.body.email})
		!user && res.status(404).json("couldn't find user")
		const validPassword = await bcrypt.compare(req.body.password,user.password)
		!validPassword && res.status(404).json("password didn't matched")
		res.status(200).json(user)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e)
	}

})




module.exports = router;