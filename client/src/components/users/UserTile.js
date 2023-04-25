import { Avatar, Box, Button, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserTile = ({ user, handleFollowUser, handleUnfollowUser }) => {
  const navigate = useNavigate();

  const handleClickUserTile = () => {
    navigate(`/profile/${user.username}`);
  };

  return (
    <Box display="flex" alignItems="center" gap="3" my={1} p={1}>
      <Box
        _hover={{
          cursor: "pointer",
        }}
        onClick={handleClickUserTile}
      >
        <Avatar size="md" src={user.profileImage} />
      </Box>
      <Box display="flex" flexDirection="column" flexGrow="2">
        <Box
          display="flex"
          overflowX="clip"
          gap="1"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          maxW="90%"
        >
          <Tooltip label="Open Profile" placement="top">
            <Text
              fontWeight="bold"
              _hover={{
                cursor: "pointer",
              }}
              onClick={handleClickUserTile}
            >
              {user.username}
            </Text>
          </Tooltip>
          <Tooltip label={user.name} placement="right">
            <Text
              fontSize="sm"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              my="auto"
            >
              {" "}
              - {user.name}
            </Text>
          </Tooltip>
        </Box>
        <Box display="flex">
          <Tooltip label={user.email} placement="left">
            <Text
              maxW="72%"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontSize="small"
            >
              {user.email}
              <br />
              {user.isFollower ? "Following You" : ""}
            </Text>
          </Tooltip>
          <Box ml="auto" w="20%">
            {user.isFollowing ? (
              <Tooltip label="Unfollow" placement="right">
                <Button p={1} color="red.400" onClick={handleUnfollowUser}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    fill="currentColor"
                    className="bi bi-person-dash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                    />
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </Button>
              </Tooltip>
            ) : (
              <Tooltip label="Follow" placement="right">
                <Button p={1} color="blue.600" onClick={handleFollowUser}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    fill="currentColor"
                    className="bi bi-person-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path
                      fillRule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserTile;
