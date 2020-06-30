import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import "./style.css";

const options = {
	chart: {
	  id: "horizontal-bar"
	},
	xaxis: {
	  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
	}
  }

const series = [
	{
	  name: "series-1",
	  data: [30, 40, 45, 50, 49, 60, 70, 91]
	}
  ];


const GanttChart = ({ visibility }) => {
	const [chartItems, setChartItems] = useState([]);
	const process = useSelector((state) => state.scheduler.process);

	const setFifoStructure = useCallback((processList) => {
		let accumulatedTime = 0;

		const fifoStructure = processList.map((item, index) => {
			if (index > 0) accumulatedTime += processList[index - 1].time;

			return {
				time: setProportionProcessTimeInChart(item.time),
                accumulatedTime: setProportionProcessTimeInChart(accumulatedTime),
                waitTime: setProportionProcessTimeInChart()
			};
		});

		setChartItems(fifoStructure);
	}, []);

	const setSjfStructure = useCallback(() => {
		const sjfStructure = process.sort((a, b) => {
			const wait = a.waitTime - b.waitTime;

			if(wait !== 0) return wait;
		
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
	}, [process, setSjfStructure, visibility]);

	return (
		<>
			{visibility && 
			<Chart
				options={ options }
				type="stacked-bar"
				series={ series }
			/>
		}</>
	);
};

export default GanttChart;
