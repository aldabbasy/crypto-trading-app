import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import 'chart.js/auto';

const WidgetContainer = styled.div`
	margin: 20px;
	padding: 20px;
	border: 1px solid #ccc;
	width: 600px;
`;

const RealTimePriceChart = ({ selectedPair, data }) => {
	const chartData = {
		labels: data.map((data) => data.time),
		datasets: [
			{
				label: `${selectedPair} Price`,
				data: data.map((data) => data.price),
				fill: false,
				backgroundColor: 'rgba(75,192,192,1)',
				borderColor: 'rgba(75,192,192,1)',
			},
		],
	};

	return (
		<WidgetContainer>
			<h3>Real-Time Price Chart</h3>
			<Line data={chartData} />
		</WidgetContainer>
	);
};

export default RealTimePriceChart;
