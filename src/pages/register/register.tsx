import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUserThunk,
  registerErrorSelector,
  authenticatedSelector,
  registerDataSelector
} from '@slices';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const { error, data } = useSelector((state) => ({
    error: registerErrorSelector({ register: state.register }),
    data: registerDataSelector({ register: state.register })
  }));

  useEffect(() => {
    setIsRegistered(!!data);
  }, [data]);

  if (isRegistered) {
    return <Navigate to={'/list'} />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    dispatch(registerUserThunk({ email, password, name }));
  };

  return (
    <RegisterUI
      errorText={error?.message ?? ''}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
    />
  );
};
