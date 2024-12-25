import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CgProfile } from 'react-icons/cg';
import { api } from '../../services/api';
import Loading from '../Loading';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenLoading from '../GreenLoading';

interface Profile {
    email: string;
    gender: string;
    mbti: string;
    department: string;
    student_Id: string;
    nickname: string;
    rating: string;
}

const getMyProfile = async (): Promise<Profile> => {
    const res = await api.get('/api/my/profile');
    return res.data.myInfo;
};

export default function GetMyProfile() {
    const { token } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            alert('권한이 없습니다.');
            navigate('/');
        }
    }, [token]);

    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['profile'],
        queryFn: getMyProfile,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    if (isError && error instanceof Error) {
        return <div>에러 발생: {error.message}</div>;
    }

    const myInfo = [
        { label: '성별', value: data?.gender === 'M' ? '남' : '여' },
        { label: 'MBTI', value: data?.mbti },
        { label: '학과', value: data?.department },
    ];

    return (
        <div className="flex flex-col gap-10 bg-green-700 text-white p-2 rounded-lg">
            {isLoading ? (
                <div className="min-h-[23vh] flex">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className="flex gap-10 items-center">
                        <div className="ml-7">
                            <picture>
                                <source
                                    srcSet="/assets/dcuCharacter/webp/dcuFace.webp"
                                    type="image/webp"
                                />
                                <source
                                    srcSet="/assets/dcuCharacter/jpg/dcuFace.jpg"
                                    type="image/jpg"
                                />
                                <img
                                    src="/assets/dcuCharacter/jpg/dcuFace.jpg"
                                    width={100}
                                />
                            </picture>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <span className="text-xl">{data?.nickname}</span>
                            <div className="p-2 text-sm flex flex-col gap-1 bg-white bg-opacity-35 rounded-lg">
                                <span>{data?.email}</span>
                                <span>{data?.student_Id} 학번</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {myInfo.map((info, index) => (
                            <div
                                key={index}
                                className="flex-1 flex flex-col gap-1 bg-white bg-opacity-35 rounded-lg p-2"
                            >
                                <span>{info.label}</span>
                                <span className="text-sm">{info.value}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
