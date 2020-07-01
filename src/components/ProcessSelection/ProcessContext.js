import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NumberInput from "../NumberInput";
import Button from "../Button";

const ProcessContext = ({ visibility }) => {
	const dispatch = useDispatch();
	const processQty = useSelector((state) => state.scheduler.processQty);
	const process = useSelector((state) => state.scheduler.process);
	const [processExecutionTime, setProcessExecutionTime] = useState("");
	const [processWaitTime, setProcessWaitTime] = useState("");
	const [processPriority, setProcessPriority] = useState("");

	let amountAccumulator = 0;

	const handleAddProcess = async () => {
		await dispatch({
			type: "ADD_PROCESS",
			payload: {
				executionTime: Number(processExecutionTime),
				waitTime: Number(processWaitTime),
				priority: Number(processPriority),
				name: `Process ${process.length + 1} \n Priority: ${processPriority}`
			},
		});

		setProcessExecutionTime("");
		setProcessWaitTime("");
		setProcessPriority("");

		if(process.length > 0){
			process.map(async (item) => {
				if(amountAccumulator === 0)
					amountAccumulator += item.executionTime + Number(processExecutionTime);
				else
					amountAccumulator = amountAccumulator + Number(processExecutionTime);
			});
	
			debugger;

			if(amountAccumulator > 80){
				alert('Limite máximo de 80 unidades de tempo para execução de todos os processos');
				amountAccumulator -= Number(processExecutionTime);
				return;
			}
		}

		if (processQty === process.length) {
			dispatch({
				type: "ADD_PROCESS_QTY",
				payload: null,
			});

			dispatch({
				type: "SHOW_SELECT_ALGORITHM",
				payload: true,
			});
		}
	};

	return (
		<>
			{visibility && (
				<>
					<div className="box-process">
						<NumberInput
							placeholder="Tempo de ingresso na fila"
							max={80}
							value={processWaitTime}
							onInput={(e) => {
								setProcessWaitTime(e.target.value);
							}}
						/>
						<NumberInput
							placeholder="Tempo de execução"
							max={80}
							value={processExecutionTime}
							onInput={(e) => {
								setProcessExecutionTime(e.target.value);
							}}
						/>
						<NumberInput
							placeholder="Prioridade de execução"
							value={processPriority}
							onInput={(e) => {
								setProcessPriority(e.target.value);
							}}
						/>
						<Button
							label="Add"
							type="primary"
							size="md"
							onClick={async () => {
								await handleAddProcess();
							}}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default ProcessContext;
