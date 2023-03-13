import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const showButtonHoverStyle = {
  opacity: 0.9,
  cursor: "pointer",
};

const Signup = () => {
  const [showpass, setShowpass] = useState(false);
  const [showcpass, setShowcpass] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmpassword] = useState("");
  const [profileImage, setProfileImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShowpass = () => setShowpass(!showpass);
  const handleShowcpass = () => setShowcpass(!showcpass);

  const handleSubmit = async () => {};

  return (
    <form>
      <VStack gap=".3rem">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </FormControl>
        <Tooltip label="Username must be unique!" hasArrow>
          <FormControl title="" isRequired>
            <FormLabel>Username</FormLabel>

            <Input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormControl>
        </Tooltip>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <InputGroup>
            <Input
              type="email"
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              autoComplete="false"
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
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              autoComplete="false"
              type={showcpass ? "text" : "password"}
              placeholder="Enter Confirm Password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              value={cpassword}
            />
            <InputRightElement width="3rem" px="4px">
              <Icon
                as={showcpass ? ViewIcon : ViewOffIcon}
                h="1.75rem"
                size="sm"
                onClick={handleShowcpass}
                _hover={showButtonHoverStyle}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            p={1}
            accept="image/*"
            files={profileImage}
            onChange={(e) => setProfileImage(e.target.files[0])}
            _hover={{ cursor: "pointer" }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText textAlign={"left"}>
            <Text color="red.300">* Required</Text>
          </FormHelperText>
        </FormControl>
        <Button
          colorScheme="red"
          width="100%"
          style={{ marginTop: 20 }}
          isLoading={loading}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default Signup;
