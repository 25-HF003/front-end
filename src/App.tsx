import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import { useEffect } from 'react';
import { setAccessToken, setUser } from './features/auth/authSlice';
import { scheduleAutoLogout } from './utils/jwt';

//새로고침 시 로그인 토큰 복구 및 자동 로그아웃 재예약
function TokenInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const user = sessionStorage.getItem('user');

    if (token) {
      dispatch(setAccessToken(token));
      scheduleAutoLogout(token, dispatch);
    }
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return null;
}


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TokenInitializer />
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  );
}

export default App
