import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CgProfile } from 'react-icons/cg';
import { api } from '../../services/api';
import Loading from '../Loading';

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
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['profile'],
        queryFn: getMyProfile,
        staleTime: Infinity,
        gcTime: Infinity,
    });
    if (isLoading) return <Loading />;

    if (isError && error instanceof Error) {
        return <div>에러 발생: {error.message}</div>;
    }

    const removeTrailingZero = (str?: string) =>
        str ? str.replace(/0+$/, '') : 'N/A';

    const myInfo = [
        { label: '성별', value: data?.gender === 'M' ? '남' : '여' },
        { label: '평점', value: removeTrailingZero(data?.rating) },
        { label: 'MBTI', value: data?.mbti },
    ];

    return (
        <div className="flex flex-col gap-10 bg-green-500 text-white p-2 rounded-lg">
            <div className="flex gap-10 items-center">
                <div className="ml-7">
                    <CgProfile size={80} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <span className="text-xl">{data?.nickname}</span>
                    <div className="p-2 text-sm flex flex-col gap-1 bg-white bg-opacity-35 rounded-lg">
                        <span>{data?.email}</span>
                        <span>{data?.department}</span>
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
        </div>
    );
}
