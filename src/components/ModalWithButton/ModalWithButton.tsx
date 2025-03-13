import type { ModalWithButtonProps } from './ModalWithButton.types.ts';

import { memo } from 'react';
import { GoX } from 'react-icons/go';
import Modal from 'react-modal';

import styles from './ModalWithButton.module.css';

function ModalWithButton({ children, customStyles, isModalOpen, setIsModalOpen }: ModalWithButtonProps) {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <main className={styles.container}>
        <button type="button" title="Close" className={styles.closeButton} onClick={closeModal}>
          <GoX />
        </button>
        {children}
      </main>
    </Modal>
  );
}

export default memo(ModalWithButton);
