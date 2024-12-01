// Modal.tsx
import React from 'react';
import './Modal.css'

interface ModalProps {
    message: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-message">
                    {message}
                </div>
                <button onClick={onClose} className="modal-close-button">Close</button>
            </div>
        </div>
    );
};

export default Modal;
