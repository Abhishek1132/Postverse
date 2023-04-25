import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Box, useToast } from "@chakra-ui/react";
import { showErrorToast } from "../components/miscellanious/errorToast";
import { getUserProfile } from "../api";
import { setProfileUser } from "../features/profile/profileSlice";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfilePosts from "../components/profile/ProfilePosts";
import ProfileSidebar from "../components/profile/ProfileSidebar";

const getProfileName = (location)=>{
  const pathnameArr = location.pathname.split("/");

  return pathnameArr[pathnameArr.length - 1];
}

const Profilepage = () => {

  const [isLoading, setIsLoading] = useState(true);

  const {user,token} = useSelector((store)=>store.auth)
  const {profileUser} = useSelector(store=> store.profile)

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const profileName = getProfileName(location);

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(()=>{
    if(token){
      const fetchProfileData = async()=>{

        setIsLoading(true);
        try {
          const {data} = await getUserProfile({username: profileName, token});
          console.log(data);
          dispatch(setProfileUser({user:data}))
        } catch (error) {
          console.log(error);
          showErrorToast(toast,error);
        }
        setIsLoading(false);
      }

      fetchProfileData();
    }
  },[token,profileName,toast,dispatch])

  return (
    <>{ (localStorage.getItem("userData") && user && token) &&
        <>
        <Navbar />
        {!isLoading ? 
          <Box margin="2">
            {profileUser ?
            <>
              <ProfileDetails />
              <ProfilePosts />
              <ProfileSidebar />
            </> : <Box>Invalid Username!</Box>
            }
          </Box>
          :
          <Box>Loading Profile...</Box>
        }
        </>
      }
    </>
  )
}

export default Profilepage