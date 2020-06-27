import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProcessContext from "./ProcessContext";

const ProcessSelection = () => {
	const processQty = useSelector((state) => state.scheduler.processQty);
	
	useEffect(() => {
		console.log(processQty);
	});

	return (
		<div className="container-process">
			<ProcessContext visibility={!!processQty} />
		</div>
	);
};

export default ProcessSelection;
