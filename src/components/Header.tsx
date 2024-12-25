import { Link, useNavigate } from 'react-router-dom';
import BaseButton from './button/BaseButton';
import GreenButton from './button/GreenButton';
import { useAuth } from '../hooks/useAuth';
import { IoMdMenu } from 'react-icons/io';
import { useEffect, useState } from 'react';
import decodeToken from './utils/decodeToken';

interface TokenInfo {
    admin: number;
}

export default function Header() {
    const { token, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

    const navigate = useNavigate();

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuClick = (action?: () => void) => {
        if (action) action();
        setMenuOpen(false);
    };

    useEffect(() => {
        if (token) {
            setTokenInfo(decodeToken(token));
        } else {
            setTokenInfo(null);
        }

        setTokenInfo(decodeToken(token));
    }, [token]);

    const menuItems = [
        { text: '로그아웃', onclick: () => handleMenuClick(logout) },
        {
            text: '내 정보 관리',
            onclick: () => handleMenuClick(() => navigate('/profile')),
        },
        {
            text: '룸메이트 관리',
            onclick: () => handleMenuClick(() => navigate('/roommate')),
        },
    ];

    if (tokenInfo?.admin === 1) {
        menuItems.push({
            text: '관리자',
            onclick: () => handleMenuClick(() => navigate('/manage-admin')),
        });
    }

    return (
        <div className="fixed h-[70px] inset-x-4 md:inset-x-14 lg:inset-x-28 xl:inset-x-44 2xl:inset-x-72 bg-white z-10">
            <div className="flex justify-between items-center h-full border-b-[1px]">
                <Link to={'/'}>
                    <GreenButton>다솜이 | 함께 사는 즐거움</GreenButton>
                </Link>
                {token ? (
                    <div className="relatvice">
                        <BaseButton onClick={handleMenuOpen}>
                            <IoMdMenu />
                        </BaseButton>
                        {menuOpen && (
                            <div className="absolute bg-white right-5 flex flex-col gap-2 p-3 border-[1px] mt-1 text-sm">
                                {menuItems.map((menu, index) => (
                                    <span
                                        key={index}
                                        className="border-b-[1px] border-black cursor-pointer hover:bg-gray-100 p-1"
                                        onClick={menu.onclick}
                                    >
                                        {menu.text}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to={'/login'} className="text-sm">
                        <BaseButton>로그인</BaseButton>
                    </Link>
                )}
            </div>
        </div>
    );
}
