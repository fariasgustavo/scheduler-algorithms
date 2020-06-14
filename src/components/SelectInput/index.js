import React from "react";

const SelectInput = () => {
	const handleOnChange = (value) => {};

	return (
		<select onChange={handleOnChange}>
			<option value="fifo">FIFO</option>
			<option value="round-robin">Round-Robin</option>
			<option value="sjf">SJF</option>
			<option value="prioridades">Prioridades</option>
		</select>
	);
};

export default SelectInput;
