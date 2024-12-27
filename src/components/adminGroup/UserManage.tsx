import axios from 'axios';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import EdgeButton from '../button/EdgeButton';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import decodeToken from '../utils/decodeToken';
import RedButton from '../button/RedButton';

interface User {
    email: string;
    is_admin: string;
    nickname: string;
    user_id: number;
    username: string;
    is_active: number;
}

interface Stats {
    yesterdayIncrease: number;
    monthlyIncrease: number;
}

interface UserData {
    currentPage: number;
    data: User[];
    stats: Stats;
    totalPages: number;
    totalUsers: number;
}

interface RoommateStats {
    availableCount: number;
    completedCount: number;
    reservingCount: number;
}

export default function UserCount() {
    const [users, setUsers] = useState<UserData | undefined>(undefined);
    const [roommates, setRoommates] = useState<RoommateStats | undefined>(
        undefined
    );
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태

    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert('권한이 없습니다.');
            navigate('/');
        }
        const isAdmin = decodeToken(token);

        if (isAdmin.admin !== 1) {
            alert('권한이 없습니다. 어드민');
            navigate('/');
        }
    }, [token]);

    const getUser = async (page = 1) => {
        const params = {
            page: page,
        };

        try {
            const res = await api.get('/api/admin/users', { params });
            setUsers(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err);
            }
        }
    };

    const getRoommateStats = async () => {
        try {
            const res = await api.get('api/roommate/stats');
            setRoommates(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        getRoommateStats();
    }, [token]);

    useEffect(() => {
        getUser(currentPage);
    }, [currentPage]);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextClick = () => {
        if (users && currentPage < users.totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const suspendUser = async (userId: number) => {
        let isConfirm = confirm('정말로 정지하시겠습니까?');

        if (!isConfirm) {
            return Promise.reject();
        }

        try {
            const res = await api.patch(`api/admin/users/${userId}/suspend`);
            alert(JSON.stringify(res.data.message));
            getUser(currentPage);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err.response?.data.message));
            }
        }
    };

    const activateUser = async (userId: number) => {
        let isConfirm = confirm('정말로 정지를 해제 하시겠습니까?');

        if (!isConfirm) {
            return Promise.reject();
        }

        try {
            const res = await api.patch(`api/admin/users/${userId}/active`);
            alert(JSON.stringify(res.data.message));
            getUser(currentPage);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err.response?.data.message));
            }
        }
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-3 mb-2 text-sm">
                <div className="border shadow-lg p-6 text-center rounded-xl">
                    <p>총 가입자</p>
                    <span className="text-lg">{users?.totalUsers}명</span>
                </div>
                <div className="border shadow-lg p-6 text-center rounded-xl">
                    <p>어제 보다</p>
                    <span className="text-lg">
                        {users?.stats?.yesterdayIncrease}명
                    </span>
                </div>
                <div className="border shadow-lg p-6 text-center rounded-xl">
                    <p>전월 보다</p>
                    <span className="text-lg">
                        {users?.stats?.monthlyIncrease}명
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm mb-10">
                <div className="border shadow-lg p-6 text-center rounded-xl">
                    <p className="text-green-700">매칭 가능</p>
                    <span className="text-lg">
                        {roommates?.availableCount}건
                    </span>
                </div>
                <div className="border shadow-lg p-6 text-center rounded-xl">
                    <p className="text-yellow-500">매칭중</p>
                    <span className="text-lg">
                        {roommates?.reservingCount}건
                    </span>
                </div>
                <div className="border shadow-lg p-6 text-center rounded-xl">
                    <p className="text-red-500">매칭완료</p>
                    <span className="text-lg">
                        {roommates?.completedCount}건
                    </span>
                </div>
            </div>

            <div className="w-full overflow-auto">
                <div className="min-w-[800px] min-h-[800px] border border-gray-200 rounded-lg overflow-auto">
                    <div className="flex bg-gray-100 p-4 border-b border-gray-300">
                        <span className="flex-1 text-center ">고유번호</span>
                        <span className="flex-1 text-center">아이디</span>
                        <span className="flex-1 text-center">닉네임</span>
                        <span className="flex-1 text-center">이메일</span>
                        <span className="flex-1 text-center">어드민 유무</span>
                        <span className="flex-1 text-center">정지 관리</span>
                    </div>

                    {users?.data?.map((user, index) => (
                        <div
                            key={index}
                            className="flex p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                        >
                            <span className="flex-1 text-center">
                                {user.user_id}
                            </span>
                            <span className="flex-1 text-center">
                                {user.username}
                            </span>
                            <span className="flex-1 text-center">
                                {user.nickname}
                            </span>
                            <span className="flex-1 text-center">
                                {user.email}
                            </span>
                            <span className="flex-1 text-center">
                                {user.is_admin ? '어드민' : '유저'}
                            </span>

                            {user.is_admin ? (
                                <span className="flex-1 text-center">.</span>
                            ) : user.is_active ? (
                                <div className="flex-1 text-center">
                                    <RedButton
                                        onClick={() =>
                                            suspendUser(user.user_id)
                                        }
                                    >
                                        정지하기
                                    </RedButton>
                                </div>
                            ) : (
                                <div className="flex-1 text-center">
                                    <EdgeButton
                                        onClick={() =>
                                            activateUser(user.user_id)
                                        }
                                    >
                                        정지풀기
                                    </EdgeButton>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-3">
                <EdgeButton
                    disabled={currentPage === 1}
                    onClick={handlePrevClick}
                >
                    이전
                </EdgeButton>
                <EdgeButton
                    disabled={users?.totalPages === currentPage}
                    onClick={handleNextClick}
                >
                    다음
                </EdgeButton>
            </div>
        </>
    );
}
