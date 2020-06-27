import React from "react";

const Button = ({label, type, size, onClick}) => {
	return <button className={`button ${type} ${size}`} onClick={onClick}>{label}</button>;
};

export default Button;
