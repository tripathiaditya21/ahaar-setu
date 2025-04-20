/**
 * Utility functions for consistent date formatting across the application
 */

/**
 * Format a date string or Date object to DD/MM/YYYY format
 */
export const formatDate = (date: string | Date | number): string => {
  if (!date) return 'Not available';
  
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date)
    : date;

  if (isNaN(dateObj.getTime())) return 'Invalid date';

  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Format a date to YYYY-MM-DD format for input[type="date"] fields
 */
export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};