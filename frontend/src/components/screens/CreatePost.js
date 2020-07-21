import React,{Component,useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const CreatePost=()=>{

  const history = useHistory();
  const [title,setTitle]=useState("")
  const [body,setBody]=useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")

useEffect(()=>{
if(url){
  fetch('/createpost',{
    method:'post',
        headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      title,body,pic:url
    })
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.error){
      M.toast({html:data.error,classes:'#e53935 red darken-1'})
    }
    else{
      M.toast({html:'createpost successfully',classes:'#7b1fa2 purple darken-2'})
      history.push('/')
    }
  })
  .catch(err=>{
    console.log(err)
  })
}
},[url])


const postDetails=()=>{

  const data = new FormData()
  data.append("file",image)
  data.append("upload_preset","insta_clone")
  data.append("cloud_name","ksr")

  fetch("https://api.cloudinary.com/v1_1/ksr/image/upload",{
    method:'post',

    body:data
  })
  .then(res=>res.json())
  .then(data=>{
    setUrl(data.url)
  })
  .catch(err=>{
    console.log(err);
  })


}





	return (

<div className='card input-filed'  style={{maxWidth :'580px',margin:'10px auto' ,padding :'20px', textAlign :'center'}}>
<input placeholder='title' type='text' value={title} onChange={(e)=>setTitle(e.target.value)}/>
<input placeholder='body' type='text' value={body} onChange={(e)=>setBody(e.target.value)}/>

<div className="file-field input-field">
      <div className="btn">
        <span>upload image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>

     <button type='submit' className="waves-effect waves-dark btn grey" onClick={()=>postDetails()}>Submit </button>


</div>
		)
}
export default CreatePost;