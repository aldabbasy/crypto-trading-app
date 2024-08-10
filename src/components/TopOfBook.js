import React, { useMemo } from 'react';
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
	const bestBid = useMemo(() => {
		const sortedBids = data.bids
			.map((bid) => parseFloat(bid))
			.sort((a, b) => b - a);
		return sortedBids?.[0];
	}, [data.bids]);
	const bestAsk = useMemo(() => {
		const sortedAsks = data.asks
			.map((ask) => parseFloat(ask))
			.sort((a, b) => b - a);
		return sortedAsks?.[0];
	}, [data.asks]);
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
