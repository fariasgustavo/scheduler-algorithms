import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Chart = ({ visibility }) => {
	const [chartItems, setChartItems] = useState([]);
	const process = useSelector((state) => state.scheduler.process);

	const setFifoStructure = useCallback((processList) => {
		let accumulatedTime = 0;

		const fifoStructure = processList.map((item, index) => {
			if (index > 0) accumulatedTime += processList[index - 1].time;

			return {
				time: setProportionProcessTimeInChart(item.time),
				accumulatedTime: setProportionProcessTimeInChart(accumulatedTime),
			};
		});

		setChartItems(fifoStructure);
	}, []);

	const setSjfStructure = useCallback(() => {
		const sjfStructure = process.sort((a, b) => {
			return a.time - b.time;
        });
        
        setFifoStructure(sjfStructure);
    }, [process, setFifoStructure]);
    
    const setPriorityStructure = useCallback(() => {
		const priorityStructure = process.sort((a, b) => {
			return b.priority - a.priority;
        });
        
        setFifoStructure(priorityStructure);
	}, [process, setFifoStructure]);

	const setProportionProcessTimeInChart = (time) => {
		if (time === 0) return 0;

		return (time * 100) / 80;
	};

    const renderFifo = () => {
		return (
			<>
				{chartItems.map((item, index) => (
					<div className="chart-item" key={index}>
						{item.accumulatedTime > 0 && (
							<span
								className="chart-item-accumulated-time"
								style={{ width: `${item.accumulatedTime}%` }}
							></span>
						)}
						<span
							className="chart-item-process-time"
							style={{ width: `${item.time}%` }}
						></span>
					</div>
				))}
			</>
		);
	};

	useEffect(() => {
		setSjfStructure();
	}, [process, setSjfStructure, visibility]);

	return (
		<>{visibility && <div className="container-chart">{renderFifo()}</div>}</>
	);
};

export default Chart;
