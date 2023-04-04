import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
    }
  }, []);
  return (
    <>{ localStorage.getItem("userData") &&
    <div>
      Homepage
      <br />
      <Link to="/discover" style={{color:"royalblue",textDecoration:"underline"}} >Go to Discover Page</Link>
      <br />
      <Link to="/profile" style={{color:"royalblue",textDecoration:"underline"}} >Go to Profile Page</Link>
    </div>
    }
    </>
  )
}

export default Homepage