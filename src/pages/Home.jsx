import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import { useSelector } from 'react-redux';
import {
  selectExchangeInfo,
  selectIsError,
  selectIsLoading,
} from '../redux/currency/selectors';
import Loader from '../components/Loader/Loader';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';

const Home = () => {
  const exchangeInfo = useSelector(selectExchangeInfo);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  return (
    <Section>
      <Container>
        <ExchangeForm />
        {isLoading && <Loader />}
        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}

        {!exchangeInfo && !isError && (
          <Heading info title="What currencies do you want to exchange?🙂" />
        )}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
