import BaseButton from './BaseButton';
import { ReactNode } from 'react';

interface Props {
    onClick?: () => void;
    children?: ReactNode;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
}

export default function GreenButton({
    onClick,
    children,
    type = 'button',
    disabled,
}: Props) {
    return (
        <BaseButton
            className="green-btn"
            onClick={onClick}
            children={children}
            type={type}
            disabled={disabled}
        />
    );
}
