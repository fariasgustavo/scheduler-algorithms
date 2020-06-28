import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProcessContext from "./ProcessContext";
import SelectAlgotithm from "./SelectAlgorithm";
import Chart from "./Chart";

const ProcessSelection = () => {
	const processQty = useSelector((state) => state.scheduler.processQty);
	const showSelectAlgorithm = useSelector(state => state.chart.showSelectAlgorithm);
	const showChart = useSelector(state => state.chart.showChart);

	return (
		<div className="container-process">
			<ProcessContext visibility={!!processQty} />
			<SelectAlgotithm visibility={showSelectAlgorithm}/>
			<Chart visibility={showChart}/>
		</div>
	);
};

export default ProcessSelection;
