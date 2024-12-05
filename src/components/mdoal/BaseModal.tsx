import React from 'react';
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import RedButton from '../button/RedButton';

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onRequestClose: () => void;
    style: ReactModal.Styles;
}

export default function BaseModal({
    children,
    isOpen,
    onRequestClose,
    style,
}: ModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            style={style}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
        >
            <div className="flex flex-col gap-10">
                {children}
                <RedButton onClick={onRequestClose}>닫기</RedButton>
            </div>
        </Modal>
    );
}
