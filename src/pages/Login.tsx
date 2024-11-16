import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import BaseInput from '../components/input/BaseInput';
import GreenButton from '../components/button/GreenButton';
import { api } from '../services/api';
import axios from 'axios';
import { useState } from 'react';
import { IoLockClosedSharp, IoLockOpen } from 'react-icons/io5';

interface FormValues {
    username: string;
    password: string;
}

export default function Login() {
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { control, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const res = await api.post('api/users/login', data);
            setError('');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-full flex flex-col items-center justify-center gap-3"
        >
            <p className="text-2xl">로그인</p>
            <div className="flex flex-col gap-3 relative">
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{ required: '아이디를 입력해주세요.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <BaseInput {...field} placeholder="아이디" />
                            {fieldState.error && (
                                <p className="error-red">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </>
                    )}
                ></Controller>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: '비밀번호를 입력해주세요.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <div className="relative">
                                <BaseInput
                                    {...field}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="비밀번호"
                                />
                                <div
                                    className="absolute top-[0.57rem] right-3 cursor-pointer"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <IoLockOpen />
                                    ) : (
                                        <IoLockClosedSharp />
                                    )}
                                </div>
                            </div>

                            <p className="error-red">
                                {fieldState.error?.message}
                            </p>
                        </>
                    )}
                ></Controller>

                <GreenButton>로그인</GreenButton>
                <div>
                    <p className="text-xs float-right cursor-pointer hover:underline">
                        ID / PW 찾기
                    </p>
                </div>
                {error && <p className="error-red text-center">{error}</p>}
                <div className="text-center">
                    <p className="opacity-50">계정이 없으신가요?</p>
                    <p className="text-sm cursor-pointer hover:underline">
                        회원가입
                    </p>
                </div>
            </div>
        </form>
    );
}
