import { Controller, useFormContext, useWatch } from 'react-hook-form';

import EdgeButton from '../button/EdgeButton';
import BaseInput from '../input/BaseInput';
import SelectBox from '../select/SelectBox';
import { mbtiArr, departmentArr, studentIdArr } from '../utils/array.ts';
import { useEffect, useState } from 'react';
import Loading from '../Loading.tsx';
import { api } from '../../services/api.tsx';
import axios from 'axios';
import TermsModal from '../modal/TermsModal.tsx';

interface Step3rops {
    setAuthStep: (value: boolean) => void;
}

export default function Step3({ setAuthStep }: Step3rops) {
    const { control, setValue, getValues, trigger } = useFormContext();
    const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
    const [subDepartments, setSubDepartments] = useState<string[]>([]);
    const [checkNicknameMsg, setCheckNicknameMsg] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTerms, setIsTerms] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const nicknameCheckErr = useWatch({ control, name: 'nicknameCheckErr' });
    const selectedGender = useWatch({ control, name: 'gender' });
    const nickname = useWatch({ control, name: 'nickname' });
    const studentId = useWatch({ control, name: 'studentId' });
    const mbti = useWatch({ control, name: 'mbti' });
    const major = useWatch({ control, name: 'major' });
    const department = useWatch({ control, name: 'department' });

    const checkNickname = async () => {
        const params = {
            nickname: getValues('nickname'),
        };
        setIsLoading(true);
        try {
            const res = await api.get('api/users/check-nickname', { params });
            setCheckNicknameMsg(res.data.message);
            setValue('nicknameCheckErr', false);

            trigger();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setCheckNicknameMsg(err.response?.data.message);
                setValue('nicknameCheckErr', true);
                trigger();
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (major) {
            setSelectedMajor(major);
            setSubDepartments(departmentArr[major] || []);
        }
    }, [major]);

    useEffect(() => {
        const isValid =
            nicknameCheckErr === false &&
            mbti &&
            mbti !== 'MBTI' &&
            studentId &&
            studentId !== '학번' &&
            major &&
            major !== '단과대학' &&
            department &&
            department !== '학과' &&
            isTerms === true;

        setAuthStep(isValid);
    }, [nicknameCheckErr, mbti, studentId, major, department, isTerms]);

    return (
        <div className="flex flex-col gap-2">
            <Controller
                name="nickname"
                control={control}
                defaultValue={getValues('nickname') || ''}
                rules={{
                    validate: {
                        isValidNickname: (value) => {
                            const isValid = /^[A-Za-z0-9가-힣]{3,8}$/.test(
                                value
                            );

                            if (!isValid) {
                                return '닉네임은 3자 이상 8자 이하, 특수문자 미포함이에요.';
                            }

                            if (getValues('nicknameCheckErr') === null) {
                                return '닉네임 중복 확인을 해주세요.';
                            }

                            return true;
                        },
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <BaseInput
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                setCheckNicknameMsg('');
                                setValue('nicknameCheckErr', null);
                                trigger();
                            }}
                            placeholder="닉네임"
                        />
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error.message}
                            </p>
                        )}
                        {checkNicknameMsg && (
                            <p
                                className={
                                    getValues('nicknameCheckErr')
                                        ? 'error-red'
                                        : 'success-green'
                                }
                            >
                                {checkNicknameMsg}
                            </p>
                        )}

                        {isLoading ? (
                            <Loading />
                        ) : (
                            <EdgeButton
                                onClick={checkNickname}
                                disabled={
                                    !getValues('nickname') || // 닉네임이 비어있으면 비활성화
                                    /^[A-Za-z0-9가-힣]{3,8}$/.test(
                                        getValues('nickname')
                                    ) === false
                                }
                            >
                                중복 확인
                            </EdgeButton>
                        )}
                    </>
                )}
            ></Controller>
            <Controller
                name="studentId"
                control={control}
                defaultValue={getValues('studentId') || ''}
                render={({ field }) => (
                    <SelectBox {...field} arr={studentIdArr} title="학번" />
                )}
            ></Controller>
            <div className="flex text-center rounded-lg border-black border-2 overflow-hidden">
                <span
                    className={`flex-1 cursor-pointer duration-200 ${
                        selectedGender === 'M'
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-black'
                    }`}
                    onClick={() => setValue('gender', 'M')}
                >
                    남자
                </span>
                <span
                    className={`flex-1 cursor-pointer duration-200 ${
                        selectedGender === 'F'
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-black'
                    }`}
                    onClick={() => setValue('gender', 'F')}
                >
                    여자
                </span>
            </div>
            <Controller
                name="mbti"
                control={control}
                defaultValue={getValues('mbti') || ''}
                render={({ field }) => (
                    <SelectBox {...field} arr={mbtiArr} title="MBTI" />
                )}
            />
            <Controller
                name="major"
                control={control}
                defaultValue={getValues('major') || ''}
                render={({ field }) => (
                    <SelectBox
                        {...field}
                        arr={Object.keys(departmentArr)}
                        title="단과대학"
                    />
                )}
            ></Controller>
            <Controller
                name="department"
                control={control}
                defaultValue={getValues('department') || ''}
                render={({ field }) => (
                    <SelectBox {...field} arr={subDepartments} title="학과" />
                )}
            ></Controller>
            <Controller
                name="terms"
                control={control}
                defaultValue={isTerms}
                render={({ field }) => (
                    <div className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={isTerms}
                            onChange={(e) => setIsTerms(e.target.checked)}
                        />
                        <span
                            className="text-sm hover:underline cursor-pointer"
                            onClick={() => setIsModalOpen(!isModalOpen)}
                        >
                            이용 약관 동의
                        </span>
                    </div>
                )}
            ></Controller>

            <TermsModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen} />
        </div>
    );
}
