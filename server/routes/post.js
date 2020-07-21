const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post.js')
const requirelogin =require('../middleware/login.js')


router.get('/allPost',requirelogin,(req,res)=>{
	Post.find({})
	.populate("postedBy","_id name")
	.then(posts=>{
		res.send(posts)
	})

	.catch(err=>{
		console.log(err)
	})
})


router.post('/createPost',requirelogin,(req,res)=>{
	const {title,body,pic}=req.body;
	console.log(req.user)
	// res.json ({
	// 	user:req.user,
	// 	title,
	// 	body
	// })
	if(!title || !body|| !pic)
	{
		return res.status(422).json({'err':'please add all field'})
	}
	else{
		req.user.password=undefined;
		const post= new Post({
			title,body,pic,
			postedBy:req.user
		})

		post.save()
		.then(result=>{
			res.json({result})
		})
		.catch(err=>{
			console.log(err)
		})
	}
})


router.get('/myPost',requirelogin,(req,res)=>{
	Post.find({postedBy:req.user._id})
	.populate('postedBy','_id name')
	.then(mypost=>{
		res.json({mypost})
	})
	.catch(err=>{
		console.log(err)
	})
})














module.exports=router;