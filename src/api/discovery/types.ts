export type DiscoveryBridgeDefinition = {
    internalipaddress: string,
    id?: string
}

export interface BridgeData {
    id: string;
    internalipaddress: string,
    port: number;
}