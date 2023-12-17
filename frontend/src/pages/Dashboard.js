import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaLock } from 'react-icons/fa';
import axios from 'axios';
import DeleteModal from '../components/DeleteModal';
import { useToast } from '@chakra-ui/react'
import PasswordModal from '../components/PasswordModal';
import EditModal from '../components/EditModal';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const toast = useToast()
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  // const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const itemsPerPage = 5;

  const fetchData =  useCallback(async() => {
    try {
      const response = await axios.get(`users?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },[currentPage, token]);

  useEffect(() => {
    fetchData()
  }, [currentPage, fetchData]);

  const handleDelete = async () => {

    try {
      const response = await axios.delete(`delete-user/${selectedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        fetchData()
        toast({
          title: 'User Deleted Successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsDeleteModalOpen(false);
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
  };

  const handleEditModal = (user) => {
    // console.log(user)
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  }

  const handleChangePassword = (user) => {
    setSelectedUser(user)
    setIsPasswordModalOpen(true);
  };

  const handleEdit = async (userData) => {
    console.log("calling from dash", userData)
    try {
      const res = await axios.put('update-user', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast({
          title: 'User Update Successfull.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        fetchData()
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleSavePassword = async (newPassword, confirmPassword) => {
    try {
      const response = await axios.put(`forgot-password`, { email: selectedUser.email, password: confirmPassword });
      if (response.data.success) {
        fetchData()
        toast({
          title: 'User Password Changed Successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsPasswordModalOpen(false);
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
  };





  return (
    <>
      <Navbar />
      <VStack margin={6}>
        <TableContainer>
          <Table variant='striped' colorScheme='gray'>
            <TableCaption>Groflex</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Gender</Th>
                <Th>Date of Birth</Th>
                <Th>State City & Country</Th>
                <Th>Zip</Th>
                <Th>Interest</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.first_name + ' ' + item.last_name}</Td>
                  <Td>{item.gender === 0 ? 'Male' : 'Female'}</Td>
                  <Td>{item.dob}</Td>
                  <Td>{item.city + ', ' + item.state + ', ' + item.country}</Td>
                  <Td>{item.zip}</Td>
                  <Td>{item.interest === 0 ? 'Reading' : item.interest === 1 ? 'Writing' : item.interest === 2 ? 'Travelling' : item.interest === 3 ? 'Playing' : ''}</Td>
                  <Td>
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme='blue'
                      // onClick={() => handleEdit(item)}
                      onClick={() => handleEditModal(item)}
                      mr={2}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme='red'
                      onClick={() => handleDeleteModal(item)}
                      mr={2}
                    />
                    <IconButton
                      icon={<FaLock />}
                      colorScheme='purple'
                      onClick={() => handleChangePassword(item)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan='11'>
                  <Button
                    onClick={()=>setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={()=>setCurrentPage((prev) => prev + 1)}
                    disabled={data.length < itemsPerPage}
                  >
                    Next
                  </Button>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            userData={selectedUser}
            onSave={handleEdit}
          />
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            userData={selectedUser}
            onDelete={handleDelete}
          />
          <PasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            userData={selectedUser}
            onSave={handleSavePassword}
          />

        </TableContainer>
      </VStack>
    </>
  );
};

export default Dashboard;
