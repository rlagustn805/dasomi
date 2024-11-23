import { Controller, useFormContext, useWatch } from 'react-hook-form';
import EdgeButton from '../button/EdgeButton';
import BaseInput from '../input/BaseInput';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import axios from 'axios';
import { api } from '../../services/api';
import { IoLockClosedSharp, IoLockOpen } from 'react-icons/io5';

interface Step2Props {
    setAuthStep: (value: boolean) => void;
}

export default function Step2({ setAuthStep }: Step2Props) {
    const { control, setValue, getValues, trigger } = useFormContext();
    const [isMatchPassword, setIsMatchPassword] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const password = useWatch({ control, name: 'password' });
    const confirmPassword = useWatch({ control, name: 'confirmPassword' });
    const usernameCheckErr = useWatch({ control, name: 'usernameCheckErr' });

    useEffect(() => {
        if (isMatchPassword && usernameCheckErr === false) {
            setAuthStep(true);
        } else {
            setAuthStep(false);
        }
    }, [isMatchPassword, usernameCheckErr]);

    useEffect(() => {
        if (password && confirmPassword) {
            setIsMatchPassword(password === confirmPassword);
        }
    }, [password, confirmPassword]);

    const checkUsername = async () => {
        const params = {
            username: getValues('username'),
        };
        setIsLoading(true);

        try {
            const res = await api.get('api/users/check-username', { params });
            setValue('usernameCheckErr', false);
            trigger();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setValue('usernameCheckErr', true);
                trigger();
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Controller
                name="username"
                control={control}
                defaultValue={getValues('username') || ''}
                rules={{
                    validate: {
                        isValidUsername: (value) => {
                            const isLengthValid =
                                value.length >= 8 && value.length <= 15;
                            const isAlphanumeric = /^[A-Za-z0-9]+$/.test(value);

                            const isValid = isLengthValid && isAlphanumeric;
                            setValue('usernameErr', !isValid);

                            if (!isLengthValid) {
                                return '아이디는 8자 이상 15자 이하로 입력해주세요.';
                            }

                            if (!isAlphanumeric) {
                                return '아이디는 특수 문자를 포함할 수 없어요.';
                            }

                            return true;
                        },
                        isNonCheck: () => {
                            const usernameCheckErr =
                                getValues('usernameCheckErr');
                            if (usernameCheckErr === null) {
                                setAuthStep(false);
                                return '아이디 중복 확인을 진행해주세요.';
                            } else if (usernameCheckErr === true) {
                                return '이미 사용중인 아이디에요.';
                            }
                            return true;
                        },
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <BaseInput
                            {...field}
                            placeholder="아이디"
                            onChange={(e) => {
                                field.onChange(e);
                                setValue('usernameCheckErr', null);
                            }}
                        />
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error?.message}
                            </p>
                        )}
                        {getValues('usernameCheckErr') === false && (
                            <p className="success-green">
                                사용 가능한 아이디에요.
                            </p>
                        )}
                        {isLoading ? (
                            <EdgeButton>
                                <Loading />
                            </EdgeButton>
                        ) : (
                            <EdgeButton
                                disabled={getValues('usernameErr')}
                                onClick={checkUsername}
                            >
                                중복 확인
                            </EdgeButton>
                        )}
                    </>
                )}
            ></Controller>
            <Controller
                name="password"
                control={control}
                defaultValue={getValues('password') || ''}
                rules={{
                    validate: {
                        isValidLength: (value) => {
                            const isValid = /^.{8,25}$/.test(value);
                            setValue('passwordErr', !isValid);
                            return (
                                isValid ||
                                '비밀번호는 8자 이상 25자 이하로 입력해주세요.'
                            );
                        },
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <div className="relative">
                            <BaseInput
                                {...field}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="비밀번호"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                            />
                            <div
                                className="absolute top-[0.57rem] right-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <IoLockOpen />
                                ) : (
                                    <IoLockClosedSharp />
                                )}
                            </div>
                        </div>

                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error?.message}
                            </p>
                        )}
                    </>
                )}
            ></Controller>
            <Controller
                name="confirmPassword"
                defaultValue={getValues('confirmPassword') || ''}
                control={control}
                rules={{
                    validate: (value) => {
                        return (
                            value === getValues('password') ||
                            '비밀번호가 일치하지 않아요.'
                        );
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <BaseInput
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="비밀번호 확인"
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                        />
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error?.message}
                            </p>
                        )}
                    </>
                )}
            ></Controller>
        </div>
    );
}

// checkingUsername 없어도 될것같긴 한데..
