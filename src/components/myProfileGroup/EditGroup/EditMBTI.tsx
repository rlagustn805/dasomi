import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { api } from '../../../services/api';
import { mbtiArr } from '../../utils/array';
import SelectBox from '../../select/SelectBox';
import EdgeButton from '../../button/EdgeButton';
import Loading from '../../Loading';
import axios from 'axios';

interface MBTI {
    mbti: string;
}

export default function EditMBTI() {
    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<MBTI>({
        mode: 'onChange',
        defaultValues: {
            mbti: '',
        },
    });

    const mbti = useWatch({ name: 'mbti', control });

    const editMBTI = async (data: MBTI) => {
        const res = await api.post('/api/my/edit/mbti', data);
        return res.data;
    };

    const queryClient = useQueryClient();

    const { mutate: updateMBTI, isPending } = useMutation({
        mutationFn: editMBTI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('MBTI가 변경되었습니다.');
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err.response?.data.message));
            }
        },
    });

    const onSubmit = (data: MBTI) => {
        updateMBTI(data);
    };
    return (
        <form
            className="p-2 flex flex-col shadow-lg gap-2 bg-gray-100 rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
        >
            <p>MBTI 변경</p>
            <Controller
                name="mbti"
                control={control}
                defaultValue={getValues('mbti') || ''}
                render={({ field }) => (
                    <SelectBox {...field} arr={mbtiArr} title="MBTI" />
                )}
            />
            {isPending ? (
                <EdgeButton>
                    <Loading />
                </EdgeButton>
            ) : (
                <EdgeButton disabled={!mbti} type="submit">
                    변경하기
                </EdgeButton>
            )}
        </form>
    );
}
