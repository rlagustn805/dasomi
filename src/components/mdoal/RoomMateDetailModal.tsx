import ReactModal from 'react-modal';
import BaseModal from './BaseModal';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RoomMateData } from '../myRoomMateGroup/CreateMyRoomMate';

interface RoomMateModalProps {
    modalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    room_id: number | null;
}

interface RoomMateDetail extends RoomMateData {
    nickname: string;
    updated_at: string;
}

export default function RoomMateDetailModal({
    modalOpen,
    setModalOpen,
    room_id,
}: RoomMateModalProps) {
    const [roomMateDetails, setRoomMateDetails] = useState<RoomMateDetail>();

    const getRoomMateDetail = async (room_id: number) => {
        try {
            const res = await api.get(`api/roommate/detail/${room_id}`);
            setRoomMateDetails(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (room_id) {
            getRoomMateDetail(room_id);
        }
    }, [room_id]);

    const detailMenuClass = 'border border-black p-2 rounded-xl';
    return (
        <BaseModal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
        >
            <div className="flex flex-col gap-2">
                <div>
                    <p className="text-lg text-center">
                        {roomMateDetails?.nickname}님의 상세 정보
                    </p>
                </div>
                <div className={detailMenuClass}>
                    {roomMateDetails?.dormitory} {roomMateDetails?.person_room}
                    인실
                </div>

                <div className={detailMenuClass}>
                    룸메님 ! :{' '}
                    {roomMateDetails?.friendly === 1 ? '친해져요' : '갠플해요'}
                </div>

                <div className={detailMenuClass}>
                    실내취식 :{' '}
                    {roomMateDetails?.indoor_eating === 1 ? '가능' : '불가능'}
                </div>
                <div className={detailMenuClass}>
                    청결도 :{' '}
                    {roomMateDetails?.cleanliness === 'low'
                        ? '하'
                        : roomMateDetails?.cleanliness === 'medium'
                        ? '중'
                        : '상'}
                </div>
                <div className={detailMenuClass}>
                    잠버릇 :{' '}
                    {roomMateDetails?.sleeping_habits === 1
                        ? '있어요'
                        : '없어요'}
                </div>
                <div className={detailMenuClass}>
                    <p>
                        흡연 :{' '}
                        {roomMateDetails?.smoking === 1 ? '해요' : '안해요'}
                    </p>
                </div>

                <div className={detailMenuClass}>
                    <p>특이사항</p>
                    <textarea
                        className="resize-none w-full p-1"
                        readOnly
                        defaultValue={
                            roomMateDetails?.notes
                                ? roomMateDetails.notes
                                : '없음'
                        }
                    ></textarea>
                </div>
            </div>
        </BaseModal>
    );
}
