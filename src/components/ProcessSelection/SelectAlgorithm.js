import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectAlgorithm = ({ visibility }) => {
    const dispatch = useDispatch();
    
	const handleOnChange = (value) => {
        dispatch({
            type: 'SHOW_CHART',
            payload: true
        })
    };

	return (
		<>
			{visibility && (
				<select onChange={handleOnChange}>
					<option value="fifo">FIFO</option>
					<option value="sjf">SJF</option>
					<option value="prioridades">Prioridades</option>
				</select>
			)}
		</>
	);
};

export default SelectAlgorithm;
