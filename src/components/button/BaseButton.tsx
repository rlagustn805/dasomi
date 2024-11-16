import { ReactNode } from 'react';

interface Props {
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
}

export default function BaseButton({
    className = 'base-btn',
    onClick,
    children,
}: Props) {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}
