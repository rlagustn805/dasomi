import BaseButton from './BaseButton';
import { ReactNode } from 'react';

interface Props {
    onClick?: () => void;
    children?: ReactNode;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
}

export default function GrayButton({
    onClick,
    children,
    type = 'button',
    disabled,
}: Props) {
    return (
        <BaseButton
            className=" bg-gray-300 text-white rounded-lg font-bold px-4 py-2 cursor-not-allowed"
            onClick={onClick}
            children={children}
            type={type}
            disabled={disabled}
        />
    );
}
