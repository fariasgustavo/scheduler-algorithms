import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Chart = ({ visibility }) => {
    const [ chartItems, setChartItems ] = useState([]);
	const process = useSelector((state) => state.scheduler.process);

    useEffect(() => {
        let accumulatedTime = 0;
        const fifoStructure = process.map((item, index) => {
            if(index > 0)
                accumulatedTime += process[index - 1].time;

            return { time: item.time, accumulatedTime };
        })

        setChartItems(fifoStructure);
    }, [process, visibility]);

	const fifo = () => {
        return (
			<>
				{chartItems.map((item, index) => (
					<div
                        className="chart-item"
                        key={index}
					>
                        {item.accumulatedTime > 0 && (
                            <span className="chart-item-accumulated-time" style={{width: `${item.accumulatedTime}px`}}></span>
                        )}   
                        <span className="chart-item-process-time" style={{width: `${item.time}px`}}></span>
                    </div>
				))}
			</>
		);
	};

	return <>{visibility && <div className="container-chart">{fifo()}</div>}</>;
};

export default Chart;
