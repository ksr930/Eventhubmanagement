import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = ()=>{
  const history=useHistory();
 const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("")

const PostData =()=>{

if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
{
      M.toast({html:"invalid email",classes:'#e53935 red darken-1'})
      return
}
  fetch('http://localhost:5000/signup',{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      name,
      password,
      email,
    })
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.error){
      M.toast({html:data.error,classes:'#e53935 red darken-1'})
    }
    else{
      M.toast({html:data.message.name,classes:'#7b1fa2 purple darken-2'})
      history.push('/signin')
    }
  })
  .catch(err=>{
    console.log(err)
  })
}
return (
 

	<div className="mycard">
 <div className="card authcard">
       <h2>Instagram</h2>
       <br></br>
        <input type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
       <input type='text' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
       <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>

<button onClick={()=>{
  PostData()
}} className="waves-effect waves-light btn blue">Signin</button>
          
       
       <h5>
         Don't have an account?
      </h5>
         <Link to ='signin'className="waves-effect waves-light btn grey" >Signin </Link>
       
      </div>
	</div>
)
}


export default Signup;