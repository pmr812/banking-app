import React from 'react';
import PropTypes from 'prop-types';
import styles from './TableControls.css';

export function TableControls({
  sortOptions,
  pageSizes,
  pages,
  sort,
  pageSize,
  page,
  handleSortChange,
  handleSelectPageSizeChange,
  handleSelectPageChange
}) {
  return (
      <div className="table-controls">
        <div className="table-controls-item">
          Sort by:
          <select value={sort} onChange={handleSortChange}>
            {sortOptions.map(({ label, value }) => <option value={value} key={value}>{label}</option>)}
          </select>
        </div>
        <div className="table-controls-pagination">
          <div className="table-controls-item">
            Page size:
            <select value={pageSize} onChange={handleSelectPageSizeChange}>
              {pageSizes.map(item => <option value={item} key={item}>{item}</option>)}
            </select>
          </div>
          <div className="table-controls-item">
            Select page:
            <select value={page} onChange={handleSelectPageChange}>
              {pages.map(item => <option value={item} key={item}>{item}</option>)}
            </select>
          </div>
          <div className="table-controls-item">
            Total pages: {pages.length}
          </div>
        </div>
      </div>
  );
};

TableControls.propTypes = {
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  sort: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  handleSelectPageSizeChange: PropTypes.func.isRequired,
  handleSelectPageChange: PropTypes.func.isRequired
};
