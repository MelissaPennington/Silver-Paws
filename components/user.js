/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function User() {
  const { user } = useAuth();
  const [lastSignInTime, setLastSignInTime] = useState('');

  useEffect(() => {
    if (user && user.metadata && user.metadata.lastSignInTime) {
      setLastSignInTime(user.metadata.lastSignInTime);
    }
  }, [user]);

  return (
    <div className="d-flex flex-column">
      <img className="user-image" src={user.photoURL} alt={user.displayName} />
      <h1>{user.displayName}</h1>
      <p>{user.email}</p>
      <p>Last Sign-in Time: {lastSignInTime}</p>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
    email: PropTypes.string,
    metadata: PropTypes.shape({
      lastSignInTime: PropTypes.string,
    }),
  }).isRequired,
};
