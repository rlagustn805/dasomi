import { useState } from 'react';
import RoomMateModal from '../components/mdoal/RoomMateModal';
import EdgeButton from '../components/button/EdgeButton';
import GetMyRoomMate from '../components/myRoomMateGroup/GetMyRoomMate';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function MyRoomMate() {
    const [modalOpen, setModalOpen] = useState(false);

    const { token } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            alert('권한이 없습니다.');
            navigate('/');
        }
    }, [token]);

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
