import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    FormLabel,
    FormControl,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from '@chakra-ui/react'

function ForgotPassword(props) {

    const toast = useToast()

    const handleClose = () => {
        formik.resetForm();
        if (props.onClose) {
            props.onClose();
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is Required"),
        password: Yup.string().required('Password is Required').matches(/^[^\s].*[^\s]$/, 'Leading and trailing Spaces are not allowed'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is Required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            resetHandler(values)
        },
    });

    const resetHandler = async (value) => {
        try {
            const res = await axios.put('forgot-password', value);
            if (res.data.success) {
                toast({
                    title: 'Password Reset Successfully.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                handleClose();
            }
        } catch (error) {
            // console.log(error)
            toast({
                title: error.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Modal isOpen={props.openModal} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reset Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
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
                            <Text fontSize="sm" color={"red"}>
                                {formik.errors.email}
                            </Text>
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
                            <Text fontSize="sm" color={"red"}>
                                {formik.errors.password}
                            </Text>
                        )}

                        <FormControl
                            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        >
                            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                variant="filled"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />
                        </FormControl>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <Text fontSize="sm" color={"red"}>
                                {formik.errors.confirmPassword}
                            </Text>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
                            Reset
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ForgotPassword;
