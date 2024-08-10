import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import * as Dialog from '@radix-ui/react-dialog';

const ModalOverlay = styled(Dialog.Overlay)`
	background-color: rgba(0, 0, 0, 0.75);
	position: fixed;
	inset: 0;
	z-index: 1000;
`;

const ModalContent = styled(Dialog.Content)`
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	width: 400px;
	z-index: 1001;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const ModalClose = styled(Dialog.Close)`
	position: absolute;
	top: 10px;
	right: 10px;
`;

const InputGroup = styled.div`
	margin-bottom: 15px;
`;

const SettingsModal = ({ settings, onSave }) => {
	const [localSettings, setLocalSettings] = useState(settings);

	const handleSave = () => {
		onSave(localSettings);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button>Settings</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<ModalOverlay />
				<ModalContent>
					<Dialog.Title>Widget Settings</Dialog.Title>
					<Dialog.Description id='dialog-description'>
						Settings form to customize widget's behavior.
					</Dialog.Description>

					<InputGroup>
						<label>Update Interval (ms):</label>
						<input
							type={'number'}
							value={localSettings.updateInterval}
							onChange={(e) =>
								setLocalSettings({
									...localSettings,
									updateInterval: parseInt(e.target.value, 10),
								})
							}
						/>
					</InputGroup>

					<InputGroup>
						<label>Number of Data Points:</label>
						<input
							type={'number'}
							value={localSettings.dataPoints}
							onChange={(e) =>
								setLocalSettings({
									...localSettings,
									dataPoints: parseInt(e.target.value, 10),
								})
							}
						/>
					</InputGroup>

					<InputGroup>
						<label>Show Top Of Book:</label>
						<input
							type={'checkbox'}
							checked={localSettings.showTopOfBook}
							onChange={(e) =>
								setLocalSettings({
									...localSettings,
									showTopOfBook: e.target.checked,
								})
							}
						/>
					</InputGroup>

					<InputGroup>
						<label>Show Real-Time Chart:</label>
						<input
							type={'checkbox'}
							checked={localSettings.showChart}
							onChange={(e) =>
								setLocalSettings({
									...localSettings,
									showChart: e.target.checked,
								})
							}
						/>
					</InputGroup>

					<InputGroup>
						<label>Show Order Book:</label>
						<input
							type={'checkbox'}
							checked={localSettings.showOrderBook}
							onChange={(e) =>
								setLocalSettings({
									...localSettings,
									showOrderBook: e.target.checked,
								})
							}
						/>
					</InputGroup>

					<ModalClose asChild>
						<button onClick={handleSave}>Save Settings</button>
					</ModalClose>
				</ModalContent>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default SettingsModal;
