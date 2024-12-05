import ReactModal from 'react-modal';
import BaseModal from './BaseModal';
import CreateMyRoomMate from '../myRoomMateGroup/CreateMyRoomMate';
import { RoomMateData } from '../myRoomMateGroup/CreateMyRoomMate';

interface RoomMateModalProps {
    modalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    isEdit?: boolean;
    selectedRoom?: RoomMateData;
}

const roomMateModalStyles: ReactModal.Styles = {
    overlay: {
        backgroundColor: ' rgba(0, 0, 0, 0.6)',
        width: '100%',
        height: '100vh',
        zIndex: '10',
        position: 'fixed',
        top: '0',
        left: '0',
    },
    content: {
        width: '80%',
        height: '80%',
        zIndex: '11',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255)',
    },
};

export default function RoomMateModal({
    modalOpen,
    setModalOpen,
    isEdit,
    selectedRoom,
}: RoomMateModalProps) {
    return (
        <BaseModal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            style={roomMateModalStyles}
        >
            <CreateMyRoomMate
                isEdit={isEdit}
                selectedRoom={selectedRoom}
                setModalOpen={setModalOpen}
            />
        </BaseModal>
    );
}
