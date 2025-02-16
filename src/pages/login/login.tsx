import { TLoginData } from '@api';
import { LoginUI } from '@ui-pages';
import { ChangeEvent, FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  authenticatedSelector,
  loginErrorSelector,
  loginUserThunk
} from '@slices';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuthenticated = useSelector((state) =>
    authenticatedSelector({ user: state.user })
  );

  const error = useSelector((state) =>
    loginErrorSelector({ user: state.user })
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginUserThunk({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to={'/list'} />;
  }

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      errorText={error?.message ?? ''}
      handleSubmit={handleSubmit}
      password={password}
      setPassword={setPassword}
    />
  );
};
