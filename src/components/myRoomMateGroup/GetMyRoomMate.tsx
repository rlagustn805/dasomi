import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import Loading from '../Loading';
import EdgeButton from '../button/EdgeButton';
import RedButton from '../button/RedButton';
import RoomMateModal from '../mdoal/RoomMateModal';
import { useState } from 'react';
import { RoomMateData, RoomMateProps } from './CreateMyRoomMate';
import axios from 'axios';

export default function GetMyRoomMate() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<RoomMateData>();

    const modalClick = (data: RoomMateData) => {
        setModalOpen(true);
        setSelectedRoom(data);
    };

    const getMyRoomMate = async (): Promise<RoomMateData[]> => {
        const res = await api.get('api/roommate/me');
        return res.data;
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['myRoomMate'],
        queryFn: getMyRoomMate,
        staleTime: Infinity,
        gcTime: Infinity,
        retry: false,
    });

    const deleteMyRoomMate = async (room_id: number) => {
        let isConfirm = confirm('정말로 삭제하시겠습니까?');

        if (!isConfirm) {
            return Promise.reject();
        }

        const res = await api.delete('/api/roommate/me', {
            data: { room_id },
        });
        return res.data;
    };

    const queryClient = useQueryClient();

    const { mutate: deleteMyRoommate, isPending } = useMutation({
        mutationFn: deleteMyRoomMate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myRoomMate'] });
            alert('정상적으로 삭제하였습니다.');
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err.response?.data.message));
            }
        },
    });

    if (isLoading) return <Loading />;
    // if (isLoading) return <div>로딩중</div>;

    if (isError && error instanceof Error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return <div>등록된 나의 룸메이트 정보가 없어요!</div>;
        }

        return <div>에러 발생: {error.message}</div>;
    }

    return (
        <div>
            <p className="mb-2">등록한 나의 룸메이트</p>
            <div className="flex flex-col gap-5 bg-gray-100 p-4 rounded-xl lg:flex-row">
                {data?.map((roomMate, index: number) => (
                    <div
                        key={index}
                        className="flex flex-col px-4 py-2 gap-2 flex-1 bg-white rounded-xl shadow-lg justify-between h-full"
                    >
                        <span className="text-lg border-b-2">
                            {roomMate.dormitory} {roomMate.person_room}인실
                        </span>
                        <span>
                            룸메님{' '}
                            {roomMate.friendly === 1 ? '친해져요' : '갠플해요'}
                        </span>
                        <span>
                            실내취식{' '}
                            {roomMate.indoor_eating === 1 ? '가능' : '불가능'}
                        </span>
                        <span>
                            청결도{' '}
                            {roomMate.cleanliness === 'low'
                                ? '하'
                                : roomMate.cleanliness === 'medium'
                                ? '중'
                                : '상'}
                        </span>
                        <span>
                            잠버릇{' '}
                            {roomMate.sleeping_habits === 1
                                ? '있어요'
                                : '없어요'}
                        </span>
                        <span>
                            흡연 {roomMate.smoking === 1 ? '해요' : '안해요'}
                        </span>
                        <div>
                            <p>하고 싶은 말</p>
                            <span className="text-sm">
                                {roomMate.notes ? roomMate.notes : '없음'}
                            </span>
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <EdgeButton onClick={() => modalClick(roomMate)}>
                                수정하기
                            </EdgeButton>
                            {isPending ? (
                                <RedButton>
                                    <Loading />
                                </RedButton>
                            ) : (
                                <RedButton
                                    onClick={() =>
                                        deleteMyRoommate(roomMate.room_id!)
                                    }
                                >
                                    삭제하기
                                </RedButton>
                            )}
                        </div>
                    </div>
                ))}

                <RoomMateModal
                    modalOpen={modalOpen}
                    setModalOpen={() => setModalOpen(false)}
                    isEdit={true}
                    selectedRoom={selectedRoom}
                />
            </div>
        </div>
    );
}
