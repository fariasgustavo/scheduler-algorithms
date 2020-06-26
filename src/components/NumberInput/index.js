import React from "react";
import './style.css';

const NumberInput = (props) => {
	const { placeholder, name, id, role, max } = props;

	const handleOnChange = (value) => {};

	return (
		<input
			type="number"
			placeholder={placeholder}
			id={id}
			name={name}
			max={max}
		/>
	);
};

export default NumberInput;
