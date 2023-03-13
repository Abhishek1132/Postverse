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

const showButtonHoverStyle = {
  opacity: 0.9,
  cursor: "pointer",
};

const Login = () => {
  const [showpass, setShowpass] = useState(false);
  const [email_username, setEmail_username] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleShowpass = () => setShowpass(!showpass);

  const handleSubmit = async () => {};
  const handleGuestLogin = async () => {};

  return (
    <form>
      <VStack gap=".3rem">
        <FormControl isRequired>
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
        <FormControl isRequired>
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
