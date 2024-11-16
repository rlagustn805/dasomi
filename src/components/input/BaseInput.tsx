import React from 'react';

interface Props {
    type?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function BaseInput({
    type = 'text',
    value,
    onChange,
    placeholder,
}: Props) {
    return (
        <input
            className="border-2 border-black rounded-lg px-2 py-1"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}
