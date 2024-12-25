import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import Loading from '../Loading';
import EdgeButton from '../button/EdgeButton';
import RedButton from '../button/RedButton';
import RoomMateModal from '../modal/RoomMateModal';
import { useState } from 'react';
import { RoomMateData, RoomMateProps } from './CreateMyRoomMate';
import axios from 'axios';
import SelectBox from '../select/SelectBox';
import GreenLoading from '../GreenLoading';

export default function GetMyRoomMate() {
    const statusMap: Record<string, string> = {
        available: '매칭가능',
        reserving: '매칭중',
        completed: '매칭완료',
    };

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

    const updateReservationStatus = async ({
        room_id,
        status,
    }: {
        room_id: number;
        status: string;
    }) => {
        const res = await api.put('/api/roommate/reservation/edit', {
            room_id,
            status,
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

    const { mutate: updateReservation, isPending: isUpdating } = useMutation({
        mutationFn: updateReservationStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myRoomMate'] });
            alert('정상적으로 수정하였습니다.');
        },
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err.response?.data.message));
            }
        },
    });

    if (isError && error instanceof Error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return (
                <div className="bg-green-700 min-h-[30vh] rounded-lg flex flex-col gap-2 items-center justify-center">
                    <picture>
                        <source
                            srcSet="/assets/dcuCharacter/webp/dcuFace.webp"
                            type="image/webp"
                        />
                    </picture>
                    <source
                        srcSet="/assets/dcuCharacter/jpg/dcuFace.jpg"
                        type="image/jpeg"
                    />
                    <img
                        src="/assets/dcuCharacter/jpg/dcuFace.jpg"
                        width={80}
                    />
                    <p className="text-white">
                        등록된 나의 룸메이트 정보가 없어요!{' '}
                    </p>
                </div>
            );
        }

        return <div>에러 발생: {error.message}</div>;
    }

    const hashTagClass =
        'border-green-500 border p-1 rounded-xl cursor-pointer hover:bg-green-500 hover:text-white duration-200';

    return (
        <div>
            {isLoading ? (
                <div className="bg-gray-100 rounded-xl min-h-screen flex justify-center items-center">
                    <GreenLoading />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 rounded-xl bg-gray-100 gap-5">
                    {data?.map((roomMate, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col px-4 py-2 gap-2 flex-1 bg-white rounded-xl shadow-lg justify-between h-full"
                        >
                            <span className="text-lg border-b-2">
                                {roomMate.dormitory} {roomMate.person_room}인실
                            </span>
                            <SelectBox
                                arr={Object.values(statusMap)}
                                value={''}
                                onChange={(e) =>
                                    updateReservation({
                                        room_id: roomMate.room_id!,
                                        status: Object.keys(statusMap).find(
                                            (key) =>
                                                statusMap[key] ===
                                                e.target.value
                                        )!,
                                    })
                                }
                                title="매칭 변경"
                            />
                            <picture>
                                <source
                                    srcSet={`/assets/dcuCharacter/webp/${roomMate.dcu_img}.webp`}
                                    type="image/webp"
                                />
                                <source
                                    srcSet={`/assets/dcuCharacter/jpg/${roomMate.dcu_img}.jpg`}
                                    type="image/jpeg"
                                />
                                <img
                                    src={`/assets/dcuCharacter/jpg/${roomMate.dcu_img}.jpg`}
                                    width={100}
                                    className="mb-5 m-auto min-h-28"
                                />
                            </picture>
                            <span
                                className={`text-center text-white rounded-lg  ${
                                    roomMate.reservation_status === 'available'
                                        ? 'bg-green-500'
                                        : roomMate.reservation_status ===
                                          'reserving'
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                }`}
                            >
                                {roomMate.reservation_status === 'available'
                                    ? '매칭가능'
                                    : roomMate.reservation_status ===
                                      'reserving'
                                    ? '매칭중'
                                    : '매칭완료'}
                            </span>

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
                                        roomMate.notes
                                            ? roomMate.notes
                                            : '없어요'
                                    }
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-2">
                                <EdgeButton
                                    onClick={() => modalClick(roomMate)}
                                >
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
            )}
        </div>
    );
}
