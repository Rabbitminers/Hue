import { DiscoveryBridgeDefinition, BridgeData} from './types';
import { DISCOVERY_URL } from "@/data/constants"
import { getBridgeAddresses } from '../base/store';

export function bridgeDiscovery(): Promise<DiscoveryBridgeDefinition[]> {
    return fetch(DISCOVERY_URL)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error("Request failed")
            }
        })
        .then((data: BridgeData[]) => {
            return data.map((item: BridgeData) => {
                const bridge: DiscoveryBridgeDefinition = {
                    internalipaddress: item.internalipaddress,
                    id: item.id
                };
                return bridge;
            })
        })
        .catch(error => {
            throw new Error(`Discovery failed: ${error.message}`);
        })
}

function getHueError(data: any): number {
    return data?.error?.type ?? -1;
}

export function createNewUser(address: string, username: string): Promise<string> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({"devicetype": `hue_app#${username}`});

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw
    };

    return fetch(`http://${address}/api`, requestOptions)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error("Request failed")
            }
        })
        .then((data: any) => {
            if (getHueError(data[0]) == 101) {
                throw new Error("Press Sync Button")
            }
            return data[0].success.username;
        })
        .catch(error => {
            throw new Error(`Discovery failed: ${error.message}`);
        })
}