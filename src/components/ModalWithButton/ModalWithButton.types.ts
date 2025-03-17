import type React from 'react';

interface ModalWithButtonProps {
  children: React.ReactNode;
  insetValue: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { ModalWithButtonProps };
