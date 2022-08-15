import { ChangeEvent, FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelected, getTodosRequest } from '../redux/action-creators';

const Filtering: FC = () => {
	const dispatch = useDispatch();

	const setFilter = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			dispatch(setSelected(e.target.value));
			dispatch(getTodosRequest());
		},
		[dispatch]
	);
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
