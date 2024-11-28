import { Link } from 'react-router-dom';
import BaseButton from './button/BaseButton';
import GreenButton from './button/GreenButton';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
    const { token, logout } = useAuth();

    return (
        <div className="fixed h-[70px] inset-x-4 md:inset-x-14 lg:inset-x-28 xl:inset-x-44 2xl:inset-x-72 bg-white z-10">
            <div className="flex justify-between items-center h-full">
                <Link to={'/'}>
                    <GreenButton>쿠트 | 함께 사는 즐거움</GreenButton>
                </Link>
                {token ? (
                    <>
                        <BaseButton onClick={logout}>로그아웃</BaseButton>
                    </>
                ) : (
                    <Link to={'/login'}>
                        <BaseButton>로그인</BaseButton>
                    </Link>
                )}
            </div>
        </div>
    );
}
