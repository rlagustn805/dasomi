import { Filters } from '../pages/RoomMateList';
import Toggle from './select/Toggle';

interface ToggleOption {
    label: string;
    value: string | number | boolean;
}

interface ToggleListProps {
    filters: Filters;
    onFilterChange: (
        filterKey: keyof Filters,
        value: string | number | boolean
    ) => void;
}

export const FilterList: React.FC<ToggleListProps> = ({
    filters,
    onFilterChange,
}) => {
    const toggleConfig = [
        {
            key: 'person_room',
            label: '인실',
            options: [
                { label: '전체', value: 'all' },
                { label: '2인실', value: '2' },
                { label: '4인실', value: '4' },
            ],
        },
        {
            key: 'gender',
            label: '성별',
            options: [
                { label: '전체', value: 'all' },
                { label: '남자', value: 'M' },
                { label: '여자', value: 'F' },
            ],
        },
        {
            key: 'friendly',
            label: '성향',
            options: [
                { label: '전체', value: 'all' },
                { label: '친해져요', value: 1 },
                { label: '갠플해요', value: 0 },
            ],
        },
        {
            key: 'indoor_eating',
            label: '실내 취식',
            options: [
                { label: '전체', value: 'all' },
                { label: '해요', value: 1 },
                { label: '안해요', value: 0 },
            ],
        },
        {
            key: 'cleanliness',
            label: '청결도',
            options: [
                { label: '전체', value: 'all' },
                { label: '상', value: 'high' },
                { label: '중', value: 'medium' },
                { label: '하', value: 'low' },
            ],
        },
        {
            key: 'smoking',
            label: '흡연',
            options: [
                { label: '전체', value: 'all' },
                { label: '해요', value: 1 },
                { label: '안해요', value: 0 },
            ],
        },
    ];

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-wrap gap-4">
            {toggleConfig.map((toggle) => (
                <div
                    key={toggle.key}
                    className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/4"
                >
                    <span className="text-sm font-semibold text-gray-700">
                        {toggle.label}
                    </span>
                    <Toggle
                        options={toggle.options}
                        selectedValue={filters[toggle.key as keyof Filters]}
                        onChange={(value: string | number | boolean) =>
                            onFilterChange(toggle.key as keyof Filters, value)
                        }
                    />
                </div>
            ))}
        </div>
    );
};
