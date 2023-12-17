// Navbar.js
import React from 'react';
import { Box, Flex, Spacer, Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/action/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Flex p="4" bg="teal.500" color="white">
            <Box>
                <Text fontSize="xl" fontWeight="bold">
                    Groflex
                </Text>
            </Box>
            <Spacer />
            {isAuthenticated ? (
                <Flex align="center">
                    <Button onClick={handleLogout} variant="button">
                        Logout
                    </Button>
                </Flex>
            ) : null}
        </Flex>
    );
};

export default Navbar;
