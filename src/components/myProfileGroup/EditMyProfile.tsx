import axios from 'axios';
import { api } from '../../services/api';
import RedButton from '../button/RedButton';
import EditDepartment from './EditGroup/EditDepartment';
import EditMBTI from './EditGroup/EditMBTI';
import EditNickname from './EditGroup/EditNickname';
import EditPassword from './EditGroup/EditPassword';
import { useAuth } from '../../hooks/useAuth';

export default function EditMyProfile() {
    const { logout } = useAuth();

    const withdrawClick = async () => {
        let isConfirm = confirm('정말로 탈퇴하시겠습니까?');

        if (!isConfirm) {
            return Promise.reject();
        }

        try {
            const res = await api.post('/api/users/withdraw');
            alert(JSON.stringify(res.data.message));
            logout();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(JSON.stringify(err?.response?.data.message));
            }
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-14">
                <div className="">
                    <EditPassword />
                </div>
                <div className="">
                    <EditNickname />
                </div>
                <div className="">
                    <EditMBTI />
                </div>
                <div className="">
                    <EditDepartment />
                </div>
            </div>
            <div className="float-right mt-10">
                <RedButton onClick={withdrawClick}>탈퇴하기</RedButton>
            </div>
        </div>
    );
}
