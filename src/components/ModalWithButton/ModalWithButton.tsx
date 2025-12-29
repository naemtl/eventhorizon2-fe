import type { ModalWithButtonProps } from './ModalWithButton.types.ts';

import { useRouter } from '@tanstack/react-router';
import { memo, useCallback, useEffect, useRef } from 'react';
import { GoX } from 'react-icons/go';

import styles from './ModalWithButton.module.css';

function ModalWithButton({ children, isModalOpen, parentClassName, setIsModalOpen }: ModalWithButtonProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = useCallback(
    () => {
      modalRef.current?.close();
      setIsModalOpen(false);
      router.navigate({ to: '/', hash: '', replace: true });
    },
    [setIsModalOpen, router],
  );

  const handleKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLDialogElement>) => {
      if (event.keyCode === 27 || event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  const handleClickOutside
    = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
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
      onClick={handleClickOutside}
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
