import type { ModalWithButtonProps } from './ModalWithButton.types.ts';

import { memo, useEffect, useRef } from 'react';
import { GoX } from 'react-icons/go';

import styles from './ModalWithButton.module.css';

function ModalWithButton({ children, isModalOpen, parentClassName, setIsModalOpen }: ModalWithButtonProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => {
    modalRef.current?.close();
    setIsModalOpen(false);
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal)
      return;

    if (isModalOpen && !modal.open) {
      modal.showModal();
    }
    else if (!isModalOpen && modal.open) {
      modal.close();
    }
  }, [isModalOpen]);

  return (
    <dialog
      className={`${styles.dialog} ${parentClassName}`}
      onKeyDown={handleKeydown}
      ref={modalRef}
    >
      <main className={styles.container}>
        <button type="button" title="Close" className={styles.closeButton} onClick={closeModal}>
          <GoX />
        </button>
        {children}
      </main>
    </dialog>
  );
}

export default memo(ModalWithButton);
