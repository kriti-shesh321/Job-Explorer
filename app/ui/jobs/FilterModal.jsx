'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterModal({
  modalOpen,
  setModalOpen,
  filterOptions,
  selectedFilters,
  setSelectedFilters,
  applyFilters,
  updateFilters
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState(filterOptions[0]?.name || '');

  const clearAllFilters = () => {
    setSelectedFilters({});

    const params = new URLSearchParams(searchParams);
    filterOptions.forEach(opt => params.delete(opt.name));
    params.delete('page');

    router.replace(`${pathname}?${params.toString()}`);
    setModalOpen(false);
  };


  const selectedFilter = filterOptions.find(f => f.name === activeFilter);

  return (
    <div className={`${modalOpen ? 'pointer-events-auto' : 'pointer-events-none'} fixed inset-0 bg-opacity-30 z-40 flex items-center justify-center`}>
      <div className="bg-white w-[95%] sm:w-[90%] md:w-2/3 max-w-3xl rounded-lg p-4 sm:p-6 relative flex flex-row h-[50vh] border border-gray-300 shadow-xl text-xs sm:text-sm">
        {/* Close button */}
        <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-gray-500">
          <IoClose size={20} />
        </button>

        {/* Left Column: Filter Labels */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto pr-2">
          <h2 className="text-sm sm:text-base font-semibold mb-2 sm:mb-4">Filters</h2>
          <ul className="space-y-1 sm:space-y-2">
            {filterOptions.map((filter) => (
              <li
                key={filter.name}
                className={`cursor-pointer px-2 py-1 sm:px-3 sm:py-2 rounded-md ${activeFilter === filter.name
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
                  }`}
                onClick={() => setActiveFilter(filter.name)}
              >
                {filter.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Filter Options */}
        <div className="w-full pl-3 overflow-y-auto">
          {selectedFilter && (
            <div>
              <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">{selectedFilter.label}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {selectedFilter.options.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2">
                    <input
                      type={selectedFilter.type === 'radio' ? 'radio' : 'checkbox'}
                      name={selectedFilter.name}
                      value={opt.value}
                      checked={(selectedFilters[selectedFilter.name] || []).includes(opt.value)}
                      onChange={() =>
                        updateFilters(selectedFilter.name, opt.value, selectedFilter.type === 'checkbox')
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="absolute bottom-3 left-0 w-full flex justify-end gap-4 px-4 sm:px-6">
          <button onClick={clearAllFilters} className="text-orange-500 text-xs sm:text-sm">
            Clear All
          </button>
          <button onClick={applyFilters} className="rounded-md bg-blue-600 text-white px-3 py-1 text-xs sm:text-sm">
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
