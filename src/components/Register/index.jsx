import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register ({ onRegisterSuccess }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState(''); // State for the Name field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    try {
      // You might need to adjust your API call to include the 'Name' field if necessary
      const response = await axios.post('http://localhost:5000/users', {
        Name: name, // Include the name in your API request if needed
        Email: email,
        Password: password,
      });

      if (response.status === 200 ) {
        onRegisterSuccess();
        navigate('/signin');
        toast({
          title: 'Register successful.',
          description: "You're now logged in.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Failed to register. Please try again later.');
    }
  };

  return (
    <ChakraProvider>
      <Box p={8} maxWidth="500px" mx="auto">
        <Heading as="h1" mb={6} textAlign="center">
          ลงบัญชีผู้ใช้ใหม่
        </Heading>
        {error && (
          <Alert status="error" mb={6}>
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription display="block">{error}</AlertDescription>
            </Box>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError('')} />
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            {/* Name field */}
            <FormControl id="name">
              <FormLabel>ชื่อผู้ใช้</FormLabel>
              <Input
                type="text"
                placeholder="ชื่อผู้ใช้"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            {/* Email field */}
            <FormControl id="email">
              <FormLabel>อีเมล</FormLabel>
              <Input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* Password field */}
            <FormControl id="password">
              <FormLabel>รหัสผ่าน</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="รหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Submit button */}
            <Button colorScheme="blue" type="submit" width="full">
              ลงทะเบียน
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  );
}

Register.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default Register;
