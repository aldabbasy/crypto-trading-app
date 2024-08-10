import React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
	margin: 20px;
	padding: 20px;
	border: 1px solid #ccc;
	width: 300px;
`;

const TopOfBook = ({ data }) => {
	return (
		<WidgetContainer>
			<h3>Top of Book</h3>
			<p>Bid: {data.bid}</p>
			<p>Ask: {data.ask}</p>
		</WidgetContainer>
	);
};

export default TopOfBook;
