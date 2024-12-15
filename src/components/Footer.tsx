import { Link, useNavigate } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';

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
        <div className="bg-green-500 p-4 mt-16 grid grid-cols-2 sm:grid-cols-3 text-white rounded-lg">
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
                {dormitorys.map((dormitory, index) => (
                    <p
                        key={index}
                        onClick={() => navigate(`/${dormitory.name}`)}
                        className="cursor-pointer hover:underline"
                    >
                        {dormitory.name}
                    </p>
                ))}
            </div>
            <Link
                to="https://open.kakao.com/o/skUO4i5g"
                target="_blank"
                className="flex items-center sm:ml-auto p-2 col-end-3 mt-10 sm:mt-0 sm:col-end-4 sm:p-4 gap-2 cursor-pointer bg-yellow-400 rounded-lg "
            >
                <RiKakaoTalkFill size={20} /> {/* 아이콘 크기 조정 */}
                <span className="sm:text-lg">문의하기</span>
            </Link>
        </div>
    );
}
