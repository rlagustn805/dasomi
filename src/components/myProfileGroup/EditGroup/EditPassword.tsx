import { Controller, useForm, useWatch } from 'react-hook-form';
import BaseInput from '../../input/BaseInput';
import EdgeButton from '../../button/EdgeButton';
import { useEffect, useState } from 'react';
import Loading from '../../Loading';
import { IoLockClosedSharp, IoLockOpen } from 'react-icons/io5';
import axios from 'axios';
import { api } from '../../../services/api';
import { useAuth } from 'src/hooks/useAuth';

interface EditPasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function EditPassword() {
    const { logout } = useAuth();

    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<EditPasswordData>({
        mode: 'onChange',
    });

    const [isMatchPassword, setIsMatchPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const newPassword = useWatch({ control, name: 'newPassword' });
    const confirmPassword = useWatch({ control, name: 'confirmPassword' });

    useEffect(() => {
        if (newPassword && confirmPassword) {
            setIsMatchPassword(newPassword === confirmPassword);
        }
    }, [newPassword, confirmPassword]);

    const onSubmit = async (data: EditPasswordData) => {
        setIsLoading(true);

        try {
            const res = await api.post('api/my/edit/password', data);
            alert(res.data.message);
            logout();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErrorMsg(err.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-2 flex flex-col shadow-lg gap-2 bg-gray-100 rounded-lg"
        >
            <p>비밀번호 변경</p>
            <Controller
                name="currentPassword"
                control={control}
                defaultValue={getValues('currentPassword') || ''}
                rules={{ required: '현재 비밀번호를 입력해주세요.' }}
                render={({ field, fieldState }) => (
                    <div className="relative">
                        <BaseInput
                            {...field}
                            placeholder="현재 비밀번호"
                            type={showPassword ? 'text' : 'password'}
                        />
                        <div
                            className="absolute top-2 right-2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <IoLockOpen />
                            ) : (
                                <IoLockClosedSharp />
                            )}
                        </div>
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                )}
            ></Controller>
            <Controller
                name="newPassword"
                control={control}
                defaultValue={getValues('newPassword') || ''}
                rules={{
                    required: '새 비밀번호를 입력하세요.',
                    validate: {
                        isValidLength: (value) => {
                            const isValid = /^.{8,25}$/.test(value);
                            return (
                                isValid ||
                                '비밀번호는 8자 이상 25자 이하로 입력해주세요.'
                            );
                        },
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <BaseInput
                            {...field}
                            placeholder="새 비밀번호"
                            type={showPassword ? 'text' : 'password'}
                        />
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error.message}
                            </p>
                        )}
                    </>
                )}
            ></Controller>
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue={getValues('confirmPassword') || ''}
                rules={{
                    validate: (value) => {
                        return (
                            value === newPassword ||
                            '비밀번호가 일치하지 않아요.'
                        );
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <BaseInput
                            {...field}
                            placeholder="비밀번호 확인"
                            type={showPassword ? 'text' : 'password'}
                        />
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error.message}
                            </p>
                        )}
                    </>
                )}
            ></Controller>
            {errorMsg && <p className="error-red">{errorMsg}</p>}
            {isLoading ? (
                <EdgeButton>
                    <Loading />
                </EdgeButton>
            ) : (
                <EdgeButton
                    disabled={!isMatchPassword || hasErrors}
                    type="submit"
                >
                    변경하기
                </EdgeButton>
            )}
        </form>
    );
}
