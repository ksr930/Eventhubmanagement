const jwt =require('jsonwebtoken')
const {JSONSECRET} = require('../key.js')
const mongoose = require('mongoose');
const User = require('../models/user.js')

module.exports = (req,res,next)=>{
	const {authorization}=req.headers;
	if(!authorization)
	{
		return res.status(401).json({error:'you must be logged in'})

	}
	const token = authorization.replace("Bearer ","")
	

	jwt.verify(token,JSONSECRET,(err,payload)=>{
		console.log(payload)
		if(err)
		{
			return res.status(401).json({'error':'you must be verife in'})
		}
		const {id} =payload
		
		User.findById(id)
		.then(userdata=>{
			req.user=userdata
			next()
		})


	})
	
}