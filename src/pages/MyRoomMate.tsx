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
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 justify-between items-center sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2">등록한 나의 룸메이트 정보</p>
                        <p className="text-sm text-gray-400">
                            룸메이트 신청은 우리 학교 기숙사 홈페이지에서 따로
                            신청을 하셔야 해요!
                        </p>
                    </div>
                    <div className="">
                        <EdgeButton onClick={modalClick}>등록하기</EdgeButton>
                    </div>
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
