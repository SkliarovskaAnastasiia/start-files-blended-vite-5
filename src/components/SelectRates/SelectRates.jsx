import Select from 'react-select';

import symbols from './symbols.json';

import styles from './SelectRates.module.css';

import './ReactSelect.css';
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from '../../redux/currency/currencySlice';

const SelectRates = ({ baseCurrency }) => {
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setBaseCurrency(e.value));
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        options={symbols}
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        onChange={handleChange}
        className={styles.select}
        classNamePrefix="react-select"
        isSearchable
      />
    </div>
  );
};

export default SelectRates;
