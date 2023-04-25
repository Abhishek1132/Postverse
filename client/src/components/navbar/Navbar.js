import { BellIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "../../features/auth/authSlice";
import { useRef, useState } from "react";
import { showErrorToast } from "../miscellanious/errorToast";
import { followUser, searchUsers, unFollowUser } from "../../api";
import UserTile from "../users/UserTile";

const Navbar = () => {
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [searchIntID, setSearchIntID] = useState(null);

  const { user, token } = useSelector((store) => store.auth);

  const searchRef = useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleClickMyProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  const handleSearch = async (e) => {
    const { value } = e.target;

    setSearch(value);

    clearInterval(searchIntID);

    const waitTime = 800;

    const intID = setTimeout(async () => {
      try {
        const { data } = await searchUsers({ q: value, token });
        console.log(data);
        setUsers(data);
        onOpen();
      } catch (error) {
        console.log(error);
        showErrorToast(toast, error);
      }
    }, waitTime);

    setSearchIntID(intID);
  };

  const logoutUser = () => {
    toast({
      title: "Logged Out!",
      description: `We hope to see you again, ${user.name}!`,
      status: "info",
      isClosable: true,
    });
    dispatch(handleLogout());
    navigate("/auth");
  };

  const handleFollowUser = async (user) => {
    try {
      await followUser({ userid: user._id, token });
      setUsers(
        users.map((u) => {
          if (u._id === user._id) {
            let updatedu = { ...u };
            updatedu.isFollowing = true;
            return updatedu;
          }
          return u;
        })
      );

      toast({
        description: `Started Following @${user.username}`,
        status: "info",
        isClosable: true,
        position: "bottom-left",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      showErrorToast(toast, error);
    }
  };

  const handleUnfollowUser = async (user) => {
    try {
      await unFollowUser({ userid: user._id, token });
      setUsers(
        users.map((u) => {
          if (u._id === user._id) {
            let updatedu = { ...u };
            updatedu.isFollowing = false;
            return updatedu;
          }
          return u;
        })
      );

      toast({
        description: `Stopped Following @${user.username}`,
        status: "info",
        isClosable: true,
        position: "bottom-left",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      showErrorToast(toast, error);
    }
  };

  return (
    <Box
      borderWidth="thin"
      borderColor={colorMode === "light" ? "lightgrey" : "blackAlpha.800"}
      bg={colorMode === "dark" ? "blackAlpha.700" : "whiteAlpha.900"}
      // m={1}
      p={1}
      px={2}
      borderRadius="sm"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      fontFamily=""
    >
      <Box display="flex">
        <Text
          fontSize={{ base: "3xl" }}
          color={colorMode === "dark" ? "white" : "black"}
          fontFamily="'Pacifico', cursive"
          display={{ base: "none", md: "flex" }}
          mr={5}
        >
          <NavLink to="/home">Postverse</NavLink>
        </Text>

        <Popover
          isOpen={isOpen}
          initialFocusRef={searchRef}
          onOpen={onOpen}
          onClose={onClose}
        >
          <PopoverTrigger>
            <InputGroup mr={2}>
              <Input
                variant="filled"
                mt={1}
                ref={searchRef}
                type="text"
                onChange={handleSearch}
                placeholder="Search..."
              />
              <InputRightElement width="3rem" px="4px" mt={1}>
                <Icon
                  as={SearchIcon}
                  h="1.75rem"
                  size="sm"
                  color={colorMode === "dark" ? "gray" : "black"}
                />
              </InputRightElement>
            </InputGroup>
          </PopoverTrigger>
          <PopoverContent borderRadius="sm">
            <PopoverCloseButton size="md" />
            <PopoverHeader fontWeight="bold">Search People</PopoverHeader>
            <PopoverBody>
              {users === null
                ? "Start typing to search people..."
                : users.length === 0
                ? `No person found for '${search}'!`
                : users.map((u, i) => (
                    <div key={u._id}>
                      <UserTile
                        user={u}
                        handleFollowUser={() => handleFollowUser(u)}
                        handleUnfollowUser={() => handleUnfollowUser(u)}
                      />
                      {i !== users.length - 1 ? <hr /> : ""}
                    </div>
                  ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" gap="3" mr={3}>
          {location.pathname !== "/home" && (
            <NavLink to="/home">
              <Box
                display="flex"
                _hover={{ opacity: ".85" }}
                alignItems="center"
                gap="1"
              >
                <Box>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-house-door-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                  </svg>
                </Box>
                <Text display={{ base: "none", md: "flex" }}>Home</Text>
              </Box>
            </NavLink>
          )}
          {location.pathname !== "/discover" && (
            <NavLink to="/discover">
              <Box
                _hover={{ opacity: ".85" }}
                display="flex"
                alignItems="center"
                gap="1"
              >
                <Box>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-rocket-takeoff-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.578 3.578 0 0 0-.108-.563 2.22 2.22 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2.35 2.35 0 0 0-.16-.045 3.797 3.797 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.552 2.552 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526l.24-2.408Zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361.599.599.437 1.732-.36 2.531Z" />
                    <path d="M5.205 10.787a7.632 7.632 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925Z" />
                  </svg>
                </Box>
                <Text display={{ base: "none", md: "flex" }}>Discover</Text>
              </Box>
            </NavLink>
          )}
        </Box>
        <Tooltip label="Change Appearance">
          <Icon
            as={colorMode === "light" ? MoonIcon : SunIcon}
            padding="9px"
            borderRadius="50%"
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

        <Icon
          as={BellIcon}
          padding="1.5"
          borderRadius="50%"
          size="lg"
          w={9}
          h={9}
        />

        <Menu>
          <MenuButton>
            <Avatar ml={1} size="sm" src={user.profileImage} />
          </MenuButton>
          <MenuList borderRadius="sm" py="0">
            <MenuItem
              display="flex"
              justifyContent="space-between"
              onClick={handleClickMyProfile}
            >
              <span>My Profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                color={colorMode === "dark" ? "white" : "black"}
                className="bi bi-person-lines-fill"
                viewBox="0 0 16 16"
                fill={colorMode === "dark" ? "white" : "black"}
              >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
              </svg>
            </MenuItem>
            <hr />
            <MenuItem
              display="flex"
              justifyContent="space-between"
              onClick={logoutUser}
            >
              <span>Log Out</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-box-arrow-left"
                fill={colorMode === "dark" ? "white" : "black"}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                />
              </svg>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
