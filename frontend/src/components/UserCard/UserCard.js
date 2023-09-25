import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from "../../store/thunks/user";
import { selectUser } from "../../store/selectors";
import { TransactionsTable } from "../TransactionsTable/TransactionsTable";
import { TableControls } from "../TableControls/TableControls";
import { Filters } from "../Filters/Filters";
import styles from './UserCard.css';

const SORT_OPTIONS = [
  { label: "From", value: "sourceUserName" },
  { label: "From desc.", value: "sourceUserName:desc" },
  { label: "To", value: "targetUserName" },
  { label: "To desc.", value: "targetUserName:desc" },
  { label: "Amount", value: "amount" },
  { label: "Amount desc.", value: "amount:desc" },
];

const PAGE_SIZES = [50, 100, 200, 300, 400, 500];

export function UserCard() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [fromSearchInput, setFromSearchInput] = useState("");
  const [toSearchInput, setToSearchInput] = useState("");
  const [minAmountSearchInput, setMinAmountSearchInput] = useState("");
  const [maxAmountSearchInput, setMaxAmountSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("sourceUserName");

  const fetchUserData = () => {
    const params = {
      ...(fromSearchInput ? { from: fromSearchInput } : {}),
      ...(toSearchInput ? { to: toSearchInput } : {}),
      ...(minAmountSearchInput ? { minAmount: minAmountSearchInput } : {}),
      ...(maxAmountSearchInput ? { maxAmount: maxAmountSearchInput } : {}),
      pageSize,
      page,
      sortBy: sort.replace(":desc", ""),
      ...(sort.includes(":desc") ? { desc: true } : {})
    };
    dispatch(getUser({ userId: user.id, params }));
  }

  const handleFiltersFromChange = e => {
    setFromSearchInput(e.target.value);
  }

  const handleFiltersToChange = e => {
    setToSearchInput(e.target.value);
  }

  const handleFiltersMinAmountChange = e => {
    setMinAmountSearchInput(e.target.value);
  }

  const handleFiltersMaxAmountChange = e => {
    setMaxAmountSearchInput(e.target.value);
  }

  const handleSelectPageSizeChange = e => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  }

  const handleSelectPageChange = e => {
    setPage(parseInt(e.target.value));
  }

  const handleSortChange = e => {
    setSort(e.target.value);
  }

  const resetFilters = () => {
    setFromSearchInput("");
    setToSearchInput("");
    setMinAmountSearchInput("");
    setMaxAmountSearchInput("");
  }

  useEffect(() => {
    if (user?.id)
      fetchUserData();
  }, [pageSize, page, sort]);

  useEffect(() => {
    resetFilters();
  }, [user?.id]);

  return (
    <div className="user-card">
      <h1>{user?.name}</h1>
      <div>Account balance: {user?.balance.toFixed(2)}</div>
      <div>Transactions history:</div>
      <Filters
        from={fromSearchInput}
        to={toSearchInput}
        minAmount={minAmountSearchInput}
        maxAmount={maxAmountSearchInput}
        handleFromChange={handleFiltersFromChange}
        handleToChange={handleFiltersToChange}
        handleMinAmountChange={handleFiltersMinAmountChange}
        handleMaxAmountChange={handleFiltersMaxAmountChange}
      />
      <div className="user-card-buttons">
        <span className="user-card-buttons-clear" onClick={resetFilters}>Clear</span>
        <button className="user-card-buttons-search" onClick={fetchUserData}>Search</button>
      </div>
      <TableControls
        sortOptions={SORT_OPTIONS}
        pageSizes={PAGE_SIZES}
        pages={Array.from({ length: user?.transactions.totalPages }, (_, i) => i + 1)}
        sort={sort}
        page={page}
        pageSize={pageSize}
        handleSortChange={handleSortChange}
        handleSelectPageSizeChange={handleSelectPageSizeChange}
        handleSelectPageChange={handleSelectPageChange}
      />
      <TransactionsTable page={page} pageSize={pageSize} />
    </div>
  );
}
