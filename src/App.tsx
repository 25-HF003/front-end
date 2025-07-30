import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import { Provider, useDispatch } from 'react-redux';
import { store } from './app/store';
import { useEffect } from 'react';
import { setAccessToken } from './features/auth/authSlice';
import { scheduleAutoLogout } from './utils/jwt';

//새로고침 시 토큰 복구 및 자동 로그아웃 재예약
function TokenInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      dispatch(setAccessToken(token));
      scheduleAutoLogout(token, dispatch);
    }
  }, [dispatch]);

  return null;
}


function App() {
  return (
    <Provider store={store}>
      <TokenInitializer />
      <RouterProvider router={Router} />
    </Provider>
    
  );
}

export default App
