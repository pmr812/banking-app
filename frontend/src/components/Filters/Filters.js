import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.css';

export function Filters({
  from,
  to,
  minAmount,
  maxAmount,
  handleFromChange,
  handleToChange,
  handleMinAmountChange,
  handleMaxAmountChange
}) {
  return (
      <div className="filters">
        <div className="filters-item">
          From user: <input type='text' value={from} onChange={handleFromChange} />
        </div>
        <div className="filters-item">
          To user: <input type='text' value={to} onChange={handleToChange} />
        </div>
        <div className="filters-item">
          Min amount: <input type='number' value={minAmount} onChange={handleMinAmountChange} />
        </div>
        <div className="filters-item">
          Max amount: <input type='number' value={maxAmount} onChange={handleMaxAmountChange} />
        </div>
      </div>
  );
};

Filters.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  minAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  maxAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleFromChange: PropTypes.func.isRequired,
  handleToChange: PropTypes.func.isRequired,
  handleMinAmountChange: PropTypes.func.isRequired,
  handleMaxAmountChange: PropTypes.func.isRequired,
};
