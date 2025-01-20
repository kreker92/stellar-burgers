import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  isForAuthenticated?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  isForAuthenticated = true,
  children
}: ProtectedRouteProps) => {
  const { isAuthenticated, isInit, isAuthChecked } = useSelector(
    (store) => store.user
  );
  const location = useLocation();

  if (!isInit || !isAuthChecked) {
    return <Preloader />;
  }

  if (isForAuthenticated && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  } else if (!isForAuthenticated && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  return children;
};
