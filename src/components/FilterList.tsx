import React, { useState } from 'react';

interface FilterListProps {
    filters: {
        id: string;
        type: string;
        name: string;
        value: any;
        active: boolean;
    }[];
    setFilters: React.Dispatch<
        React.SetStateAction<
            {
                id: string;
                type: string;
                name: string;
                value: any;
                active: boolean;
            }[]
        >
    >;
}

export default function FilterList({ filters, setFilters }: FilterListProps) {
    const defaultFilterClass =
        'border-2 px-2 py-1 rounded-full cursor-pointer duration-100';

    const activeFilterClass = 'bg-green-500 text-white';

    return (
        <div className="flex flex-wrap gap-2 border-2 p-2 rounded-xl text-sm">
            {filters.map((filter) => (
                <span
                    key={filter.id}
                    className={`${defaultFilterClass} ${
                        filter.active ? activeFilterClass : ''
                    }`}
                    onClick={() =>
                        setFilters((prevFilters) =>
                            prevFilters.map((pf) =>
                                pf.id === filter.id
                                    ? { ...pf, active: !pf.active }
                                    : pf
                            )
                        )
                    }
                >
                    {filter.name}
                </span>
            ))}
        </div>
    );
}
