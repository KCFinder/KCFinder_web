import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, onPageChange, maxVisiblePages = 5 }) => {
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= maxVisiblePages) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
      let end = Math.min(start + maxVisiblePages - 1, totalPages);
      
      if (end === totalPages) {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }
      
      pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        &lt;
      </button>

      {getPageNumbers().map(pageNum => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`${styles.pageButton} ${pageNum === currentPage ? styles.active : ''}`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;