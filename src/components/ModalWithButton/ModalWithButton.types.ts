import type React from 'react';

interface ModalWithButtonProps {
  children: React.ReactNode;
  customStyles: object;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { ModalWithButtonProps };
