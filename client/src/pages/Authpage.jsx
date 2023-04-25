
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../features/auth/authSlice';

import { Box, Container, useColorMode,Icon, Tabs, TabList, Tab, TabPanels, TabPanel, Text, Image, Tooltip } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

import avatarpic from "../assets/pic.webp";

const colors = ["blue", "red"];

const Authpage = () => {
  const [tabIndex,setTabIndex] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {colorMode, toggleColorMode} = useColorMode();
  const {auth} = useSelector((store)=>store);
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const { user, token } = userData;
      if (user && token) {
        if(!auth.user || !auth.token)
          dispatch(handleLogin({ user, token }));
          
        navigate("/home");
        return;
      }
      localStorage.removeItem("userData");
    }
  },[dispatch,navigate])
  return (
    <>{ !localStorage.getItem("userData") &&
    <>
      <Tooltip label="Change Appearance">
      <Icon
        as={colorMode === "light" ? MoonIcon : SunIcon}
        position="absolute"
        right="3"
        padding="1.5"
        borderRadius="50%"
        top="3"
        size="lg"
        w={9}
        h={9}
        transition="all .3s ease-in-out"
        _hover={{
          cursor: "pointer",
          color: colorMode === "light" ? "white" : "black",
          bg: colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.900",
        }}
        onClick={toggleColorMode}
      />
      </Tooltip>
      <Container maxW="95vw" height="96vh"  fontFamily="'Roboto', cursive" display="flex" flexDirection={{base: "column",lg:"row"}} justifyContent={{base:"center",lg:"space-evenly"}}>
        
        <Box
          p={3}
          paddingTop={{base: "0",lg:"75"}}
          w="100%"
          
          m="20px 0 15px 0"
        >
          <Text fontSize={{base: "0",lg:"3xl"}} fontFamily="'Abel', sans-serif" >Create your social universe on,</Text>
          <Text
            fontSize={{base: "4xl",lg:"7xl"}}
            color={
              colorMode === "dark" ? "whiteApha.900" : "blackAlpha.900"
            }
            textShadow={
              "1px 2px 2px " + (colorMode === "light" ? "gray" : "black")
            }
            fontFamily="'Pacifico', cursive"
            marginLeft={{base: 0,lg:"15",xl:"0"}}
            textAlign={{base: "center",lg:""}}
          >
            Postverse
          </Text>
          <Image src={avatarpic} h={{base:"xs",lg:"360px"}} display={{base:"none",lg:"block"}} />
        </Box>
        <Box
          bg={colorMode === "dark" ? "blackAlpha.600" : "white"}
          w={{base:"100%",md:"60%"}}
          p={4}
          borderWidth="thin"
          borderRadius="lg"
          borderColor={colorMode === "light" ? "lightgrey" : "blackAlpha.800"}
          boxShadow="xl"
          margin="auto"
        >
          <Tabs
            isFitted
            variant="line"
            onChange={(index) => setTabIndex(index)}
            colorScheme={colors[tabIndex]}
          >
            <TabList mb=".5rem">
              <Tab borderRadius="6px 6px 0 0" transition="all .2s ease">
                Login
              </Tab>
              <Tab borderRadius="6px 6px 0 0" transition="all .2s ease">
                Sign Up
              </Tab>
            </TabList>
            <TabPanels overflowY="scroll" maxHeight="74vh">
              <TabPanel >
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
      }</>
  )
}

export default Authpage;