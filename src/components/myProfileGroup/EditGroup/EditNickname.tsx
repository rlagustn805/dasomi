import BaseInput from '../../input/BaseInput';
import EdgeButton from '../../button/EdgeButton';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Loading from '../../Loading';
import { useState } from 'react';
import axios from 'axios';
import { api } from '../../../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditNicknameData {
    newNickname: string;
    nicknameCheckErr: boolean | null;
}

interface checkNicknameData {
    msg: string;
    success: boolean;
}

export default function EditNickname() {
    const {
        control,
        getValues,
        setValue,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<EditNicknameData>({
        mode: 'onChange',
    });

    const nicknameCheckErr = useWatch({ control, name: 'nicknameCheckErr' });

    const [checkNicknameData, setCheckNicknameData] =
        useState<checkNicknameData>({
            msg: '',
            success: false,
        });

    const hasErrors = Object.keys(errors).length > 0;

    const checkNewNickname = async () => {
        const params = {
            nickname: getValues('newNickname'),
        };
        try {
            const res = await api.get('api/users/check-nickname', { params });
            setCheckNicknameData((prev) => ({
                ...prev,
                msg: res.data.message,
                success: true,
            }));
            setValue('nicknameCheckErr', false);
            trigger();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setCheckNicknameData((prev) => ({
                    ...prev,
                    msg: err.response?.data.message,
                    success: false,
                }));
            }
            setValue('nicknameCheckErr', false);
            trigger();
        }
    };

    const editNickname = async (data: EditNicknameData) => {
        const res = await api.post('/api/my/edit/nickname', data);
        return res.data.message;
    };

    const queryClient = useQueryClient();

    const { mutate: updateNickname, isPending } = useMutation({
        mutationFn: editNickname,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('닉네임이 변경되었습니다.');
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err.response?.data.message));
            }
        },
    });

    const onSubmit = (data: EditNicknameData) => {
        updateNickname(data);
    };

    return (
        <form
            className="p-2 flex flex-col shadow-lg gap-2 bg-gray-100 rounded-lg h-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <p>닉네임 변경</p>
            <Controller
                name="newNickname"
                control={control}
                defaultValue={getValues('newNickname') || ''}
                rules={{
                    required: '닉네임을 입력해주세요.',
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
                                setValue('nicknameCheckErr', null);
                                trigger();
                                setCheckNicknameData((prev) => ({
                                    ...prev,
                                    msg: '',
                                    success: false,
                                }));
                            }}
                            placeholder="변경할 닉네임 입력"
                        />
                        {fieldState.error && (
                            <p className="error-red">
                                {fieldState.error.message}
                            </p>
                        )}
                        {checkNicknameData.msg && (
                            <p
                                className={
                                    checkNicknameData.success
                                        ? 'success-green'
                                        : 'error-red'
                                }
                            >
                                {checkNicknameData.msg}
                            </p>
                        )}
                        <EdgeButton
                            onClick={checkNewNickname}
                            disabled={getValues('newNickname') === ''}
                        >
                            중복 확인
                        </EdgeButton>
                    </>
                )}
            ></Controller>
            {isPending ? (
                <EdgeButton>
                    <Loading />
                </EdgeButton>
            ) : (
                <EdgeButton
                    disabled={hasErrors || !checkNicknameData.success}
                    type="submit"
                >
                    변경하기
                </EdgeButton>
            )}
        </form>
    );
}
