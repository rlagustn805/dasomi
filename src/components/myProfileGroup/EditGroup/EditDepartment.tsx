import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { api } from '../../../services/api';
import SelectBox from '../../select/SelectBox';
import EdgeButton from '../../button/EdgeButton';
import Loading from '../../Loading';
import axios from 'axios';
import { departmentArr } from '../../utils/array';
import { useEffect, useState } from 'react';

interface DepartmentData {
    major: string;
    department: string;
}

export default function EditDepartment() {
    const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
    const [subDepartments, setSubDepartments] = useState<string[]>([]);

    const { control, getValues, handleSubmit } = useForm<DepartmentData>({
        mode: 'onChange',
    });

    const major = useWatch({ control, name: 'major' });
    const department = useWatch({ control, name: 'department' });

    useEffect(() => {
        if (major) {
            setSelectedMajor(major);
            setSubDepartments(departmentArr[major] || []);
        }
    }, [major]);

    const editDepartment = async (data: DepartmentData) => {
        const res = await api.post('/api/my/edit/department', data);
        return res.data;
    };

    const queryClient = useQueryClient();

    const { mutate: updateDepartment, isPending } = useMutation({
        mutationFn: editDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('학과가 변경되었습니다.');
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err.response?.data.message));
            }
        },
    });

    const onSubmit = (data: DepartmentData) => {
        updateDepartment(data);
    };

    return (
        <form
            className="p-2 flex flex-col shadow-lg gap-2 bg-gray-100 rounded-lg h-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <p>학과 변경</p>
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
            {isPending ? (
                <EdgeButton>
                    <Loading />
                </EdgeButton>
            ) : (
                <EdgeButton type="submit" disabled={!department}>
                    변경하기
                </EdgeButton>
            )}
        </form>
    );
}
