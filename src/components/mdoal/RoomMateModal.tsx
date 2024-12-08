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
        >
            <CreateMyRoomMate
                isEdit={isEdit}
                selectedRoom={selectedRoom}
                setModalOpen={setModalOpen}
            />
        </BaseModal>
    );
}
