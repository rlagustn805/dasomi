import { Controller, useForm, useWatch } from 'react-hook-form';
import SelectBox from '../select/SelectBox';
import { dormitoryArr } from '../utils/array';
import Toggle from '../select/Toggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EdgeButton from '../button/EdgeButton';
import { api } from '../../services/api';
import axios from 'axios';
import Loading from '../Loading';
import { useState } from 'react';
import DcuImgModal from '../modal/DcuImageModal';
import BaseInput from '../input/BaseInput';

export interface RoomMateData {
    dormitory: string;
    person_room: string;
    friendly: number;
    indoor_eating: number;
    cleanliness: string;
    sleeping_habits: number;
    smoking: number;
    notes: string;
    room_id?: number;
    dcu_img: string;
    talk_link: string;
    reservation_status: string;
}

export interface RoomMateProps {
    isEdit?: boolean;
    selectedRoom: RoomMateData | undefined;
    setModalOpen: (isOpen: boolean) => void;
}

export default function CreateMyRoomMate({
    isEdit = false,
    selectedRoom,
    setModalOpen,
}: RoomMateProps) {
    const {
        getValues,
        control,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<RoomMateData>({
        mode: 'onChange',
        defaultValues: selectedRoom || {
            dormitory: '',
            person_room: '2',
            friendly: 1,
            indoor_eating: 1,
            cleanliness: 'medium',
            sleeping_habits: 1,
            smoking: 0,
            notes: '',
            dcu_img: 'dcu1',
            talk_link: '',
        },
    });

    const [imgModalOpen, setImgModalOpen] = useState(false);
    const [selectedImgId, setSelectedImgId] = useState<string>(
        getValues('dcu_img') || 'dcu1'
    );

    const handleImgClick = (id: string) => {
        setSelectedImgId(id);
        setValue('dcu_img', id);
        setImgModalOpen(false);
    };

    const dormitory = useWatch({ name: 'dormitory', control });
    const talk_link = useWatch({ name: 'talk_link', control });

    const createRoomMate = async (data: RoomMateData) => {
        const res = isEdit
            ? await api.put('/api/roommate/me', data)
            : await api.post('/api/roommate/me', data);
        return res.data;
    };

    const queryClient = useQueryClient();

    const { mutate: createRoommate, isPending } = useMutation({
        mutationFn: createRoomMate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myRoomMate'] });
            alert(isEdit ? '수정되었습니다.' : '등록되었습니다.'); //alert 추후 수정
            setModalOpen(false);
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err.response?.data.message));
            }
        },
    });

    const onSubmit = (data: RoomMateData) => {
        createRoommate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Controller
                name="dcu_img"
                control={control}
                defaultValue={getValues('dcu_img') || ''}
                render={({ field }) => (
                    <>
                        <div className="p-4 flex justify-center">
                            <div className="p-2 border-2 border-black rounded-xl">
                                <picture>
                                    <source
                                        srcSet={`src/assets/dcuCharacter/webp/${selectedImgId}.webp`}
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet={`src/assets/dcuCharacter/jpg/${selectedImgId}.jpg`}
                                        type="image/jpeg"
                                    />
                                    <img
                                        src={`src/assets/dcuCharacter/jpg/${selectedImgId}.jpg`}
                                        width={100}
                                        className="mb-5"
                                    />
                                </picture>
                                <EdgeButton
                                    onClick={() => setImgModalOpen(true)}
                                >
                                    이미지 등록
                                </EdgeButton>
                            </div>
                        </div>
                    </>
                )}
            ></Controller>

            <Controller
                name="dormitory"
                control={control}
                defaultValue={getValues('dormitory') || ''}
                render={({ field }) => (
                    <>
                        <p>기숙사 선택</p>
                        <SelectBox
                            {...field}
                            arr={dormitoryArr}
                            title="기숙사 선택"
                        />
                    </>
                )}
            ></Controller>
            <Controller
                name="person_room"
                control={control}
                render={({ field }) => (
                    <>
                        <p>인실</p>
                        <Toggle
                            options={[
                                { label: '2인실', value: '2' },
                                { label: '4인실', value: '4' },
                            ]}
                            selectedValue={field.value} // Controller에서 관리되는 값
                            onChange={field.onChange} // Controller의 onChange 사용
                        />
                    </>
                )}
            />
            <Controller
                name="friendly"
                control={control}
                render={({ field }) => (
                    <>
                        <p>룸메님!</p>
                        <Toggle
                            options={[
                                { label: '친해져요', value: 1 },
                                { label: '갠플해요', value: 0 },
                            ]}
                            selectedValue={field.value} // Controller에서 관리되는 값
                            onChange={field.onChange} // Controller의 onChange 사용
                        />
                    </>
                )}
            />
            <Controller
                name="indoor_eating"
                control={control}
                render={({ field }) => (
                    <>
                        <p>실내 취식</p>
                        <Toggle
                            options={[
                                { label: '가능', value: 1 },
                                { label: '불가능', value: 0 },
                            ]}
                            selectedValue={field.value} // Controller에서 관리되는 값
                            onChange={field.onChange} // Controller의 onChange 사용
                        />
                    </>
                )}
            />
            <Controller
                name="cleanliness"
                control={control}
                render={({ field }) => (
                    <>
                        <p>청결도</p>
                        <Toggle
                            options={[
                                { label: '상', value: 'high' },
                                { label: '중', value: 'medium' },
                                { label: '하', value: 'low' },
                            ]}
                            selectedValue={field.value} // Controller에서 관리되는 값
                            onChange={field.onChange} // Controller의 onChange 사용
                        />
                    </>
                )}
            />
            <Controller
                name="sleeping_habits"
                control={control}
                render={({ field }) => (
                    <>
                        <p>잠버릇</p>
                        <Toggle
                            options={[
                                { label: '있어요', value: 1 },
                                { label: '없어요', value: 0 },
                            ]}
                            selectedValue={field.value} // Controller에서 관리되는 값
                            onChange={field.onChange} // Controller의 onChange 사용
                        />
                    </>
                )}
            />
            <Controller
                name="smoking"
                control={control}
                render={({ field }) => (
                    <>
                        <p>흡연</p>
                        <Toggle
                            options={[
                                { label: '해요', value: 1 },
                                { label: '안해요', value: 0 },
                            ]}
                            selectedValue={field.value} // Controller에서 관리되는 값
                            onChange={field.onChange} // Controller의 onChange 사용
                        />
                    </>
                )}
            />
            <Controller
                name="talk_link"
                control={control}
                defaultValue={getValues('talk_link') || ''}
                rules={{
                    required: true,
                    pattern: {
                        value: /^https:\/\/open\.kakao\.com\//,
                        message: '카톡 오픈채팅 링크를 입력해주세요.',
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <p>카톡 오픈채팅 링크 입력</p>
                        <BaseInput
                            {...field}
                            placeholder="카톡 오픈채팅 링크를 입력해주세요."
                            value={getValues('talk_link') || ''}
                        ></BaseInput>
                        {fieldState.error && (
                            <span className="error-red">
                                {fieldState.error.message}
                            </span>
                        )}
                    </>
                )}
            ></Controller>
            <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                    <>
                        <div>
                            <p>특이사항</p>
                            <textarea
                                {...field}
                                placeholder={`하고 싶은 말이 있다면 남겨주세요! ${'\n'} ex. 잠버릇, 수면 주기 등 (선택)`}
                                className="resize-none w-full bg-gray-100 p-2"
                            ></textarea>
                        </div>
                    </>
                )}
            />
            <DcuImgModal
                modalOpen={imgModalOpen}
                setModalOpen={setImgModalOpen}
                handleImgClick={handleImgClick}
            />
            {isPending ? (
                <EdgeButton>
                    <Loading />
                </EdgeButton>
            ) : (
                <EdgeButton
                    type="submit"
                    disabled={!dormitory || !talk_link || errors.talk_link}
                >
                    {isEdit ? '수정하기' : '등록하기'}
                </EdgeButton>
            )}
        </form>
    );
}
