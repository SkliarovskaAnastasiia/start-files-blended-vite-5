import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { selectFilter } from '../../redux/filter/selector';
import { changeFilter } from '../../redux/filter/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = e => {
    dispatch(changeFilter(e.target.value.trim()));
  };
  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={handleChange}
    />
  );
};

export default Filter;
