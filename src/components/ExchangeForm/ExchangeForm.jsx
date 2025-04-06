import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { getExchangedCurrency } from '../../redux/currency/operations';

const ExchangeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputVal = form.elements.exchange.value.trim();

    if (inputVal === '') return;

    const [amount, from, , to] = inputVal.toUpperCase().split(' ');

    dispatch(getExchangedCurrency({ amount, from, to }));
    form.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        name="exchange"
        title="Request format 15 USD in UAH"
        className={styles.input}
        placeholder="15 USD in UAH"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
      />
    </form>
  );
};

export default ExchangeForm;
