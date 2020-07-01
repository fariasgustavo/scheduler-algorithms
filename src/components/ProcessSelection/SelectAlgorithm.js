import React from "react";
import { useDispatch } from "react-redux";
import './style.css';

const SelectAlgorithm = ({ visibility }) => {
    const dispatch = useDispatch();
    
	const handleOnChange = (e) => {
        dispatch({
            type: 'SHOW_CHART',
            payload: true
		});

		dispatch({
			type: 'ADD_ALGORITHM',
			payload: e.target.value
		});
    };

	return (
		<>
			{visibility && (
				<select onChange={handleOnChange}>
					<option value="fifo">FIFO</option>
					<option value="sjf">SJF</option>
					<option value="priorities">Prioridades</option>
				</select>
			)}
		</>
	);
};

export default SelectAlgorithm;
