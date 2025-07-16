import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';

export default function FilterDropdown({ filter, applyFilters, clearFilter, updateFilters, selectedFilters, openFilter, setOpenFilter }) {
    return (
        <div className="relative">
            <button
                onClick={() => setOpenFilter(openFilter === filter.name ? null : filter.name)}
                className={clsx(
                    'flex items-center gap-1 border px-4 py-1 rounded-full text-sm',
                    selectedFilters[filter.name]?.length && 'border-blue-500 text-blue-600'
                )}
            >
                {filter.label} <IoIosArrowDown />
            </button>
            {openFilter === filter.name && (
                <div className="absolute top-10 left-0 z-30 bg-white rounded-lg shadow-lg p-4 w-52">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{filter.label}</span>
                        <button onClick={() => clearFilter(filter.name)} className="text-sm text-orange-500">Clear</button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {filter.options.map((opt, index) => (
                            <label key={index} className="flex items-center gap-2 text-sm">
                                <input
                                    type={filter.type === 'radio' ? 'radio' : 'checkbox'}
                                    name={filter.name}
                                    value={opt.value}
                                    checked={(selectedFilters[filter.name] || []).includes(opt.value)}
                                    onChange={() => updateFilters(filter.name, opt.value, filter.type === 'checkbox')}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                    <button
                        onClick={applyFilters}
                        className="mt-3 w-full rounded-md bg-blue-600 text-white text-sm py-1"
                    >
                        Apply Filter
                    </button>
                </div>
            )}
        </div>
    );
}