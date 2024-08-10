import React, { useState } from 'react';
import styled from 'styled-components';
import OrderBook from './components/OrderBook';
import CurrencySelector from './components/CurrencySelector';
import SettingsModal from './components/SettingsModal';
import TikcerWidgets from './components/TikcerWidgets';
import PriceIncrementSelector from './components/PriceIncrementSelector';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`;
const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 75%;
	padding: 20px;
`;

function App() {
	const [selectedPair, setSelectedPair] = useState('BTC-USD');
	const [increment, setIncrement] = useState(0.01);

	const [settings, setSettings] = useState({
		updateInterval: 5000,
		dataPoints: 20,
		showTopOfBook: true,
		showChart: true,
		showOrderBook: true,
	});

	const handleSaveSettings = (newSettings) => {
		setSettings(newSettings);
	};

	return (
		<AppContainer>
			<HeaderContainer>
				<CurrencySelector
					selectedPair={selectedPair}
					setSelectedPair={setSelectedPair}
				/>
				<SettingsModal settings={settings} onSave={handleSaveSettings} />
			</HeaderContainer>

			<TikcerWidgets
				showTopOfBook={settings.showTopOfBook}
				showChart={settings.showChart}
				dataPoints={settings.dataPoints}
				updateInterval={settings.updateInterval}
				selectedPair={selectedPair}
			/>
			{settings.showOrderBook && (
				<>
					<PriceIncrementSelector
						increment={increment}
						setIncrement={setIncrement}
					/>
					<OrderBook
						selectedPair={selectedPair}
						updateInterval={settings.updateInterval}
						increment={increment}
					/>
				</>
			)}
		</AppContainer>
	);
}

export default App;
