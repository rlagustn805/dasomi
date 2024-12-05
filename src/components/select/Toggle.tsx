import React from 'react';

interface ToggleProps {
    options: { label: string; value: string | boolean | number }[];
    selectedValue: string | boolean | number;
    onChange: (value: string | boolean | number) => void;
    activeClassName?: string;
    inactiveClassName?: string;
}

const Toggle: React.FC<ToggleProps> = ({
    options,
    selectedValue,
    onChange,
    activeClassName = 'bg-green-500 text-white',
    inactiveClassName = 'bg-white text-black',
}) => {
    return (
        <div className="flex text-center rounded-lg border-black border-2 overflow-hidden">
            {options.map((option, index) => (
                <span
                    key={index}
                    className={`flex-1 cursor-pointer duration-200 p-1 ${
                        selectedValue === option.value
                            ? activeClassName
                            : inactiveClassName
                    }`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </span>
            ))}
        </div>
    );
};

export default Toggle;
