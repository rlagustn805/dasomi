import BaseButton from './button/BaseButton';
import GreenButton from './button/GreenButton';

export default function Header() {
    return (
        <div className="fixed h-[70px] inset-x-4 md:inset-x-14 lg:inset-x-28 xl:inset-x-44 2xl:inset-x-72 bg-white z-10">
            <div className="flex justify-between items-center h-full">
                <GreenButton>쿠트 | 함께 사는 즐거움</GreenButton>
                <BaseButton>로그인</BaseButton>
            </div>
        </div>
    );
}
