import { useState } from 'react';
import RoomMateModal from '../components/mdoal/RoomMateModal';
import EdgeButton from '../components/button/EdgeButton';
import GetMyRoomMate from '../components/myRoomMateGroup/getMyRoomMate';

export default function MyRoomMate() {
    const [modalOpen, setModalOpen] = useState(false);

    const modalClick = () => {
        setModalOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="ml-auto">
                    <EdgeButton onClick={modalClick}>등록하기</EdgeButton>
                </div>
                <GetMyRoomMate />
            </div>

            <RoomMateModal
                modalOpen={modalOpen}
                setModalOpen={() => setModalOpen(false)}
            />
        </div>
    );
}
