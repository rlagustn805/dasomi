import { ReactNode } from 'react';

interface Props {
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
}

export default function BaseButton({
    className = 'base-btn',
    onClick,
    children,
    type = 'button',
    disabled,
}: Props) {
    return (
        <button
            className={className}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
