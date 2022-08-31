import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelected, getTodosRequest } from '../redux/action-creators/todoActions';
import Box from '@mui/material/Box';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const Filtering: FC = () => {
	const dispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState('All');

	const setFilter = useCallback(
		(e: SelectChangeEvent<any>) => {
			let newSelectedOption = e.target.value;
			setSelectedOption(newSelectedOption);
			dispatch(setSelected(newSelectedOption));
			dispatch(getTodosRequest());
		},
		[dispatch]
	);
	return (
		<Box className='filter-area'>
			<Select value={selectedOption} onChange={setFilter}>
				<MenuItem value={'All'}>All</MenuItem>
				<MenuItem value={'Active'}>Active</MenuItem>
				<MenuItem value={'Completed'}>Completed</MenuItem>
			</Select>
		</Box>
	);
};

export default Filtering;
