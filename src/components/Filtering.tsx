import { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import { setSelected, setTodosRequest } from '../redux/action-creators';

const Filtering: FC = () => {
	const dispatch = useDispatch();

	const setFilter = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSelected(e.target.value));
		dispatch(setTodosRequest());
	};
	return (
		<div className='filter-area'>
			<select onChange={setFilter}>
				<option>All</option>
				<option>Active</option>
				<option>Completed</option>
			</select>
		</div>
	);
};

export default Filtering;
