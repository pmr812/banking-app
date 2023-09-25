import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from "../../store/thunks/users";
import { getUser } from "../../store/thunks/user";
import { selectUsers } from "../../store/selectors";
import styles from './UsersList.css';

export function UsersList() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [ dispatch ]);

  return (
    <div className="users-list">
      <h3>Select user to view their account:</h3>
      <ul>
        {
          users?.map(({ id, name }) =>
            <li className="users-list-item" key={id} onClick={() => dispatch(getUser({ userId: id }))}>
              {name}
            </li>
          )
        }
      </ul>
    </div>
  );
}
