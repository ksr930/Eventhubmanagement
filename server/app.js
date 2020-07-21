const express = require('express');
const app = express();
const mongoose = require('mongoose')
const {MONGODBURI} = require('./key.js')
const User = require('./models/user.js')
const post = require('./models//post.js')
const cors=require('cors')

mongoose.connect(MONGODBURI,{ useNewUrlParser: true ,useUnifiedTopology: true },(err)=>{
if(!err)
{
	console.log('database connected');
}
else{
	console.log(err)
}
})

app.use(cors());
app.use(express.json())
app.use(require('./routes/auth.js'))
app.use(require('./routes/post.js'))



app.listen(5000,(err)=>{
	if(!err)
	{
		console.log('server connected')
	}
	else{
		console.log('error')
	}
})