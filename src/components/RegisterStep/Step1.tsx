import { Controller, useFormContext } from 'react-hook-form';
import BaseInput from '../input/BaseInput';
import EdgeButton from '../button/EdgeButton';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Step1Props {
    setAuthStep: (value: boolean) => void;
}

interface TimerProps {
    time: number;
    status: boolean;
}

export default function Step1({ setAuthStep }: Step1Props) {
    const { control, setValue, getValues, trigger } = useFormContext();
    const [sendingEmail, setSendingEmail] = useState<TimerProps>({
        time: 300,
        status: false,
    });

    const [verifyEmailMsg, setVerifyEmailMsg] = useState<string>('');
    const [verifySuccess, setVerifySuccess] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let timeInterval: NodeJS.Timeout | null = null;

        if (sendingEmail.status === true) {
            timeInterval = setInterval(() => {
                setSendingEmail((prev) => ({
                    ...prev,
                    time: prev.time - 1,
                }));
            }, 1000);
        }

        if (sendingEmail.time <= 0 && sendingEmail.status) {
            if (timeInterval) {
                setValue('emailErr', true);
                clearInterval(timeInterval);
                trigger('email');
            }

            setSendingEmail((prev) => ({
                ...prev,
                time: 300,
                status: false,
            }));
        }

        return () => {
            if (timeInterval) {
                clearInterval(timeInterval);
            }
        };
    }, [sendingEmail.time, sendingEmail.status]);

    const minutes = String(Math.floor(sendingEmail.time / 60)).padStart(2, '0');
    const seconds = String(Math.floor(sendingEmail.time % 60)).padStart(2, '0');

    const sendEmail = async () => {
        setIsLoading(true);

        const data = {
            email: getValues('email'),
        };
        try {
            const res = await api.post(`api/users/email/send`, data);
            setValue('emailErr', false);
            setSendingEmail((prev) => ({
                ...prev,
                status: true,
            }));
            trigger();
            console.log(res.data.message);
        } catch (err) {
            console.error(err); // or Axios 에러 변경
        } finally {
            setIsLoading(false);
        }
    };

    const verifyEmail = async () => {
        const data = {
            email: getValues('email'),
            emailCode: getValues('emailCode'),
        };

        try {
            const res = await api.post('api/users/email/verify', data);
            setVerifyEmailMsg(res.data.message);
            setVerifySuccess(true);
            setAuthStep(true);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setVerifyEmailMsg(err.response?.data.message);
                setVerifySuccess(false);
                setAuthStep(false);
            }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Controller
                name="email"
                control={control}
                defaultValue={getValues('email')}
                rules={{
                    required: '학교 아이디를 입력해주세요.',
                    validate: {
                        hasPrefix: (value) =>
                            value.split('@')[0]
                                ? true
                                : '학교 아이디를 입력해주세요.',
                        isEmailErr: () => {
                            return (
                                !getValues('emailErr') ||
                                '이메일 인증을 진행해 주세요.'
                            );
                        },
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <BaseInput
                            {...field}
                            placeholder="학교 아이디"
                            value={field.value?.split('@')[0] || ''}
                            onChange={(e) => {
                                const emailPrefix = e.target.value;
                                field.onChange(`${emailPrefix}@cu.ac.kr`);
                                setAuthStep(false);
                                setValue('emailErr', true);
                            }}
                        />
                        <BaseInput
                            value={'@cu.ac.kr'}
                            readonly={true}
                        ></BaseInput>
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error.message}
                            </p>
                        )}
                        {isLoading ? (
                            <EdgeButton>
                                <Loading />
                            </EdgeButton>
                        ) : !sendingEmail.status ? (
                            <EdgeButton onClick={sendEmail}>
                                인증번호 전송
                            </EdgeButton>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <EdgeButton>
                                    {minutes} : {seconds}
                                </EdgeButton>
                                <EdgeButton>
                                    <Link
                                        to={
                                            'https://red.cu.ac.kr/DCU_Portal/pages/Logon.jsp'
                                        }
                                        target="_blank"
                                    >
                                        메일 바로가기
                                    </Link>
                                </EdgeButton>

                                <p className="text-xs">
                                    메일 도착 약 1분 소요됩니다.
                                </p>
                            </div>
                        )}
                    </>
                )}
            ></Controller>
            <Controller
                name="emailCode"
                control={control}
                defaultValue=""
                rules={{ required: '인증번호를 확인해주세요' }}
                render={({ field, fieldState }) => (
                    <>
                        <BaseInput {...field} placeholder="인증번호 입력" />
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error.message}
                            </p>
                        )}
                        {verifyEmailMsg && (
                            <p
                                className={
                                    verifySuccess
                                        ? 'success-green'
                                        : 'error-red'
                                }
                            >
                                {verifyEmailMsg}
                            </p>
                        )}
                        <EdgeButton
                            onClick={verifyEmail}
                            disabled={getValues('emailErr')}
                        >
                            인증번호 확인
                        </EdgeButton>
                    </>
                )}
            ></Controller>
        </div>
    );
}
