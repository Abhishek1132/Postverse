import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { AddIcon, MinusIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../../api";
import { showErrorToast } from "../miscellanious/errorToast";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../features/auth/authSlice";

const showButtonHoverStyle = {
  opacity: 0.9,
  cursor: "pointer",
};

const countriesList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic (CAR)",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Democratic Republic of the Congo",
  "Republic of the Congo",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia (FYROM)",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste (East Timor)",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (UAE)",
  "United Kingdom (UK)",
  "United States of America (USA)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City (Holy See)",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Signup = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
    occupation: "",
    gender: "",
    country: "",
    relationshipStatus: "",
  });
  const [profileImage, setProfileImage] = useState([]);

  const [showpass, setShowpass] = useState(false);
  const [showcpass, setShowcpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleShowpass = () => setShowpass(!showpass);
  const handleShowcpass = () => setShowcpass(!showcpass);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const { data } = await registerUser({ ...userInput, profileImage });
      console.log(data);
      dispatch(handleLogin({ user: data.user, token: data.token }));
      toast({
        title: "Sign Up Successful!",
        description: `Welcome to Postverse, ${data.user.name}!`,
        duration: 3000,
        status: "success",
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({ user: data.user, token: data.token })
      );
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
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleInput}
            value={userInput.name}
          />
        </FormControl>
        <Tooltip label="Username must be unique!" hasArrow>
          <FormControl title="" isRequired>
            <FormLabel>Username</FormLabel>

            <Input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleInput}
              value={userInput.username}
            />
          </FormControl>
        </Tooltip>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={handleInput}
              value={userInput.email}
              isRequired
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={showpass ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              autoComplete="false"
              onChange={handleInput}
              value={userInput.password}
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
              name="cpassword"
              placeholder="Enter Confirm Password"
              onChange={handleInput}
              value={userInput.cpassword}
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
        <Accordion width="100%" allowToggle>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <Tooltip label="Additional details can be filled later on as well.">
                  <AccordionButton
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="bold">Additional Details (Optional)</Text>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </Tooltip>
                <AccordionPanel pb={4} px="1">
                  <VStack gap=".3rem">
                    <FormControl>
                      <FormLabel>Occupation</FormLabel>
                      <Input
                        type="text"
                        name="occupation"
                        placeholder="Enter Occupation"
                        value={userInput.occupation}
                        onChange={handleInput}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        placeholder="Select Gender"
                        name="gender"
                        value={userInput.gender}
                        onChange={handleInput}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                        <option value="Prefer Not to Say">
                          Prefer Not to Say
                        </option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Relationship Status</FormLabel>
                      <Select
                        placeholder="Select Relationship Status"
                        name="relationshipStatus"
                        value={userInput.relationshipStatus}
                        onChange={handleInput}
                      >
                        <option value="Single">Single</option>
                        <option value="In a Relationship">
                          In a Relationship
                        </option>
                        <option value="Married">Married</option>
                        <option value="Complicated">Complicated</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Country</FormLabel>
                      <Select
                        placeholder="Select Country"
                        name="country"
                        value={userInput.country}
                        onChange={handleInput}
                      >
                        {countriesList.map((country, index) => {
                          return (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </VStack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
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
