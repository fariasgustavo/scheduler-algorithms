import React from "react";
import './style.css';

const NumberInput = (props) => {
	const { placeholder, name, id, max, value, onInput } = props;

	return (
		<input
			type="number"
			placeholder={placeholder}
			id={id}
			name={name}
			max={max}
			value={value}
			onInput={onInput}
		/>
	);
};

export default NumberInput;
