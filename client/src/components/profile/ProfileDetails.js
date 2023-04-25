import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const { profileUser } = useSelector((store) => store.profile);

  return (
    <Box minWidth="250px" width="25%">
      <Box display="flex" alignItems="center" marginBottom="2">
        <Avatar src={profileUser.profileImage} marginRight={2} size="lg" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {profileUser.name}
          </Text>
          <Text fontSize="sm" marginLeft={2}>
            @{profileUser.username}
          </Text>
          <Text>
            {profileUser.followers.length} follower
            {profileUser.followers.length > 1 && "s"}
          </Text>
        </Box>
      </Box>
      <hr />
      <Box
        marginTop={1}
        fontSize="sm"
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <Text>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {profileUser.email}
        </Text>
        {profileUser.phone && (
          <Text>
            <span style={{ fontWeight: "bold" }}>Phone: </span>
            {profileUser.phone}
          </Text>
        )}
        <Text>
          <span style={{ fontWeight: "bold" }}>Gender: </span>
          {profileUser.gender ? profileUser.gender : "Not Provided"}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>Country: </span>
          {profileUser.country ? profileUser.country : "Not Provided"}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>Occupation: </span>
          {profileUser.occupation ? profileUser.occupation : "No Occupation"}
        </Text>
        {profileUser.relationshipStatus && (
          <Text>
            <span style={{ fontWeight: "bold" }}>Relationship Status: </span>
            {profileUser.relationshipStatus}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ProfileDetails;
