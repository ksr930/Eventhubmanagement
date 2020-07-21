import React ,{useEffect,useContext,createContext,useReducer} from 'react';
import Navbar from './components/Navbar.js'
import './App.css'
import Signin from './components/screens/Signin.js'
import Signup from './components/screens/Signup.js'
import Profile from './components/screens/Profile.js'
import CreatePost from './components/screens/CreatePost.js'
import Home from './components/screens/Home.js'
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import {reducer,initialState} from './components/reducers/userReducer.js'

export const userContext = createContext();

const Routing = ()=>{
  const History = useHistory();
  const {state,dispatch}=useContext(userContext)
  useEffect(()=>{
const user=JSON.parse(localStorage.getItem("user"))
if(user){
  dispatch({type:'USER',payload:user})
  
}
else{
  History.push('/signin')
}
  },[])


  return (
<fragment>
<Route exact path = '/'>
<Home/>
</Route>
<Route path = '/Signin'>
<Signin/>
</Route>
<Route path = '/Create'>
<CreatePost/>
</Route>
<Route path = '/Signup'>
<Signup/>
</Route>
<Route path = '/Profile'>
<Profile/>
</Route>


</fragment>

    )
}

function App(){
const [state,dispatch]=useReducer(reducer,initialState)


 
  return (
    <userContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing/>


      </BrowserRouter>
    </userContext.Provider>

  );
  
}

export default App;
