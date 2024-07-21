// Modal.jsx
import { useState } from 'react';

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button data-testid="toggleModalButton" onClick={toggleModal}>{isOpen ? 'Close Modal' : 'Open Modal'}</button>
      {isOpen && (
        <div role="dialog">
          <p>This is a modal window</p>
          <button data-testid="closeModalButton" onClick={toggleModal}>Close</button>
        </div>
      )}
    </div>
  );
};
