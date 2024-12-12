import { useNavigate } from 'react-router-dom';

export default function Footer() {
    interface Dormitorys {
        name: string;
    }

    const dormitorys: Dormitorys[] = [
        { name: '참인재관' },
        { name: '아마레관' },
        { name: '예지관' },
        { name: '세르비레관' },
        { name: '효성관' },
        { name: '성김대건관' },
        { name: '다솜관' },
    ];

    const navigate = useNavigate();

    return (
        <div className="bg-green-500 p-4 mt-16 grid grid-cols-2 text-white">
            <div className="flex flex-col gap-1">
                <p
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate('/')}
                >
                    홈으로 이동
                </p>
                <p
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate('/login')}
                >
                    로그인
                </p>
                <p
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate('/register')}
                >
                    회원가입
                </p>
            </div>
            <div className="grid grid-cols-2 gap-1">
                {dormitorys.map((dormitory) => (
                    <p
                        onClick={() => navigate(`/${dormitory.name}`)}
                        className="cursor-pointer hover:underline"
                    >
                        {dormitory.name}
                    </p>
                ))}
            </div>
        </div>
    );
}
