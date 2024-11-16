import BaseButton from './BaseButton';
import { ReactNode } from 'react';

interface Props {
    onClick?: () => void;
    children?: ReactNode;
}

export default function GreenButton({ onClick, children }: Props) {
    return (
        <BaseButton
            className="green-btn"
            onClick={onClick}
            children={children}
        />
    );
}
