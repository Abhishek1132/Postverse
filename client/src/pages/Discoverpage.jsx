import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

const Discoverpage = () => {
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
          Discover
        </Box>
        </>
      }
    </>
  )
}

export default Discoverpage