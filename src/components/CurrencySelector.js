import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Dropdown } from './Styles';

const currencies = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD'];

const DropdownContent = styled(DropdownMenu.Content)`
	color: white;
	border: none;
	cursor: pointer;
	border-radius: 4px;
	overflow: hidden;
	margin-top: 10px;
`;
const DropdownItem = styled(DropdownMenu.Item)`
	padding: 10px;
	background-color: #e7e7e7;
	color: black;
	border: none;
	&:hover {
		background-color: #0053b3;
		color: white;
	}
`;

const CurrencySelector = ({ selectedPair, setSelectedPair }) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Dropdown>
					{selectedPair}{' '}
					<span class='material-symbols-outlined'>arrow_drop_down</span>
				</Dropdown>
			</DropdownMenu.Trigger>
			<DropdownContent>
				{currencies.map((currency) => (
					<DropdownItem
						key={currency}
						onSelect={() => setSelectedPair(currency)}
					>
						{currency}
					</DropdownItem>
				))}
			</DropdownContent>
		</DropdownMenu.Root>
	);
};

export default CurrencySelector;
