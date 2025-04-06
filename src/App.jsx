import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBaseCurrency } from './redux/currency/currencySlice';
import { fetchCurrency } from './redux/currency/operations';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import { selectBaseCurrency } from './redux/currency/selectors';

const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = ({ coords }) => {
      dispatch(fetchCurrency(coords));
    };

    const error = () => {
      dispatch(setBaseCurrency('USD'));
    };

    if (baseCurrency === '') {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, [dispatch, baseCurrency]);

  return (
    <>
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};
