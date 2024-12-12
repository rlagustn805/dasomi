import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import axios from 'axios';
import Loading from '../components/Loading';
import EdgeButton from '../components/button/EdgeButton';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import decodeToken from '../components/utils/decodeToken';
import { useAuth } from '../hooks/useAuth';
import RedButton from '../components/button/RedButton';
import { RoomMateData } from '../components/myRoomMateGroup/CreateMyRoomMate';

interface RoomMate extends RoomMateData {
    user_id: number;
    room_id: number;
    nickname: string;
    gender: string;
    rating: string;
    student_id: string;
    mbti: string;
    department: string;
}

interface Filters {
    person_room: string;
    gender: string;
}

interface RoomMateResponse {
    data: RoomMate[];
    currentPage: number;
    totalCount: number;
    totalPages: number;
}

interface DecodedInfo {
    id: number;
    gender: string;
}

export default function RoomMateList() {
    const [decodedInfo, setDecodedInfo] = useState<DecodedInfo | null>(null);
    const [filters, setFilters] = useState<Filters>({
        person_room: 'all',
        gender: 'all',
    });

    const { dormitory } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const getRoomMates = async (
        page: number,
        person_room: string,
        gender: string
    ): Promise<RoomMateResponse> => {
        const params: Record<string, any> = {
            dormitory: dormitory,
            page: page,
        };

        if (person_room !== 'all') {
            params.person_room = person_room;
        }

        if (gender !== 'all') {
            params.gender = gender;
        }

        try {
            const res = await api.get('api/roommate', { params });
            console.log(res.data);
            return res.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.message);
            }
            throw err;
        }
    };

    useEffect(() => {
        setDecodedInfo(decodeToken(token));
    }, [token]);

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['roomMates', dormitory, filters],
        queryFn: ({ pageParam = 1 }) =>
            getRoomMates(pageParam, filters.person_room, filters.gender),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <div className="flex flex-col justify-between lg:flex-row lg:items-center">
                <p className="text-lg">{dormitory}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-gray-100 rounded-xl">
                {data?.pages.map((page) =>
                    page.data.map((roommate) => (
                        <div key={roommate.room_id}>
                            <div className="flex flex-col gap-2 bg-white shadow-md rounded-xl p-2 m-2">
                                <div className="bg-green-500 text-white p-2 rounded-xl">
                                    <p>{` ${roommate.nickname} ⭐${roommate.rating}`}</p>
                                    <p>{`${roommate.department} ${roommate.student_id}`}</p>
                                    {roommate.mbti}{' '}
                                </div>
                                <div className="flex flex-col gap-2 p-2">
                                    <p>
                                        {roommate.gender === 'M'
                                            ? '남자'
                                            : '여자'}{' '}
                                        {roommate.person_room}인실
                                    </p>
                                    <div>
                                        룸메님!{' '}
                                        {roommate.friendly === 1
                                            ? '친해져요'
                                            : '갠플해요'}
                                    </div>

                                    <p>
                                        실내취식 :{' '}
                                        {roommate.indoor_eating === 1
                                            ? '가능'
                                            : '불가능'}
                                    </p>
                                    <p>
                                        청결도 :{' '}
                                        {roommate.cleanliness === 'low'
                                            ? '하'
                                            : roommate.cleanliness === 'medium'
                                            ? '중'
                                            : '상'}
                                    </p>
                                    <p>
                                        잠버릇 :{' '}
                                        {roommate.sleeping_habits === 1
                                            ? '있어요'
                                            : '없어요'}
                                    </p>
                                    <p>
                                        흡연 :{' '}
                                        {roommate.smoking === 1
                                            ? '해요'
                                            : '안해요'}
                                    </p>
                                    <div>
                                        <p>특이사항</p>
                                        <textarea
                                            className="resize-none w-full p-1 text-sm border-black border rounded-lg overflow-auto"
                                            readOnly
                                            defaultValue={
                                                roommate.notes
                                                    ? roommate.notes
                                                    : '없음'
                                            }
                                        ></textarea>
                                    </div>
                                </div>

                                {token === null ? (
                                    <EdgeButton
                                        onClick={() => navigate('/login')}
                                    >
                                        로그인
                                    </EdgeButton>
                                ) : decodedInfo?.id === roommate.user_id ? (
                                    <EdgeButton
                                        onClick={() => navigate('/roommate')}
                                    >
                                        수정하기
                                    </EdgeButton>
                                ) : decodedInfo?.gender === roommate.gender ? (
                                    <EdgeButton>채팅하기</EdgeButton>
                                ) : (
                                    <RedButton>성별이 달라요</RedButton>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {hasNextPage && <h1 ref={ref}>Load More</h1>}
        </div>
    );
}
