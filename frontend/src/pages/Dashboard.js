import React from 'react'
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
} from '@chakra-ui/react'

const Dashboard = () => {
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray'>
        <TableCaption>Groflex</TableCaption>
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Gender</Th>
            <Th>Date of Birth</Th>
            <Th>Country</Th>
            <Th>State</Th>
            <Th>City</Th>
            <Th>Zip</Th>
            <Th>Interest</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td >25.4</Td>
            <Td >25.4</Td>
            <Td >25.4</Td>
            <Td >25.4</Td>
            <Td >25.4</Td>
            <Td >25.4</Td>
            <Td >25.4</Td>
          </Tr>
        
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Dashboard

