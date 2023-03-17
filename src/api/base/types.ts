export type LightState = {
    on: boolean
    bri: number
    hue: number
    sat: number
    xy: [number, number]
    ct: number
    alert: string
    effect: string
}

export interface LightData {
    id: number;
    state: LightState;
}

export type DiscoveryBridgeDefinition = {
    internalipaddress: string,
    id?: string
}

export interface BridgeData {
    id: string;
    internalipaddress: string,
    port: number;
    username: string;
}

export type RGB = {
    r: number,
    g: number,
    b: number
}
