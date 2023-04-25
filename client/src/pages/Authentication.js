import { Box, Container, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleLogout } from "../features/auth/authSlice";

const Authentication = () => {
  const { auth } = useSelector((store) => store);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const { user, token } = userData;
      if (user && token) {
        if (!auth.user || !auth.token) dispatch(handleLogin({ user, token }));
        navigate("/home");
        return;
      }
      localStorage.removeItem("userData");
    }
    dispatch(handleLogout());
    navigate("/auth");
  }, [dispatch, navigate]);
  return (
    <Container
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          color="blue.500"
          size="xl"
          marginBottom="5"
        />
        <Text fontSize={"xl"}>Loading...</Text>
      </Box>
    </Container>
  );
};

export default Authentication;
