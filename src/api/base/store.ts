import { Preferences } from '@capacitor/preferences';
import { URL_KEY } from "@/data/constants"
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


export async function setBridgeAddresses(urls: string[]) {
		try {
				if (!Array.isArray(urls)) {
						throw new Error('Expected an array of strings.');
				}
	
			// Ensure that each URL in the array is a string
				const validUrls = urls.map((url) => {
						if (typeof url !== 'string') {
								throw new Error(`Expected a string, but got ${typeof url}.`);
						}
						return url;
				});
		
				// Convert the array of URLs to a single string
				const urlsString = validUrls.join(',');

				await Preferences.set({ key: URL_KEY, value: urlsString });
		} catch (error: any) {
				console.error(`Failed to store bridge addresses: ${error.message}`);
				throw error;
		}
};

export async function getBridgeAddresses(): Promise<string[]> {
		try {
			// Retrieve the URLs from Capacitor's Preferences using the URL_KEY as the key
			const result = await Preferences.get({ key: URL_KEY });
			
			if (result.value == null) {
				throw new Error('No bridge addresses found.');
			}
	
			// Parse the URLs string into an array of strings
			const urls = result.value.split(',').map((url) => url.trim());
	
			// Ensure that each URL in the array is a string
			const validUrls = urls.map((url) => {
				if (typeof url !== 'string') {
					throw new Error(`Expected a string, but got ${typeof url}.`);
				}
				return url;
			});
	
			return validUrls;
		} catch (error: any) {
			console.error(`Failed to retrieve bridge addresses: ${error.message}`);
			throw error;
		}
	};