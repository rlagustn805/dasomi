import BaseButton from './BaseButton';
import { ReactNode } from 'react';

interface Props {
    onClick?: () => void;
    children?: ReactNode;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean | any;
}

export default function EdgeButton({
    onClick,
    children,
    type = 'button',
    disabled,
}: Props) {
    return (
        <BaseButton
            className=" bg-green-600 text-white rounded-lg font-bold px-4 py-2 hover:bg-green-500 transition duration-150 disabled:bg-gray-300"
            onClick={onClick}
            children={children}
            type={type}
            disabled={disabled}
        />
    );
}
