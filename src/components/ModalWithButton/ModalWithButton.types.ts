import type React from 'react';

interface ModalWithButtonProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  parentClassName: string | undefined;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { ModalWithButtonProps };
