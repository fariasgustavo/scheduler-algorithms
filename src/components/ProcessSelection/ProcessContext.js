import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NumberInput from "../NumberInput";
import Button from "../Button";

const ProcessContext = ({ visibility }) => {
	const dispatch = useDispatch();
	const processQty = useSelector((state) => state.scheduler.processQty);
	const process = useSelector((state) => state.scheduler.process);
	const [processTime, serProcessTime] = useState('');

	const handleAddProcess = async () => {
		await dispatch({
			type: "ADD_PROCESS",
			payload: {
				time: processTime,
			},
		});

		serProcessTime('');

		if (processQty === process.length)
			dispatch({
				type: "ADD_PROCESS_QTY",
				payload: null,
			});
	};

	return (
		<>
			{visibility && (
				<div className="box-process">
					<NumberInput
						placeholder="Tempo na fila de aptos"
						max={80}
						value={processTime}
						onInput={(e) => {
							serProcessTime(e.target.value);
						}}
					/>
					<Button
						label="Add"
						type="primary"
						size="md"
						onClick={async () => { await handleAddProcess() }}
					/>
				</div>
			)}
		</>
	);
};

export default ProcessContext;
