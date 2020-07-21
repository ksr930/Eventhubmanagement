import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {userContext} from '../../App.js'
const Signin = ()=>{
  const {state,dispatch}=useContext(userContext);
  const history=useHistory();

  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("")


const PostData =()=>{

if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
{
      M.toast({html:"invalid email",classes:'#e53935 red darken-1'})
      return
}
  fetch('http://localhost:5000/signin',{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
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
      localStorage.setItem('jwt',data.token)
      localStorage.setItem('user',JSON.stringify(data.user))
      dispatch({type:'USER',payload:data.user})
      M.toast({html:data.user.name+'successfully sign',classes:'#7b1fa2 purple darken-2'})
      history.push('/')
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
       
 
       <input type='text' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
       <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>

<button onClick={()=>{
  PostData()
}} className="waves-effect waves-light btn blue">Signin</button>
          

       <h5>
         Already have an account?
      </h5>
         <Link to ='signup'className="waves-effect waves-light btn grey" >Signup </Link>
       
      </div>
	</div>
)
}


export default Signin;