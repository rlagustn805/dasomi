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

    const hashTagClass =
        'border-green-500 border p-1 rounded-xl cursor-pointer hover:bg-green-500 hover:text-white duration-200';

    return (
        <div>
            <p className="mb-2">등록한 나의 룸메이트 정보</p>
            {/* <div className="flex flex-col gap-5 bg-gray-100 p-4 rounded-xl lg:flex-row"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 rounded-xl bg-gray-100 gap-5">
                {data?.map((roomMate, index: number) => (
                    <div
                        key={index}
                        className="flex flex-col px-4 py-2 gap-2 flex-1 bg-white rounded-xl shadow-lg justify-between h-full"
                    >
                        <span className="text-lg border-b-2">
                            {roomMate.dormitory} {roomMate.person_room}인실
                        </span>
                        <picture>
                            <source
                                srcSet={`src/assets/dcuCharacter/webp/${roomMate.dcu_img}.webp`}
                                type="image/webp"
                            />
                            <source
                                srcSet={`src/assets/dcuCharacter/jpg/${roomMate.dcu_img}.jpg`}
                                type="image/jpeg"
                            />
                            <img
                                src={`src/assets/dcuCharacter/jpg/${roomMate.dcu_img}.jpg`}
                                width={85}
                                className="mb-5 m-auto"
                            />
                        </picture>
                        <div className="grid grid-cols-2 gap-2 text-sm text-center">
                            <span className={hashTagClass}>
                                #
                                {roomMate.friendly === 1
                                    ? '친해져요'
                                    : '갠플해요'}
                            </span>
                            <span className={hashTagClass}>
                                #실내취식{' '}
                                {roomMate.indoor_eating === 1
                                    ? '가능'
                                    : '불가능'}
                            </span>
                            <span className={hashTagClass}>
                                #
                                {roomMate.cleanliness === 'low'
                                    ? '덜깔끔이'
                                    : roomMate.cleanliness === 'medium'
                                    ? '깔끔이'
                                    : '왕깔끔이'}
                            </span>
                            <span className={hashTagClass}>
                                #잠버릇{' '}
                                {roomMate.sleeping_habits === 1
                                    ? '있어요'
                                    : '없어요'}
                            </span>
                            <span className={hashTagClass}>
                                #흡연{' '}
                                {roomMate.smoking === 1 ? '해요' : '안해요'}
                            </span>
                        </div>

                        <div className="p-2">
                            <p className="text-center">특이사항</p>
                            <textarea
                                className="resize-none w-full p-1 text-sm rounded-lg overflow-auto bg-gray-100 border-2"
                                readOnly
                                defaultValue={
                                    roomMate.notes ? roomMate.notes : '없어요'
                                }
                            ></textarea>
                        </div>
                        <div className="flex flex-col gap-2">
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
