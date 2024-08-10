import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const WidgetContainer = styled.div`
	margin: 20px;
	padding: 20px;
	border: 1px solid #ccc;
	width: 300px;
`;

const OrderList = styled.ul`
	list-style-type: none;
	padding: 0;
`;

const OrderItem = styled.li`
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
`;

const OrderBook = ({ selectedPair, increment }) => {
	const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

	const aggregateOrderBookData = useCallback(
		(orderBookData) => {
			return Object.values(
				orderBookData.reduce((aggregatedData, order) => {
					const aggregatedPrice =
						Math.floor(order?.[0] / increment) * increment;
					if (!aggregatedData[aggregatedPrice]) {
						aggregatedData[aggregatedPrice] = {
							price: aggregatedPrice,
							quantity: 0,
						};
					}
					aggregatedData[aggregatedPrice].quantity += order?.[2];
					return aggregatedData;
				}, {})
			);
		},
		[increment]
	);

	useEffect(() => {
		const fetchOrderBook = async () => {
			try {
				const response = await axios.get(
					`https://api.pro.coinbase.com/products/${selectedPair}/book?level=2`
				);

				// Aggregate the data based on the selected increment
				const aggregatedBids = aggregateOrderBookData(
					response.data.bids.slice(0, 10)
				);
				const aggregatedAsks = aggregateOrderBookData(
					response.data.asks.slice(0, 10)
				);

				setOrderBook({
					bids: aggregatedBids,
					asks: aggregatedAsks,
				});
			} catch (error) {
				console.error('Error fetching order book data:', error);
			}
		};

		fetchOrderBook();
		const intervalId = setInterval(fetchOrderBook, 5000);

		return () => clearInterval(intervalId);
	}, [increment, selectedPair, aggregateOrderBookData]);

	return (
		<WidgetContainer>
			<h3>Order Book</h3>
			<OrderList>
				<h4>Bids</h4>
				{orderBook?.bids?.map((data, index) => (
					<OrderItem key={index}>
						<span>Price: {data?.price?.toFixed(3)}</span>
						<span>Quantity: {data?.quantity}</span>
					</OrderItem>
				))}
			</OrderList>
			<OrderList>
				<h4>Asks</h4>
				{orderBook?.asks?.map((data, index) => (
					<OrderItem key={index}>
						<span>Price: {data?.price?.toFixed(3)}</span>
						<span>Quantity: {data?.quantity}</span>
					</OrderItem>
				))}
			</OrderList>
		</WidgetContainer>
	);
};

export default OrderBook;
