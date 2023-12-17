import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PasswordModalSchema = Yup.object().shape({
    newPassword: Yup.string().required('New Password Required').matches(/^[^\s].*[^\s]$/, 'Leading and trailing Spaces are not allowed'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const PasswordModal = ({ isOpen, onClose, onSave }) => {
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: PasswordModalSchema,
        onSubmit: (values) => {
            onSave(values.newPassword, values.confirmPassword);
            onClose()
            formik.resetForm();
        },
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isInvalid={formik.touched.newPassword && formik.errors.newPassword}>
                        <Input
                            placeholder="New Password"
                            type="password"
                            id="newPassword"
                            {...formik.getFieldProps('newPassword')}
                        />
                        <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword} mt={4}>
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme="green" onClick={formik.handleSubmit}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PasswordModal;
