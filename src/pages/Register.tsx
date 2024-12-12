import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Step1 from '../components/RegisterStep/Step1';
import Step2 from '../components/RegisterStep/Step2';
import Step3 from '../components/RegisterStep/Step3';
import GreenButton from '../components/button/GreenButton';
import { api } from '../services/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormValues extends ErrorStatus {
    username: string; // ok
    password: string; // ok
    email: string; //ok
    emailCode: string; //ok
    gender: string;
    mbti: string;
    department: string;
    student_id: string;
    nickname: string;
}

interface ErrorStatus {
    emailErr: boolean; //ok
    usernameErr: boolean;
    usernameCheckErr: boolean | null;
    passwordErr: boolean;
    nicknameCheckErr: boolean | null;
}

interface AuthStepStatus {
    authStep1: boolean;
    authStep2: boolean;
    authStep3: boolean;
}

export default function RegisterTest() {
    const [step, setStep] = useState<number>(0);
    const [authStep, setAuthStep] = useState<AuthStepStatus>({
        authStep1: false,
        authStep2: false,
        authStep3: false,
    });
    const [isAllAuthStepsValid, setIsAllAuthStepsValid] = useState(false);
    const [registerErr, setRegisterErr] = useState<string>('');

    const navigate = useNavigate();

    const methods = useForm<FormValues>({
        mode: 'onChange', // 실시간 유효성 검사를 위해 추가
        defaultValues: {
            emailErr: true,
            usernameErr: true,
            usernameCheckErr: null,
            gender: 'M',
        },
    });

    useEffect(() => {
        const allValid = Object.values(authStep).every(
            (value) => value === true
        );
        setIsAllAuthStepsValid(allValid);
    }, [authStep]);

    const register = async (data: FormValues) => {
        try {
            const res = await api.post('/api/users/register', data);
            alert(JSON.stringify(res.data.message));
            navigate('/login');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setRegisterErr(err.response?.data.message);
            }
        }
    };

    const updateAuthStepStatus = (
        stepKey: keyof AuthStepStatus,
        value: boolean
    ) => {
        setAuthStep((prev) => ({
            ...prev,
            [stepKey]: value,
        }));
    };

    const isCurrentStepValid = async () => {
        const stepKey = `authStep${step + 1}` as keyof AuthStepStatus; //키가 존재하면서 해당 단계의 유효성 검사를 통과
        const isStepValid = await methods.trigger(); // 현재 단계의 모든 필드 유효성 검사

        return authStep[stepKey] && isStepValid;
    };

    const onNext = async () => {
        const isStepValid = await isCurrentStepValid();

        if (!isStepValid) {
            // 인증되지 않았거나 유효성 검사 실패 시 다음 단계로 이동하지 않음
            return;
        }
        setStep((prev) => prev + 1);
    };

    const onPrev = () => {
        setStep((prev) => prev - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <Step1
                        setAuthStep={(value) =>
                            updateAuthStepStatus('authStep1', value)
                        }
                    />
                );
            case 1:
                return (
                    <Step2
                        setAuthStep={(value) =>
                            updateAuthStepStatus('authStep2', value)
                        }
                    />
                );
            case 2:
                return (
                    <Step3
                        setAuthStep={(value) =>
                            updateAuthStepStatus('authStep3', value)
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit((data) => register(data))}
                className="h-full"
            >
                <div className="h-full flex flex-col items-center justify-center gap-2 border-black border rounded-xl">
                    <div>
                        <p className="text-lg font-bold text-center mb-4">
                            회원가입 {step + 1} / 3
                        </p>
                        {renderStep()}
                        <div className="mt-2">
                            {step > 0 && (
                                <GreenButton onClick={onPrev}>이전</GreenButton>
                            )}
                            {step < 2 && (
                                <div className="float-right">
                                    <GreenButton
                                        onClick={onNext}
                                        disabled={
                                            !authStep[
                                                `authStep${
                                                    step + 1
                                                }` as keyof AuthStepStatus
                                            ]
                                        } // 유효성 검증 결과에 따라 비활성화 (그 key의 value 값 가져와서 판단 - 기본값 false에서 true인지 판단)
                                    >
                                        다음
                                    </GreenButton>
                                </div>
                            )}
                        </div>
                    </div>
                    {step === 2 && (
                        <GreenButton
                            type="submit"
                            disabled={!isAllAuthStepsValid} // 모든 authStep이 true일 때만 활성화
                        >
                            회원가입
                        </GreenButton>
                    )}
                    {registerErr && <p className="error-red">{registerErr}</p>}
                </div>
            </form>
        </FormProvider>
    );
}
