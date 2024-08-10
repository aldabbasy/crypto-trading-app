import React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
	margin: 20px;
	padding: 20px;
	border: 1px solid #ccc;
	width: 300px;
`;
const DataContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	width: 100%;
	gap: 20px;
`;

const Text = styled.p`
	padding: 20px;
	width: 100%;
`;

const TopOfBook = ({ data }) => {
	const bestBid = data.bids
		.map((bid) => parseFloat(bid))
		.sort((a, b) => b - a)?.[0];

	const bestAsk = data.asks
		.map((ask) => parseFloat(ask))
		.sort((a, b) => b - a)?.[0];
	return (
		<WidgetContainer>
			<h3>Top of Book</h3>
			<DataContainer>
				<Text>
					<b>Best Bid:</b> {bestBid}
				</Text>
				<Text>
					<b>Best Ask:</b> {bestAsk}
				</Text>
			</DataContainer>
		</WidgetContainer>
	);
};

export default TopOfBook;
