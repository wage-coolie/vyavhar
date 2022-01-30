const router = require('express').Router();
const Post = require('../models/Post')
const User = require('../models/User');


// router.get('/',(req,res) => {
// 	res.send("Hey ")
// })

// create a post
router.post("/", async(req,res) => {
	const post = await new Post (req.body)
	try {
		const savedPost = await post.save()
		res.status(200).json(post)
	} catch(e) {
		
		console.log(e);
		res.status(500).json(e)
	}
})



// update a post
router.put("/:id", async(req,res) => {
	
	try {
		const post = await Post.findById(req.params.id)
		if (post.userId === req.body.userId){
			await post.updateOne({$set:req.body});
			res.status(200).json("post Updated")
		}else {
			return res.status(400).json("You an only update your own post yaar");
		}
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})



// delete a post
router.delete("/:id", async(req,res) => {
	
	try {
		const post = await Post.findById(req.params.id)
		if (post.userId === req.body.userId){
			await post.deleteOne();
			res.status(200).json("post Deleted")
		}else {
			return res.status(400).json("You an only delete your own post yaar"+req.body.userId);
		}
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})



// like a post
router.put("/:id/like", async(req,res) => {
	
	try {
		const post = await Post.findById(req.params.id)
		if (!post.likes.includes(req.body.userId)){
			await post.updateOne({$push:{likes:req.body.userId}});
			res.status(200).json("post Liked")
		}else {
			await post.updateOne({$pull:{likes:req.body.userId}});
			res.status(400).json("You dislike the post!");
		}
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})


// get a post
router.get("/:id", async(req,res) => {
	
	try {
		const post = await Post.findById(req.params.id)
		res.status(200).json(post)
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})

// get timeline of a user who isblogged in 
router.get("/timeline/:userId", async(req,res) => {
	try {
		const currentUser = await User.findById(req.params.userId);
		const userPosts = await Post.find({ userId:currentUser._id });
		const friendsPost = await Promise.all(
			currentUser.following.map((friendId) => {
				return Post.find({userId: friendId});
			})
			);

		res.status(200).json(userPosts.concat(...friendsPost))
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})

// get timeline of a specific user
router.get("/profile/:username", async(req,res) => {
	try {
		const user = await User.findOne({username:req.params.username});
		const posts = await Post.find({ userId:user._id });
		res.status(200).json(posts)
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})


// router.get("/timeline/all",  (req, res) => {
  
//     // const currentUser =  User.findById();
//     const userPosts =  Post.find({ userId: req.body.userId })
//     	.then((result) => {
//     		res.send(result)
//     	}).catch((e) => {
//     		res.status(500).json(e)
//     	})
//     // const friendPosts = await Promise.all(
//     // 	currentUser.following.map((friendId) => {
//     //     	return Post.find({ userId: friendId });
//     //   })
//     // )
      
  
//     // return res.json(userPosts)
  
// });


module.exports = router;


