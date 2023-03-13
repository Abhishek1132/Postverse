import { Box, Container, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../features/auth/authSlice";

const Authentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const { user, token } = userData;
      if (user && token) {
        dispatch(handleLogin({ user, token }));
        return navigate("/home");
      }
    }
    localStorage.removeItem("userData");
    navigate("/auth");
  }, [navigate, dispatch]);
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
        <Text fontSize={"xl"}>Authenticating...</Text>
      </Box>
    </Container>
  );
};

export default Authentication;
