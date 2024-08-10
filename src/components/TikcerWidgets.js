import React, { useState, useEffect } from 'react';
import TopOfBook from './TopOfBook';
import RealTimePriceChart from './RealTimePriceChart';
import axios from 'axios';

const TikcerWidgets = ({
	showTopOfBook,
	showChart,
	dataPoints,
	updateInterval,
	selectedPair,
}) => {
	const [data, setData] = useState({
		priceData: [],
		topOfBook: { bids: [], asks: [] },
	});

	useEffect(() => {
		setData({
			priceData: [],
			topOfBook: { bids: [], asks: [], spread: null, volume: null },
		});
	}, [selectedPair]);

	useEffect(() => {
		const fetchTopOfBook = async () => {
			try {
				const response = await axios.get(
					`https://api.pro.coinbase.com/products/${selectedPair}/ticker`
				);
				const newPrice = {
					time: new Date().toLocaleTimeString(),
					price: parseFloat(response.data.price),
				};

				const spread = response.data.ask - response.data.bid;
				const volume = response.data.volume;

				setData((prev) => ({
					priceData: [...prev.priceData.slice(-dataPoints), newPrice],
					topOfBook: {
						bids: [
							...prev.topOfBook.bids.slice(-dataPoints),
							response.data.bid,
						],
						asks: [
							...prev.topOfBook.bids.slice(-dataPoints),
							response.data.ask,
						],
						spread,
						volume,
					},
				}));
			} catch (error) {
				console.error('Error fetching ticker data:', error);
			}
		};

		fetchTopOfBook();
		const intervalId = setInterval(fetchTopOfBook, updateInterval);

		return () => clearInterval(intervalId);
	}, [selectedPair, updateInterval, dataPoints]);

	return (
		<>
			{showTopOfBook && (
				<TopOfBook data={data.topOfBook} selectedPair={selectedPair} />
			)}
			{showChart && (
				<RealTimePriceChart selectedPair={selectedPair} data={data.priceData} />
			)}
		</>
	);
};

export default TikcerWidgets;
