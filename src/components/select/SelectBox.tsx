import React, { forwardRef } from 'react';

interface SelectBoxProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string | number;
    arr: string[];
    title: string;
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
    ({ onChange, value, arr, title }, ref) => {
        return (
            <div>
                <select
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    className="border-2 border-black rounded-lg px-2 py-1 bg-white w-full"
                >
                    <option value="" disabled>
                        {title}
                    </option>
                    {arr.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

export default SelectBox;
