import { DiscoveryBridgeDefinition, BridgeData} from './types';
import { DISCOVERY_URL } from "@/data/constants"

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