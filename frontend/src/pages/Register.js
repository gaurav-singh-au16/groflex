// RegisterForm.js
import React, { useState } from 'react';
import { VStack, Flex, Box, Button, FormControl, FormLabel, FormErrorMessage, Input, Radio, RadioGroup, Stack, Select, Image, Center } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const Register = () => {

  const toast = useToast()
  let navigate = useNavigate();
  

  const [previewImage, setPreviewImage] = useState(null)
  const [countries] = useState(['USA', 'Canada', 'UK', 'India']);
  const [states] = useState({
    USA: ['New York', 'California', 'Texas'],
    Canada: ['Ontario', 'Quebec', 'British Columbia'],
    UK: ['England', 'Scotland', 'Wales'],
    India: ['Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
      'Andaman and Nicobar Islands',
      'Chandigarh',
      'Dadra and Nagar Haveli and Daman and Diu',
      'Lakshadweep',
      'Delhi',
      'Puducherry',
    ],
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dob: '',
      country: '',
      state: '',
      city: '',
      zip: '',
      interests: '',
      profilePicture: null,
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required').matches(/^[^\s].*[^\s]$/, 'Leading and trailing Spaces are not allowed'),
      lastName: Yup.string().required('Required').matches(/^[^\s].*[^\s]$/, 'Leading and trailing Spaces are not allowed'),
      city: Yup.string().required('Required').matches(/^[^\s].*[^\s]$/, 'Leading and trailing Spaces are not allowed'),
      zip: Yup.string().required('Required').matches(/^[^\s].*[^\s]$/ && /^\d+$/, 'Numbers are not allowed without space'),
      gender: Yup.string().required('Required'),
      email: Yup.string().required('Required'),
      dob: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      password: Yup.string().required('Required').matches(/^[^\s].*[^\s]$/, 'Leading and trailing Spaces are not allowed'),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      // console.log(values);
      submitHandler(values)
    },
  });

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreviewImage(reader.result);
        resolve(reader.result.split(',')[1]); // Extract the base64 part
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [imageData, setImageData] = useState(null)
  const handleImageChange = (e) => {
    formik.handleChange(e);
    const file = e.target.files[0];

    if (file) {
      convertImageToBase64(file)
      .then((base64Image) => {
        setImageData(base64Image)
      })
      .catch((error) => {
        console.error('Error converting image to base64:', error);
      });
    }
  };

  const submitHandler = async (values) => {

    const userData = {
      first_name: values.firstName,
      last_name: values.lastName,
      gender: values.gender,
      country: values.country,
      state: values.state,
      city: values.city,
      zip: values.zip,
      interest: values.interests,
      email: values.email,
      password: values.password,
      profile_image: imageData,
      dob: values.dob,
    }
    console.log(userData)
    try {
      const res = await axios.post('register', userData);
      if (res.data.success) {
        toast({
          title: 'Registration Successfull.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        navigate('/login');
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
    <Flex bg="gray.100" align="center" justify="center" >
      <Box bg="white" p={6} rounded="md">
        <FormLabel textAlign={'center'}>User Registration</FormLabel>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={1} align="flex-start">
            {previewImage && (
              <Center mt={4}>
                <Image src={previewImage} alt="Profile" boxSize="100px" objectFit="cover"
                  borderRadius='full'
                />
              </Center>
            )}
            <FormControl mt={4} id="profilePicture" isInvalid={formik.touched.profilePicture && formik.errors.profilePicture}>
              <FormLabel>Profile Picture</FormLabel>
              <Input type="file" onChange={handleImageChange} accept=".png, .jpg, .jpeg"/>
            </FormControl>
            {/* First Name */}
            <FormControl id="firstName" isInvalid={formik.touched.firstName && formik.errors.firstName}>
              <FormLabel>First Name*</FormLabel>
              <Input type="text" {...formik.getFieldProps('firstName')} />
              <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
            </FormControl>

            {/* Last Name */}
            <FormControl mt={4} id="lastName" isInvalid={formik.touched.lastName && formik.errors.lastName}>
              <FormLabel>Last Name*</FormLabel>
              <Input type="text" {...formik.getFieldProps('lastName')} />
              <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
            </FormControl>

            {/* email */}
            <FormControl mt={4} id="email" isInvalid={formik.touched.lastName && formik.errors.lastName}>
              <FormLabel>Email*</FormLabel>
              <Input type="email" {...formik.getFieldProps('email')} />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            {/* Gender */}
            <FormControl mt={4} id="gender" isInvalid={formik.touched.gender && formik.errors.gender}>
              <FormLabel>Gender*</FormLabel>
              <RadioGroup
                onChange={(value) => formik.setFieldValue('gender', value)}
                value={formik.values.gender}
              >
                <Stack direction="row">
                  <Radio value="0">Male</Radio>
                  <Radio value="1">Female</Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
            </FormControl>

            {/* DOB */}
            <FormControl mt={4} id="dob" isInvalid={formik.touched.dob && formik.errors.dob}>
              <FormLabel>DOB*</FormLabel>
              <Input type="date" {...formik.getFieldProps('dob')} />
              <FormErrorMessage>{formik.errors.dob}</FormErrorMessage>
            </FormControl>

            {/* Country */}
            <FormControl mt={4} id="country" isInvalid={formik.touched.country && formik.errors.country}>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select a country"
                onChange={(e) => formik.setFieldValue('country', e.target.value)}
                value={formik.values.country}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
            </FormControl>

            {/* State */}
            <FormControl mt={4} id="state" isInvalid={formik.touched.state && formik.errors.state}>
              <FormLabel>State</FormLabel>
              <Select
                placeholder="Select a state"
                onChange={(e) => formik.setFieldValue('state', e.target.value)}
                value={formik.values.state}
              >
                {states[formik.values.country]?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
            </FormControl>

            {/* City */}
            <FormControl mt={4} id="city" isInvalid={formik.touched.city && formik.errors.city}>
              <FormLabel>City*</FormLabel>
              <Input type="text" {...formik.getFieldProps('city')} />
              <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
            </FormControl>

            {/* Zip */}
            <FormControl mt={4} id="zip" isInvalid={formik.touched.zip && formik.errors.zip}>
              <FormLabel>Zip*</FormLabel>
              <Input type="text" {...formik.getFieldProps('zip')} />
              <FormErrorMessage>{formik.errors.zip}</FormErrorMessage>
            </FormControl>

            {/* Interests */}
            <FormControl mt={4} id="interests" isInvalid={formik.touched.interests && formik.errors.interests}>
              <FormLabel>Area of Interest</FormLabel>
              <RadioGroup
                onChange={(value) => formik.setFieldValue('interests', value)}
                value={formik.values.interests}
              >
                <Stack direction="row">
                  <Radio value="0">Reading</Radio>
                  <Radio value="1">Writing</Radio>
                  <Radio value="2">Traveling</Radio>
                  <Radio value="3">Playing</Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{formik.errors.interests}</FormErrorMessage>
            </FormControl>

            {/* Password */}
            <FormControl mt={4} id="password" isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel>Password*</FormLabel>
              <Input type="password" {...formik.getFieldProps('password')} />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            {/* Submit Button */}
            <Button mt={4} colorScheme="teal" type="submit">
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
