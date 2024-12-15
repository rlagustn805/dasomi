import SelectDcuImg from '../SelectDcuImg';
import BaseModal from './BaseModal';

interface DcuImgModalProps {
    modalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    isEdit?: boolean;
    handleImgClick: (id: string) => void;
}

export default function DcuImgModal({
    modalOpen,
    setModalOpen,
    handleImgClick,
}: DcuImgModalProps) {
    return (
        <BaseModal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
        >
            <SelectDcuImg handleImgClick={handleImgClick} />
        </BaseModal>
    );
}
