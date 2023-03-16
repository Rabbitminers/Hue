import { BridgeData, LightData } from '../base/types';
import { lightStateUrl } from '../base/url_utils';

export async function setLightState(bridge: BridgeData, light: LightData): Promise<void> {
    let headers = new Headers;
    headers.append("Content-Type", "application/json");

    let raw = JSON.stringify(light.state);

    let options = {
        method: 'PUT',
        headers: headers,
        body: raw
    };

    fetch(lightStateUrl(bridge, light.id), options)
        .then(response => {
            console.log(response)
        }) 
        .catch((error: any) => {
            console.error(`Failed to update light: ${error}`);
            throw error;
        })
}

export async function toggleLight(bridge: BridgeData, light: LightData) {
    light.state.on = !light.state.on;
    setLightState(bridge, light);
}