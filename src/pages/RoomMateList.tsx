import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import axios from 'axios';
import Loading from '../components/Loading';
import EdgeButton from '../components/button/EdgeButton';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import RoomMateDetailModal from '../components/mdoal/RoomMateDetailModal';

interface RoomMate {
    user_id: number;
    room_id: number;
    nickname: string;
    person_room: string;
    dormitory: string;
}

interface RoomMateResponse {
    data: RoomMate[];
    currentPage: number;
    totalCount: number;
    totalPages: number;
}
export default function RoomMateList() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

    const { dormitory } = useParams();

    const getRoomMates = async (page: number): Promise<RoomMateResponse> => {
        const params = {
            dormitory: dormitory,
            page: page,
        };

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

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['roomMates', dormitory],
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

    return (
        <div>
            <p className="text-lg">{dormitory}</p>
            <div className="flex flex-wrap">
                {data?.pages.map((page) =>
                    page.data.map((roommate) => (
                        <div
                            key={roommate.room_id}
                            className="w-[50%] md:w-[33.3%] lg:w-[20%]"
                        >
                            <div className="flex flex-col gap-2 border border-black shadow-sm rounded-xl p-2 m-2">
                                <p>{roommate.dormitory}</p>
                                <p>{roommate.person_room}인실</p>
                                <p>{roommate.nickname}님</p>
                                <p>{roommate.room_id}</p>
                                <EdgeButton
                                    onClick={() => {
                                        setSelectedRoomId(roommate.room_id);
                                        setModalOpen(true);
                                    }}
                                >
                                    자세히 보기
                                </EdgeButton>
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
