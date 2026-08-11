import React, { createContext, useContext, useState, useCallback } from 'react';
import TrialModal from './TrialModal';

const TrialModalContext = createContext({
  isModalOpen: false,
  openTrialModal: () => {},
  closeTrialModal: () => {},
});

export function TrialModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTrialModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeTrialModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <TrialModalContext.Provider value={{ isModalOpen, openTrialModal, closeTrialModal }}>
      {children}
      <TrialModal isOpen={isModalOpen} onClose={closeTrialModal} />
    </TrialModalContext.Provider>
  );
}

export function useTrialModal() {
  const context = useContext(TrialModalContext);
  if (!context) {
    throw new Error('useTrialModal must be used within a TrialModalProvider');
  }
  return context;
}
