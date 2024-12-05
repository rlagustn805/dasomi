import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import Loading from '../Loading';
import EdgeButton from '../button/EdgeButton';
import RedButton from '../button/RedButton';

interface RoomMateData {
    dormitory: string;
    person_room: string;
    friendly: boolean;
    indoor_eating: boolean;
    cleanliness: string;
    sleeping_habits: boolean;
    smoking: boolean;
    notes: string;
}

export default function GetMyRoomMate() {
    const getMyRoomMate = async (): Promise<RoomMateData[]> => {
        const res = await api.get('api/roommate/me');
        return res.data;
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['myRoomMate'],
        queryFn: getMyRoomMate,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    if (isLoading) return <Loading />;

    if (isError && error instanceof Error) {
        return <div>에러 발생: {error.message}</div>;
    }

    return (
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
                        {roomMate.friendly === true ? '친해져요' : '갠플해요'}
                    </span>
                    <span>
                        실내취식{' '}
                        {roomMate.indoor_eating === true ? '가능' : '불가능'}
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
                        {roomMate.sleeping_habits === true
                            ? '있어요'
                            : '없어요'}
                    </span>
                    <span>
                        흡연 {roomMate.smoking === true ? '해요' : '안해요'}
                    </span>
                    <div>
                        <p>하고 싶은 말</p>
                        <span className="text-sm">
                            {roomMate.notes ? roomMate.notes : '없음'}
                        </span>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <EdgeButton>수정하기</EdgeButton>
                        <RedButton>삭제하기</RedButton>
                    </div>
                </div>
            ))}
        </div>
    );
}
