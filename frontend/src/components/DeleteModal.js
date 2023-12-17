import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {

    


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Item</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this item?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={onDelete}>Delete</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteModal;
