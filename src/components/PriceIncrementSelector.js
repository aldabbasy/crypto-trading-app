import React from 'react';

const PriceIncrementSelector = ({ increment, setIncrement }) => {
	return (
		<div>
			<label htmlFor='increment'>Price Increment: </label>
			<select
				id='increment'
				value={increment}
				onChange={(e) => setIncrement(Number(e.target.value))}
			>
				<option value={0.01}>$0.01</option>
				<option value={0.05}>$0.05</option>
				<option value={0.1}>$0.10</option>
				<option value={0.5}>$0.50</option>
				<option value={1.0}>$1.00</option>
			</select>
		</div>
	);
};

export default PriceIncrementSelector;
