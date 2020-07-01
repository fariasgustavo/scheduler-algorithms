import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import './style.css';

class ApexChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		  series: [],
		  options: {},
		  waitTime: [],
		  queueTime: [],
		  executionTime: [],
		  processArray: [],
		};
	}

	async componentDidMount() {
		const { algorithm } = this.props;

		const execAlgorithm = {
			'sjf': this.sjf,
			'fifo': this.fifo,
			'priorities': this.priorities 
		}

		await execAlgorithm[algorithm]();
		this.setChartProps();
	}

	async componentDidUpdate(prevProps) {
		const { algorithm } = this.props;
		if(prevProps.algorithm !== algorithm){
			const execAlgorithm = {
				'sjf': this.sjf,
				'fifo': this.fifo,
				'priorities': this.priorities 
			}
	
			await execAlgorithm[algorithm]();
			this.setChartProps();
		}	

	}


	processSortedByWaitTime = processArray => {
		return processArray.sort((a, b) => {
			return a.waitTime - b.waitTime;
        });
	};

	sjf = async () => {
		const { process } = this.props;
		const sjfStructure = process.sort((a, b) => {
			const wait = a.waitTime - b.waitTime;

			if(wait !== 0) return wait;
		
			return a.executiontime - b.executionTime;
		});
		let queueTimeArray = [];

		const orderByExecutionTime = sjfStructure.sort((a, b) => {
			const executionTimeLessThanWaitTime = a.executionTime - b.waitTime;

			if(executionTimeLessThanWaitTime !== 0) return executionTimeLessThanWaitTime;

			return a.executionTime - b.executionTime;
		});

		queueTimeArray = [];

		const sjfTimeInQueueNew = orderByExecutionTime.map((item, index) => {
			if(index === 0){
				queueTimeArray.push(0);
				return { ...item, timeInQueue: 0 };
			}

			let timeInQueue = 0;

			if((index - 1) === 0){
				timeInQueue = item.waitTime + orderByExecutionTime[index - 1].executionTime;
			}else{
				timeInQueue = ((orderByExecutionTime[index - 1].waitTime + queueTimeArray[queueTimeArray.length - 1]) - item.waitTime) + orderByExecutionTime[index - 1].executionTime;
			}
			
			queueTimeArray.push(timeInQueue);

			return { ...item, timeInQueue };
		});

		const orderByQueueTime = sjfTimeInQueueNew.sort((a,b) => {
			if(sjfTimeInQueueNew[0] === a || sjfTimeInQueueNew[0] === b) return 0;
			return a.executionTime - b.executionTime;
		})

		queueTimeArray = []

		const sjfTimeLast = orderByQueueTime.map((item, index) => {
			if(index === 0){
				queueTimeArray.push(0);
				return { ...item, timeInQueue: 0 };
			}

			let timeInQueue = 0;

			if((index - 1) === 0){
				if(item.waitTime === orderByExecutionTime[index - 1].executionTime)
					timeInQueue = 0;
				else
					timeInQueue = item.waitTime + orderByExecutionTime[index - 1].executionTime;

			}else{
				timeInQueue = ((orderByExecutionTime[index - 1].waitTime + queueTimeArray[queueTimeArray.length - 1]) - item.waitTime) + orderByExecutionTime[index - 1].executionTime;
			}
			
			queueTimeArray.push(timeInQueue);

			return { ...item, timeInQueue };
		});

		const executionTimeArray = sjfTimeLast.map(item => {
			return item.executionTime;
		});

		const waitTimeArray = sjfTimeLast.map(item => {
			return item.waitTime;
		});

		await this.setState({
			waitTime: waitTimeArray,
			queueTime: queueTimeArray,
			executionTime: executionTimeArray,
			processArray: sjfTimeLast
		});
	}

	fifo = async () => {
		const { process } = this.props;

		let queueTimeArray = [];
        this.processSortedByWaitTime(process).map((item, index) => {
			if(index === 0){
				queueTimeArray.push(0);
				return false;
			}

			const timeInQueue = ((process[index - 1].waitTime + queueTimeArray[queueTimeArray.length - 1]) - item.waitTime) + process[index - 1].executionTime;
			queueTimeArray.push(timeInQueue);

			return true;
		});

		const executionTimeArray = process.map(item => {
			return item.executionTime;
		});

		const waitTimeArray = process.map(item => {
			return item.waitTime;
		});

		await this.setState({
			waitTime: waitTimeArray,
			queueTime: queueTimeArray,
			executionTime: executionTimeArray,
			processArray: process
		});
	}

	priorities = async () => {
		const { process } = this.props;
		let queueTimeArray = [];
		const prioritiesStructure = process.sort((a, b) => {
			const wait = a.waitTime - b.waitTime;

			if(wait !== 0) return wait;
		
			return b.priority - a.priority;
		});

		const orderByPriority = prioritiesStructure.sort((a, b) => {
			return b.priority - a.priority;
		});

		queueTimeArray = [];

		const prioritiesTimeInQueue = orderByPriority.map((item, index) => {
			if(index === 0){
				queueTimeArray.push(0);
				return { ...item, timeInQueue: 0 };
			}

			const timeInQueue = ((orderByPriority[index - 1].waitTime + queueTimeArray[queueTimeArray.length - 1]) - item.waitTime) + orderByPriority[index - 1].executionTime;
			queueTimeArray.push(timeInQueue);
			return { ...item, timeInQueue };
		});

		const executionTimeArray = prioritiesTimeInQueue.map(item => {
			return item.executionTime;
		});

		const waitTimeArray = prioritiesTimeInQueue.map(item => {
			return item.waitTime;
		});

		await this.setState({
			waitTime: waitTimeArray,
			queueTime: queueTimeArray,
			executionTime: executionTimeArray,
			processArray: prioritiesTimeInQueue
		});
	}
	
	setChartProps = () => {
		const { waitTime, queueTime, executionTime, processArray } = this.state;

		const processNames = processArray.map((item, index) => {
			return item.name;
		});

		this.setState({
			series: [
				{
					name: "Wait Time",
					data: waitTime,
				},
				{
					name: "Queue Time",
					data: queueTime,
				},
				{
					name: "Execution Time",
					data: executionTime,
				},
			],
			options: {
				chart: {
					type: "bar",
					height: 350,
					stacked: true,
				},
				plotOptions: {
					bar: {
						horizontal: true,
					},
				},
				stroke: {
					width: 1,
					colors: ["#fff"],
				},
				title: {
					text: "Process Scheduling",
				},
				xaxis: {
					categories: processNames,
					labels: {
						formatter: function (val) {
							return val;
						},
					},
				},
				yaxis: {
					title: {
						text: undefined,
					},
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return val;
						},
					},
				},
				fill: {
					opacity: 1,
				},
				legend: {
					position: "top",
					horizontalAlign: "left",
					offsetX: 40,
				},
			} 
		});
	};

	render() {
		const { visibility, algorithm } = this.props;
		const { options, series } = this.state;

		console.log(series);

		return(
			<>
			{visibility && (
				<div id="chart">
					<h2>Algorithm: {algorithm}</h2>
					<Chart options={options} series={series} type="bar" height={350} />
				</div>
			)}
		</>
		);
	}
}


const mapStateToProps = state => ({
	process: state.scheduler.process,
	algorithm: state.scheduler.algorithm
});

  export default connect(
	mapStateToProps,
	null
  )(ApexChart);