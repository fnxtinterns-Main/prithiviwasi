import React, { createContext, useContext, useState, useCallback } from 'react';
import registrationData from '../data/registration.json';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [activeOrgKey, setActiveOrgKey] = useState('prithiviwasi');

  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const openRegModal = useCallback((orgKey = 'prithiviwasi') => {
    setActiveOrgKey(orgKey);
    setIsRegModalOpen(true);
  }, []);

  const closeRegModal = useCallback(() => {
    setIsRegModalOpen(false);
  }, []);

  const openDonateModal = useCallback(() => {
    setIsDonateModalOpen(true);
  }, []);

  const closeDonateModal = useCallback(() => {
    setIsDonateModalOpen(false);
  }, []);

  const currentOrgData = registrationData[activeOrgKey] || registrationData.prithiviwasi;

  return (
    <ModalContext.Provider
      value={{
        isRegModalOpen,
        activeOrgKey,
        currentOrgData,
        openRegModal,
        closeRegModal,
        isDonateModalOpen,
        openDonateModal,
        closeDonateModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
