import { useState } from 'react';
import ForgotID from '../components/forgotGroup/ForgotID';
import ForgotPW from '../components/forgotGroup/ForgotPW';

export default function Forgot() {
    const [selectedTap, setSelectedTap] = useState('id');

    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col gap-4">
                <div className="flex border-2 border-black rounded-lg overflow-hidden">
                    <span
                        className={`flex-1 cursor-pointer text-center py-1 duration-200 ${
                            selectedTap === 'id'
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-black'
                        }`}
                        onClick={() => setSelectedTap('id')}
                    >
                        아이디 찾기
                    </span>
                    <span
                        className={`flex-1 cursor-pointer text-center py-1 duration-200 ${
                            selectedTap === 'pw'
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-black'
                        }`}
                        onClick={() => setSelectedTap('pw')}
                    >
                        비밀번호 찾기
                    </span>
                </div>
                {selectedTap === 'id' ? <ForgotID /> : <ForgotPW />}
            </div>
        </div>
    );
}
