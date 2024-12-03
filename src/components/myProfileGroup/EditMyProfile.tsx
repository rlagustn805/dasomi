import EditNickname from './EditGroup/EditNickname';
import EditPassword from './EditGroup/EditPassword';

export default function EditMyProfile() {
    return (
        <div>
            <EditPassword />
            <EditNickname />
        </div>
    );
}
