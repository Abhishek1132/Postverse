import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const {user,token} = useSelector((store)=>store.auth)
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>{ (localStorage.getItem("userData") && user && token) &&
    <>
      <Navbar />
      <Box>
        Homepage
      </Box>
    </>
    }
    </>
  )
}

export default Homepage