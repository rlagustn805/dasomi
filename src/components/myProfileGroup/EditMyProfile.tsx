import EditDepartment from './EditGroup/EditDepartment';
import EditMBTI from './EditGroup/EditMBTI';
import EditNickname from './EditGroup/EditNickname';
import EditPassword from './EditGroup/EditPassword';

export default function EditMyProfile() {
    return (
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
    );
}
