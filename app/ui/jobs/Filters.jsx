'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FaFilter } from 'react-icons/fa6';

import clsx from 'clsx';
import FilterDropdown from "./FilterDropdown";
import FilterModal from "./FilterModal";

export default function JobFilters({ categories, tags, locations }) {
  const [openFilter, setOpenFilter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [pendingClearKey, setPendingClearKey] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initial = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'page' && key !== 'jobId') initial[key] = value.split(',');
    }
    setSelectedFilters(initial);
  }, [searchParams]);

  const updateFilters = (name, value, isMulti = false) => {
    setSelectedFilters((prev) => {
      const current = prev[name] || [];
      let updated;

      if (isMulti) {
        updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
      } else {
        updated = [value];
      }

      const result = { ...prev, [name]: updated };
      if (updated.length === 0) delete result[name];
      return result;
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    for (const key in selectedFilters) {
      if (selectedFilters[key].length) {
        params.set(key, selectedFilters[key].join(','));
      } else {
        params.delete(key);
      }
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
    setOpenFilter(null);
    setModalOpen(false);
  };

  const clearFilter = (key) => {
    setPendingClearKey(key);
  };

  useEffect(() => {
    if (pendingClearKey) {
      setSelectedFilters((prev) => {
        const updated = { ...prev };
        delete updated[pendingClearKey];
        return updated;
      });

      const params = new URLSearchParams(searchParams);
      params.delete(pendingClearKey);
      params.set('page', '1');
      router.replace(`${pathname}?${params.toString()}`);

      setPendingClearKey(null);
      setOpenFilter(null);
    }
  }, [pendingClearKey, router, pathname, searchParams]);

  const filterOptions = [
    {
      name: 'category_id',
      label: 'Category',
      options: categories.map((c) => ({ label: c.name, value: c.id })),
      type: 'radio',
    },
    {
      name: 'location',
      label: 'Location',
      options: locations.map((l) => ({ label: l, value: l })),
      type: 'checkbox',
    },
    {
      name: 'type',
      label: 'Type',
      options: ['Full-Time', 'Part-Time', 'Contract-based', 'Internship'].map((t) => ({ label: t, value: t })),
      type: 'checkbox',
    },
    {
      name: 'tag_ids',
      label: 'Tags',
      options: tags.map((t) => ({ label: t.name, value: t.id })),
      type: 'checkbox',
    },
    {
      name: 'posted',
      label: 'Posted',
      options: [
        { label: 'Last 24 hours', value: '1d' },
        { label: 'Last 7 days', value: '7d' },
        { label: 'Last 30 days', value: '30d' },
      ],
      type: 'radio',
    },
  ];

  return (
    <div className="w-full flex gap-[3%] py-4 items-center">
      {/* Primary Filters */}
      <div className="w-full flex gap-[2%]">
        {filterOptions.map((filter) => (
          <div
            key={filter.name}
            className={clsx(
              'hidden sm:flex',
              (filter.name === 'category_id' || filter.name === 'location' || filter.name === 'tag_ids') && 'flex'
            )}
          >
            <FilterDropdown
              filter={filter}
              applyFilters={applyFilters}
              updateFilters={updateFilters}
              clearFilter={clearFilter}
              selectedFilters={selectedFilters}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
            />
          </div>
        ))}

        <button
          onClick={() => setModalOpen(true)}
          className={clsx(
            'flex items-center gap-2 border px-4 py-1 rounded-full text-sm',
            Object.keys(selectedFilters).length && 'border-blue-500 text-blue-600'
          )}
        >
          <FaFilter /> Filters {Object.keys(selectedFilters).length ? `(${Object.keys(selectedFilters).length})` : ''}
        </button>
      </div>

      {/* Modal for smaller screen filters */}
      {modalOpen && (
        <FilterModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          applyFilters={applyFilters}
          updateFilters={updateFilters}
        />
      )}
    </div>
  );
}