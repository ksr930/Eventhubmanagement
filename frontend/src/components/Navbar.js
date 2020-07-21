import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {userContext} from '../App.js'

const Navbar=(props)=>{
  const history=useHistory();
   const {state,dispatch}=useContext(userContext)
  const renderList =()=>{
        if(state){
return [
<li><Link to="/Profile">Profile</Link></li>,
<li><Link to="/Create">Create post</Link></li>,
<li>
<button onClick={()=>{
  localStorage.clear()
  dispatch({type:'CLEAR'})
  history.push('/signin')
}} className="waves-effect waves-light btn blue">Logout</button>
          


</li>



]
        }
        else{
          return [
          <li><Link to ="/Signin">Singin</Link></li>,
        <li><Link to="/Signup">Signup</Link></li>
        

          ]

        }
  }
		return (
			<div>
  
<nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
       {renderList()}
            </ul>
    </div>
  </nav>
        

  </div>

			)
	}


export default Navbar;