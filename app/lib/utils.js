import {
  Paintbrush,
  Megaphone,
  Code,
  Box,
  Headphones,
  BarChart,
  Briefcase,
  Users
} from 'lucide-react';
import pkg from 'millify';

const millify = pkg.default;

export const iconMap = {
  Paintbrush,
  Megaphone,
  Code,
  Box,
  Headphones,
  BarChart,
  Briefcase,
  Users
};

export function getCategoryIcon(iconName) {
  return iconMap[iconName] || Users;
};

export function formatSalary(salary = {}) {
  const { amount, currency = 'USD', period, type } = salary;

  if (!type) return 'N/A';

  if (type === 'negotiable') return 'Negotiable';
  if (type === 'performance-based') return 'Performance Based';

  if (typeof millify !== 'function') {
    throw new Error('Millify import failed');
  }

  if (type === 'fixed' && amount != null) {
    const formattedAmount = millify(Number(amount), { precision: 1 });
    const symbol = currency === 'USD' ? '$' : currency;
    return `${symbol} ${formattedAmount}/${period}`;
  }

  return 'N/A';
}

export function formatDate(date) {
  if (!date) return 'N/A';
  const parsed = new Date(date);
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};