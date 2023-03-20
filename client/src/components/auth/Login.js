import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import { showErrorToast } from "./../miscellanious/errorToast";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../features/auth/authSlice";

const showButtonHoverStyle = {
  opacity: 0.9,
  cursor: "pointer",
};

const Login = () => {
  const [email_username, setEmail_username] = useState("");
  const [password, setPassword] = useState("");

  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleShowpass = () => setShowpass(!showpass);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await loginUser({ email_username, password });
      console.log(data);
      dispatch(handleLogin({ user: data.user, token: data.token }));
      localStorage.setItem(
        "userData",
        JSON.stringify({ user: data.user, token: data.token })
      );
      toast({
        title: "Log In Successful!",
        description: `Welcome Again, ${data.user.name}!`,
        duration: 3000,
        status: "success",
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
      showErrorToast(toast, error);
    }

    setLoading(false);
  };
  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const { data } = await loginUser({
        email_username: "guest",
        password: "guest@123",
      });
      console.log(data);
      dispatch(handleLogin({ user: data.user, token: data.token }));
      localStorage.setItem(
        "userData",
        JSON.stringify({ user: data.user, token: data.token })
      );
      toast({
        title: "Guest Login Successful!",
        description: `Welcome Guest User. This account is only for demo purposes!`,
        duration: 3000,
        status: "success",
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
      showErrorToast(toast, error);
    }

    setLoading(false);
  };

  return (
    <form>
      <VStack gap=".3rem">
        <FormControl autoComplete="true" isRequired>
          <FormLabel>Email/Username</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Enter Email Address or Username"
              onChange={(e) => setEmail_username(e.target.value)}
              autoComplete="true"
              value={email_username}
              isRequired
            />
          </InputGroup>
        </FormControl>
        <FormControl autoComplete="true" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={showpass ? "text" : "password"}
              placeholder="Enter Password"
              autoComplete="true"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputRightElement width="3rem" px="4px">
              <Icon
                as={showpass ? ViewIcon : ViewOffIcon}
                h="1.75rem"
                size="sm"
                onClick={handleShowpass}
                _hover={showButtonHoverStyle}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormHelperText textAlign="left">
            <Text color="red.300">* Required</Text>
          </FormHelperText>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 20 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Log In
        </Button>
        <Button width="100%" onClick={handleGuestLogin} isLoading={loading}>
          Login as Guest
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
