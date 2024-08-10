import React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
	margin: 20px;
	padding: 20px;
	border: 1px solid #ccc;
	width: 300px;
`;

const Price = styled.div`
	font-size: 24px;
	font-weight: bold;
	margin: 10px 0;
`;

const Volume = styled.div`
	font-size: 18px;
	color: #666;
	margin: 5px 0;
`;

const Spread = styled.div`
	font-size: 18px;
	color: #666;
	margin: 5px 0;
`;

const TopOfBook = ({ selectedPair, data }) => {
	const bestBid = data.bids
		.map((bid) => parseFloat(bid))
		.sort((a, b) => b - a)?.[0];

	const bestAsk = data.asks
		.map((ask) => parseFloat(ask))
		.sort((a, b) => b - a)?.[0];
	return (
		<WidgetContainer>
			<h3>Top of Book | {selectedPair}</h3>
			<Price>Bid: ${bestBid}</Price>
			<Price>Ask: ${bestAsk}</Price>

			<Spread>Spread: ${data?.spread?.toFixed(2)}</Spread>
			<Volume>24h Volume: {data?.volume?.toLocaleString()}</Volume>
		</WidgetContainer>
	);
};

export default TopOfBook;
