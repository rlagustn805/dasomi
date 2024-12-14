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
import GreenLoading from '../components/GreenLoading';
import GrayButton from '../components/button/GrayButton';
import FilterList from '../components/FilterList';

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
    const [totalCount, setTotalCount] = useState<number | null>(null);

    const initialFilters = [
        {
            id: '2room',
            type: 'person_room',
            name: '2인실',
            value: '2',
            active: false,
        },
        {
            id: '4room',
            type: 'person_room',
            name: '4인실',
            value: '4',
            active: false,
        },
        { id: 'man', type: 'gender', name: '남자', value: 'M', active: false },
        { id: 'girl', type: 'gender', name: '여자', value: 'F', active: false },
        {
            id: 'friendly-t',
            type: 'friendly',
            name: '친해져요',
            value: 1,
            active: false,
        },
        {
            id: 'friendly-f',
            type: 'friendly',
            name: '갠플해요',
            value: 0,
            active: false,
        },
        {
            id: 'indoor_eating-t',
            type: 'indoor_eating',
            name: '실내취식 O',
            value: 1,
            active: false,
        },
        {
            id: 'indoor_eating-f',
            type: 'indoor_eating',
            name: '실내취식 X',
            value: 0,
            active: false,
        },
        {
            id: 'clean-h',
            type: 'cleanliness',
            name: '왕깔끔이',
            value: 'high',
            active: false,
        },
        {
            id: 'clean-m',
            type: 'cleanliness',
            name: '깔끔이',
            value: 'medium',
            active: false,
        },
        {
            id: 'clean-l',
            type: 'cleanliness',
            name: '덜깔끔이',
            value: 'low',
            active: false,
        },
        {
            id: 'smoking-t',
            type: 'smoking',
            name: '흡연',
            value: 1,
            active: false,
        },
        {
            id: 'smoking-f',
            type: 'smoking',
            name: '비흡연',
            value: 0,
            active: false,
        },
        {
            id: 'sh-t',
            type: 'sleeping_habits',
            name: '잠버릇 O',
            value: 1,
            active: false,
        },
        {
            id: 'sh-f',
            type: 'sleeping_habits',
            name: '잠버릇 X',
            value: 0,
            active: false,
        },
    ];

    const [filters, setFilters] = useState(initialFilters);

    const { dormitory } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const getRoomMates = async (page: number): Promise<RoomMateResponse> => {
        const params: Record<string, any> = {
            dormitory: dormitory,
            page: page,
        };

        filters
            .filter((filter) => filter.active)
            .forEach((filter) => {
                if (!params[filter.type]) {
                    params[filter.type] = [];
                }

                params[filter.type].push(filter.value);
            });

        try {
            const res = await api.get('api/roommate', { params });
            console.log(res.data);
            setTotalCount(res.data.totalCount);
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
        queryFn: ({ pageParam = 1 }) => getRoomMates(pageParam),
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

    const hashTagClass =
        'border-green-500 border p-1 rounded-xl cursor-pointer hover:bg-green-500 hover:text-white duration-200';

    return (
        <div>
            <p className="text-lg">
                {dormitory} {totalCount}개
            </p>
            <FilterList filters={filters} setFilters={setFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 rounded-xl">
                {data?.pages.map((page) =>
                    page.data.map((roommate) => (
                        <div key={roommate.room_id}>
                            <div className="flex flex-col gap-2 bg-white shadow-md rounded-xl m-2">
                                <div className="bg-green-500 text-white p-2 rounded-xl">
                                    <div className="flex justify-between">
                                        <p className="text-lg">
                                            {roommate.nickname}
                                        </p>
                                        <p>⭐{roommate.rating}</p>
                                    </div>
                                    <p className="text-sm">{`${roommate.department} ${roommate.student_id}`}</p>
                                    <p className="text-sm">{roommate.mbti}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 p-2 text-sm text-center">
                                    <p className={hashTagClass}>
                                        #
                                        {roommate.gender === 'M'
                                            ? '남자'
                                            : '여자'}{' '}
                                        {roommate.person_room}인실
                                    </p>
                                    <p className={hashTagClass}>
                                        #
                                        {roommate.friendly === 1
                                            ? '친해져요'
                                            : '갠플해요'}
                                    </p>

                                    <p className={hashTagClass}>
                                        #
                                        {roommate.indoor_eating === 1
                                            ? '실내취식 가능'
                                            : '실내취식 불가능'}
                                    </p>
                                    <p className={hashTagClass}>
                                        #
                                        {roommate.cleanliness === 'low'
                                            ? '덜깔끔이'
                                            : roommate.cleanliness === 'medium'
                                            ? '깔끔이'
                                            : '왕깔끔이'}
                                    </p>
                                    <p className={hashTagClass}>
                                        #잠버릇 {''}
                                        {roommate.sleeping_habits === 1
                                            ? '있어요'
                                            : '없어요'}
                                    </p>
                                    <p className={hashTagClass}>
                                        #흡연{' '}
                                        {roommate.smoking === 1
                                            ? '해요'
                                            : '안해요'}
                                    </p>
                                </div>
                                <div className="p-2">
                                    <p className="text-center">특이사항</p>
                                    <textarea
                                        className="resize-none w-full p-1 text-sm rounded-lg overflow-auto bg-gray-100 border-2"
                                        readOnly
                                        defaultValue={
                                            roommate.notes
                                                ? roommate.notes
                                                : '없어요'
                                        }
                                    ></textarea>
                                </div>
                                <div className="text-center mb-2">
                                    {token === null ? (
                                        <EdgeButton
                                            onClick={() => navigate('/login')}
                                        >
                                            로그인
                                        </EdgeButton>
                                    ) : decodedInfo?.id === roommate.user_id ? (
                                        <EdgeButton
                                            onClick={() =>
                                                navigate('/roommate')
                                            }
                                        >
                                            수정하기
                                        </EdgeButton>
                                    ) : decodedInfo?.gender ===
                                      roommate.gender ? (
                                        <EdgeButton>채팅하기</EdgeButton>
                                    ) : (
                                        <GrayButton>성별이 달라요</GrayButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {hasNextPage && <h1 ref={ref}></h1>}
            {isFetchingNextPage && (
                <div className="flex justify-center items-center mt-2">
                    <GreenLoading />
                </div>
            )}
        </div>
    );
}
