import React from "react";
import NumberInput from "../NumberInput";

const ProcessContext = ({ visibility }) => {
	return (
		<>
			{visibility && (
				<div className="box-process">
					<NumberInput placeholder="Tempo na fila de aptos" max={80} />
				</div>
			)}
		</>
	);
};

export default ProcessContext;
