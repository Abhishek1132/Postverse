import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Discoverpage = () => {
  const {user,token} = useSelector((store)=>store.auth)
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user || !token){
      navigate("/");
    }
  },[user,token,navigate])
  return (
    <div>DiscoverPage</div>
  )
}

export default Discoverpage