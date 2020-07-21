import React,{useEffect,useState,useContext} from 'react';

import {userContext} from '../../App.js'
const Profile = ()=>{
const [mypics,setPics]=useState([])

const {state,dispatch}=useContext(userContext)
useEffect(()=>{
	fetch('/mypost',{
		headers:{
			"Authorization":"Bearer "+localStorage.getItem('jwt')
		}
	})
	.then(res=>res.json())
	.then(data=>{
		setPics(data.mypost)
	})
})

return (
	<div style={{ maxWidth:'550px',margin:'0px auto'}}>
<div style={{
	display:'flex',
	justifyContent:'space-around',
	margin:'18px 0px',
	borderBottom :'1px solid grey'
}}>
<div>

<img style={{width:"156px",height:"160px",borderRadius:"80px"}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg'></img>

</div>

<div>
<h4>{state?state.name:'loading'}</h4>
<div style={{display :'flex' ,justifyContent:'space-between'}}>
<h6>40 Post</h6>
<h6>40 Followers</h6>
<h6>40 Followings</h6>

</div>
</div>

</div>



<div className='gallery'>
{
	mypics.map(item=>{
		return(
<img key='item.id' className='item' src={item.pic} alt={item.title}></img>

		)
	})
}


</div>










	</div>
)
}


export default Profile;