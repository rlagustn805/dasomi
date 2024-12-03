import EditDepartment from './EditGroup/EditDepartment';
import EditMBTI from './EditGroup/EditMBTI';
import EditNickname from './EditGroup/EditNickname';
import EditPassword from './EditGroup/EditPassword';

export default function EditMyProfile() {
    return (
        <div className="flex flex-col gap-4 mt-10 md:flex-row">
            <div className="flex-1">
                <EditPassword />
            </div>
            <div className="flex-1">
                <EditNickname />
            </div>
            <div className="flex-1">
                <EditMBTI />
            </div>
            <div className="flex-1">
                <EditDepartment />
            </div>
        </div>
    );
}
