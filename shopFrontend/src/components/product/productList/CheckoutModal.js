import React, { useState } from 'react';
import './CheckoutModal.scss';

const CheckoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Modal Title</h2>
        <p>This is the content of the modal.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CheckoutModal;