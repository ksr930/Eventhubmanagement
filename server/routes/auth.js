const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JSONSECRET}=require('../key.js')
const requirelogin =require('../middleware/login.js')



router.get('/',requirelogin,(req,res)=>{
	res.send('hello')
})

router.post('/signup',(req,res)=>{
	console.log(req.body)
	const {name,email,password}=req.body;
	if(!name||!email||!password)
	{
		return res.status(422).json({error:'please add all the field'})
	}
	User.findOne({email:email}).
	then(saveduser=>{
		if(saveduser)
		return res.status(422).json({error:'user already exist'})
bcrypt.hash(password,12)
.then(hashedpassword=>{
	const user = new User({name,email,password:hashedpassword});

	user.save()
	.then(u=>{
		console.log("k");
		console.log(u)
		res.json({'message':u})
	})
	.catch(err=>{
		console.log(err)
	})
})
	
	
})
	.catch(err=>{
		console.log(err)
	})
})

router.post('/signin',(req,res)=>{
	const {email,password}=req.body;
	if(!email||!password)
	{
		return res.status(422).json({'error':'error enter email password'})
	}
	User.findOne({email:email})
	.then(saveduser=>{
		if(!saveduser)
		{
			return res.status(422).json({'error':'error occur'})
		}
		else{
			const {_id,name,email}=saveduser
			bcrypt.compare(password,saveduser.password)
			.then(domatch=>{
				if(domatch)
				{
					const token = jwt.sign({id:saveduser._id},JSONSECRET);
					res.json({token,user:{_id,name,email}})
				}
				else{
					return res.status(422).json({'error':'invalid email password'})
				}
			})
			.catch(err=>{
				console.log(err)
			})
		}
	})
})












module.exports = router;


