import React,{useState,useEffect} from 'react';

const Home = ()=>{
const [data,setData]=useState([])
useEffect(()=>{
fetch('/allpost',{
	headers:{
		"Authorization":"Bearer "+localStorage.getItem('jwt')
	}
}).then(res=>res.json())
.then(result=>{
	console.log(result)
	setData(result)

})
},[])
return (
	<div className='Home'>
	{
		data.map(item=>{
			return(
        

	<div className='card homecard' key={item._id}>
<h5>{item.postedBy.name}</h5>
<div className='card-image'>
<img src={item.pic}></img>


</div>

<div className='card-content'>
<i className='material-icons' style={{ color:'red'}}>favorite</i>
<h4>{item.title}</h4>
<p>
{item.body}
</p>
<input type='text' placeholder='comment'></input>
</div>
	</div>





				)
		})
	}


</div>
	
)
}


export default Home;