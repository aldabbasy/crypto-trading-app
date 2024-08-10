import React, { useEffect, useState } from 'react';
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

const OrderBook = ({ selectedPair }) => {
	const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

	useEffect(() => {
		const fetchOrderBook = async () => {
			try {
				const response = await axios.get(
					`https://api.pro.coinbase.com/products/${selectedPair}/book?level=2`
				);
				setOrderBook({
					bids: response.data.bids.slice(0, 10),
					asks: response.data.asks.slice(0, 10),
				});
			} catch (error) {
				console.error('Error fetching order book data:', error);
			}
		};

		fetchOrderBook();
		const intervalId = setInterval(fetchOrderBook, 5000);

		return () => clearInterval(intervalId);
	}, [selectedPair]);

	return (
		<WidgetContainer>
			<h3>Order Book</h3>
			<OrderList>
				<h4>Bids</h4>
				{orderBook.bids.map(([price, quantity], index) => (
					<OrderItem key={index}>
						<span>{price}</span>
						<span>{quantity}</span>
					</OrderItem>
				))}
			</OrderList>
			<OrderList>
				<h4>Asks</h4>
				{orderBook.asks.map(([price, quantity], index) => (
					<OrderItem key={index}>
						<span>{price}</span>
						<span>{quantity}</span>
					</OrderItem>
				))}
			</OrderList>
		</WidgetContainer>
	);
};

export default OrderBook;
