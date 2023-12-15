import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import { useState } from "react";

const Login = () => {

  const toast = useToast()
  let navigate = useNavigate();
  const [resetModal, setResetModal] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginHandler(values);
    }
  });

  const loginHandler = async (value) => {
    try {
      const res = await axios.post('login', value);
      if (res.data.success) {
        toast({
          title: 'Login Successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      // alert('Error');
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
    })
    }
  }

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </FormControl>
            {formik.touched.email && formik.errors.email && (
                <Text fontSize='sm' color={'red'}>{formik.errors.email}</Text>
            )}

            <FormControl isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </FormControl>
            {formik.touched.password && formik.errors.password && (
              <Text fontSize='sm' color={'red'}>{formik.errors.password}</Text>
            )}

            <Button type="submit" colorScheme="purple" width="full">
              Login
            </Button>
          </VStack>
          <div>
          <Link float={'left'} mt={'5'} color={'#093447'} onClick={()=>setResetModal(true)}>Reset Password</Link>
          <Link float={'right'} mt={'5'} color={'#093447'} onClick={()=>navigate("/register")}>Register</Link>
          </div>
        </form>
        <ForgotPassword openModal={resetModal} onClose={()=>setResetModal(false)}/>
      </Box>
    </Flex>
  );
}

export default Login;
