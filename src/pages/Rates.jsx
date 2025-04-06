import { Wave } from 'react-animated-text';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  selectIsError,
  selectIsLoading,
  selectLatestRates,
} from '../redux/currency/selectors';
import { useEffect } from 'react';
import { getLatestRates } from '../redux/currency/operations';
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Loader from '../components/Loader/Loader';
import RatesList from '../components/RatesList/RatesList';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const baseCurrency = useSelector(selectBaseCurrency);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const filteredRates = useSelector(selectLatestRates);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestRates(baseCurrency));
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />

        {isLoading && <Loader />}

        {filteredRates.length > 0 && <Filter />}

        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
