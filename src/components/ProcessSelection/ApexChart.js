import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";


class ApexChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		  series: [],
		  options: {},
		  waitTime: [],
		  queueTime: [],
		  executionTime: [],
		};
	}

	async componentDidMount() {
		await this.sjf();
		this.setChartProps();
	}

	processSortedByWaitTime = () => {
		const { process } = this.props;

		return process.sort((a, b) => {
			return a.waitTime - b.waitTime;
        });
	};

	sjf = async () => {
		const { process } = this.props;
		const sjfStructure = process.sort((a, b) => {
			const wait = a.waitTime - b.waitTime;

			if(wait !== 0) return wait;
		
			return a.time - b.time;
		});
		let queueTimeArray = [];


		sjfStructure.map((item, index) => {
			if(index === 0){
				queueTimeArray.push(0);
				return;
			}

			const timeInQueue = ((process[index - 1].waitTime + queueTimeArray[queueTimeArray.length - 1]) - item.waitTime) + process[index - 1].executionTime;
			queueTimeArray.push(timeInQueue);
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
			executionTime: executionTimeArray
		});
	}

	fifo = async () => {
		const { process } = this.props;

		let queueTimeArray = [];
        this.processSortedByWaitTime().map((item, index) => {
			if(index === 0){
				queueTimeArray.push(0);
				return;
			}

			const timeInQueue = ((process[index - 1].waitTime + queueTimeArray[queueTimeArray.length - 1]) - item.waitTime) + process[index - 1].executionTime;
			queueTimeArray.push(timeInQueue);
		});
	}
	
	setChartProps = () => {
		const { process } = this.props;
		const { waitTime, queueTime, executionTime } = this.state;

		const processNames = process.map((item, index) => {
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
		const { visibility } = this.props;
		const { options, series } = this.state;

		console.log(options);
		console.log(series);

		return(
			<>
			{visibility && (
				<div id="chart">
					<Chart options={options} series={series} type="bar" height={350} />
				</div>
			)}
		</>
		);
	}
}


const mapStateToProps = state => ({
	process: state.scheduler.process
  });

  export default connect(
	mapStateToProps,
	null
  )(ApexChart);