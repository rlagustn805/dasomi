import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import axios from 'axios';
import Loading from '../components/Loading';
import EdgeButton from '../components/button/EdgeButton';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import RoomMateDetailModal from '../components/mdoal/RoomMateDetailModal';
import decodeToken from '../components/utils/decodeToken';
import { useAuth } from '../hooks/useAuth';
import RedButton from '../components/button/RedButton';
import Toggle from '../components/select/Toggle';

interface RoomMate {
    user_id: number;
    room_id: number;
    nickname: string;
    person_room: string;
    dormitory: string;
    gender: string;
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
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
    const [decodedInfo, setDecodedInfo] = useState<DecodedInfo | null>(null);
    const [filters, setFilters] = useState<Filters>({
        person_room: 'all',
        gender: 'all',
    });

    const { dormitory } = useParams();
    const { token } = useAuth();
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
    }, []);

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
                <div className="flex gap-2 text-sm justify-end">
                    <Toggle
                        options={[
                            { label: '전체', value: 'all' },
                            { label: '2인실', value: '2' },
                            { label: '4인실', value: '4' },
                        ]}
                        selectedValue={filters.person_room}
                        onChange={(value: string | number | boolean) =>
                            setFilters((prev) => ({
                                ...prev,
                                person_room: value as string,
                            }))
                        }
                    />
                    <Toggle
                        options={[
                            { label: '전체', value: 'all' },
                            { label: '남자', value: 'M' },
                            { label: '여자', value: 'F' },
                        ]}
                        selectedValue={filters.gender}
                        onChange={(value: string | number | boolean) =>
                            setFilters((prev) => ({
                                ...prev,
                                gender: value as string,
                            }))
                        }
                    />
                </div>
            </div>

            <div className="flex flex-wrap">
                {data?.pages.map((page) =>
                    page.data.map((roommate) => (
                        <div
                            key={roommate.room_id}
                            className="w-[50%] md:w-[33.3%] lg:w-[20%]"
                        >
                            <div className="flex flex-col gap-2 border border-black shadow-sm rounded-xl p-2 m-2">
                                <p>
                                    {roommate.gender === 'M' ? '남자' : '여자'}{' '}
                                    {roommate.person_room}인실
                                </p>
                                <p>{roommate.nickname}님</p>
                                {decodedInfo &&
                                decodedInfo?.gender !== roommate.gender ? (
                                    <RedButton>성별이 달라요</RedButton>
                                ) : (
                                    <EdgeButton
                                        onClick={() => {
                                            setSelectedRoomId(roommate.room_id);
                                            setModalOpen(true);
                                        }}
                                    >
                                        자세히 보기
                                    </EdgeButton>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <RoomMateDetailModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                room_id={selectedRoomId}
            />
            {hasNextPage && <h1 ref={ref}>Load More</h1>}
        </div>
    );
}
