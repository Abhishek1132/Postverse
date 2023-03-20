import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profilepage = () => {
  const {user,token} = useSelector((store)=>store.auth)
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user || !token){
      navigate("/");
    }
  },[user,token,navigate])
  return (
    <div>Profilepage</div>
  )
}

export default Profilepage