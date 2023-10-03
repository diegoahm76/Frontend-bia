/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useCallback } from 'react';

// ! Js -docs
/**
 * Custom hook to manage modal and loading states.
 *
 * @param {string} modalName - The name of the modal state.
 * @param {string} loadingButtonName - The name of the loading state.
 *
 * @returns {object} - An object containing the modal and loading states, and functions to manipulate these states.
 * The returned object has the following structure:
 * {
 *   [modalName]: boolean,
 *   [loadingButtonName]: boolean,
 *   openModal: function,
 *   closeModal: function,
 *   startLoading: function,
 *   stopLoading: function
 * }
 */
export const useModalAndLoading = (modalName: string, loadingButtonName: string) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ! I could add more states here if needed

 const handleModal = useCallback((value: boolean) => {
    setIsModalOpen(value);
  }, []);


  const handleLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);


  return {
    [modalName]: isModalOpen,
    [loadingButtonName]: isLoading,
    handleModal,
    handleLoading,

    // ! I could add more states and functions here if needed
  };
};


// ! How can I use this hook?
// ? Example 1
/*
 const { isModalOpen, openModal, closeModal, isLoading, startLoading, stopLoading } = useModalAndLoading('myModal', 'myLoadingButton');
1. Import the hook
import { useModalAndLoading } from 'path/to/useModalAndLoading';
2. Call the hook
 const { myModal, myLoadingButton, openModal, closeModal, startLoading, stopLoading } = useModalAndLoading('myModal', 'myLoadingButton');
 -- you establish the name of the states and functions
3. Use the states and functions
<Modal isOpen={myModal} onClose={closeModal}>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
</Modal>

*/