import React from 'react';
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import RedButton from '../button/RedButton';
import './BaseRoomMateModal.css';

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onRequestClose: () => void;
}

export default function BaseModal({
    children,
    isOpen,
    onRequestClose,
}: ModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            overlayClassName="modal-overlay"
            className="modal-content"
            onRequestClose={onRequestClose}
            ariaHideApp={false}
        >
            <div className="flex flex-col gap-10 h-full justify-between">
                {children}
                <RedButton onClick={onRequestClose}>닫기</RedButton>
            </div>
        </Modal>
    );
}
