import axios from 'axios';
import { api } from '../../services/api';
import EdgeButton from '../button/EdgeButton';
import BaseInput from '../input/BaseInput';
import Loading from '../Loading';
import React, { useState } from 'react';

interface ForgotPW {
    email: string;
    username: string;
    msg: string;
    success: boolean | null;
}

export default function ForgotPW() {
    const [forgotPW, setForgotPW] = useState<ForgotPW>({
        email: '',
        username: '',
        msg: '',
        success: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const findPW = async () => {
        const { email, username } = forgotPW;
        setIsLoading(true);
        const data = {
            email: email,
            username: username,
        };

        try {
            const res = await api.post('/api/forgot/pw', data);
            setForgotPW((prev) => ({
                ...prev,
                msg: res.data.message,
                success: true,
            }));
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setForgotPW((prev) => ({
                    ...prev,
                    msg: err.response?.data.message,
                    success: false,
                }));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForgotPW((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col gap-2">
            <BaseInput
                placeholder="학교 아이디@cu.ac.kr"
                name="email"
                value={forgotPW.email}
                onChange={handleChange}
            />
            <BaseInput
                placeholder="아이디"
                name="username"
                value={forgotPW.username}
                onChange={handleChange}
            />
            {forgotPW.msg && (
                <p className={forgotPW.success ? 'success-green' : 'error-red'}>
                    {forgotPW.msg}
                </p>
            )}

            {isLoading ? (
                <EdgeButton>
                    <Loading />
                </EdgeButton>
            ) : (
                <EdgeButton
                    onClick={findPW}
                    disabled={forgotPW.email === '' || forgotPW.username === ''}
                >
                    임시 비밀번호 발급
                </EdgeButton>
            )}
        </div>
    );
}
