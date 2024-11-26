import { useState } from 'react';
import EdgeButton from '../button/EdgeButton';
import BaseInput from '../input/BaseInput';
import Loading from '../Loading';
import { api } from '../../services/api';
import axios from 'axios';

interface ForgotID {
    email: string;
    msg: string;
    success: boolean | null;
}

export default function ForgotID() {
    const [forgotID, setForgotID] = useState<ForgotID>({
        email: '',
        msg: '',
        success: null,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const findID = async () => {
        const data = {
            email: forgotID.email,
        };
        setIsLoading(true);
        try {
            const res = await api.post('api/forgot/id', data);
            setForgotID((prev) => ({
                ...prev,
                msg: res.data.message,
                success: true,
            }));
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setForgotID((prev) => ({
                    ...prev,
                    msg: err.response?.data.message,
                    success: false,
                }));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForgotID((prev) => ({
            ...prev,
            email: e.target.value,
        }));
    };

    return (
        <div className="flex flex-col gap-2">
            <BaseInput
                placeholder="학교 아이디@cu.ac.kr"
                onChange={handleEmailChange}
            />
            {forgotID.msg && (
                <p className={forgotID.success ? 'success-green' : 'error-red'}>
                    {forgotID.msg}
                </p>
            )}
            {isLoading ? (
                <EdgeButton>
                    <Loading />
                </EdgeButton>
            ) : (
                <EdgeButton onClick={findID}>아이디 찾기</EdgeButton>
            )}
        </div>
    );
}
