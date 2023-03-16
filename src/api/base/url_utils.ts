import { BridgeData } from './types';
const BASE_URL = 'http://'

export function lightStateUrl(bridge: BridgeData, id: number): string {
    return `${lightUrl(bridge, id)}/state`
}

export function lightUrl(bridge: BridgeData, id: number): string {
    return `${BASE_URL}${bridge.internalipaddress}/lights/${id}`
}