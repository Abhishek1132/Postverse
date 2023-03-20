import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {

  const {user,token} = useSelector((store)=>store.auth)
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user || !token){
      navigate("/");
    }
  },[user,token,navigate])
  return (
    <div>
      Homepage
      <br />
      <Link to="/discover" >Discover Page</Link>
    </div>
  )
}

export default Homepage