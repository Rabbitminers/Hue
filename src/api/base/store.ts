import { Preferences } from '@capacitor/preferences';
import { BridgeData } from './types';
import { BRIDGE_KEY } from '../../data/constants';

export async function storeBridges(bridges: BridgeData[]): Promise<void> {
	try {
		if (!bridges || !Array.isArray(bridges)) {
			throw new Error("Invalid Bridge Data");
		}
		const data = bridges.concat(await readBridges());
		await Preferences.set({
			key: BRIDGE_KEY,
			value: JSON.stringify(data)
		});
	} catch (error: any) {
		console.error(`Failed To Store Bridges: ${error.message}`);
		throw error;
	}
}

export async function storeBridge(bridge: BridgeData): Promise<void> {
	await storeBridges([bridge]);
}

export async function readBridges(): Promise<BridgeData[]> {
	try {
		const sResult = await Preferences.get({
			 key: BRIDGE_KEY 
		});
		if (sResult.value) {
			const bridges = JSON.parse(sResult.value) as BridgeData[];
			return bridges;
		}
		return [];
	} catch (error: any) {
		console.error(`Failed to retrieve bridge addresses: ${error.message}`);
		throw error;
	}
}
