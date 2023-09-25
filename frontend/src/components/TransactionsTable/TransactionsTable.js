import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUser } from "../../store/selectors";
import styles from './TransactionsTable.css';

export function TransactionsTable({ page, pageSize }) {
  const user = useSelector(selectUser);

  return (
      <div className="transactions-table">
        <div className="transactions-table-header">
          <div>
            No.
          </div>
          <div>
            From:
          </div>
          <div>
            To:
          </div>
          <div>
            Amount:
          </div>
        </div>
        <div className="transactions-table-body-container">
          <div className="transactions-table-body">
            {user?.transactions.items.length ?
              user?.transactions.items.map(({ sourceId, sourceUserName, targetId, targetUserName, amount }, idx) =>
                <div className="transactions-table-row" key={`${sourceId}${targetId}${amount}`}>
                  <div>
                    {(page - 1) * pageSize + idx + 1}.
                  </div>
                  <div>
                    {sourceUserName}
                  </div>
                  <div>
                    {targetUserName}
                  </div>
                  <div>
                    {amount}
                  </div>
                </div>
              ) :
              <div className="transactions-table-no-data">
                No data found
              </div>
            }
          </div>
        </div>
      </div>
  );
};

TransactionsTable.propTypes = {
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired
};