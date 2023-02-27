import * as dotenv from 'dotenv';
import debug from 'debug';

import https from 'https';
import axios from 'axios';
import { encrypt, generate_public_key } from './utlities';
import { ticket_response } from './types';

dotenv.config();

const { BASE_URL, USERNAME, PASSWORD } = process.env;
if (!BASE_URL || !USERNAME || !PASSWORD) throw new Error('Missing BASE_URL, USERNAME or PASSWORD in envs');

export const info = debug('app:info');
export const error = debug('app:error');

export const base_url = BASE_URL as string;
export const username = USERNAME as string;
export const password = PASSWORD as string;

info(`[app] base_url: ${base_url}, username: ${username}, password: ${password}`);

// ignore ssl of self-signed certificate in axios
// see https://github.com/axios/axios/issues/535
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
export const requests = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

export let ticket = '';
export let CSRFPreventionToken = '';
// update tickets immediately when import this module.
update_tickets();

/**
 * get public key n from server
 * @returns the public key n in hex format
 */
async function get_public() {
    const url = `${base_url}/vapi/json/public_key`;
    const res = await axios.get(url);
    info(`[get_public] res: ${JSON.stringify(res.data)}`)
    const public_key_n = res.data.data;
    return generate_public_key(public_key_n);
}

/**
 * update tickets (ticket and CSRFPreventionToken) from server, auto renew the tickets
 * @returns the ticket
 */
export async function update_tickets() {
    const public_key = await get_public();
    const encryptedPassword = encrypt(password, public_key);
    // const encryptedPassword = '366a3054362fd3a7d592f41395da272ddda697630d9be851f506fce4c8f22f2e30878dbb06ef6b52aa642ec20cc92ce6f40d6419dc6d5c3071d4e49f5a380f29c7d4582f063559900079976f3132181644b837e9102b0051204614541a6c209f363951bf230c50d4b3635d6c79bd7278249cab3ef95ad29e28283f6f9dcea770aef7bb420a0add4ebb8583242efece170ddf0ec95f603852a992662d9d5351f9a4d059796d6c30579825a1d940f6a68a7ff261306bd0854fd0c560a7fb412f7654e886e8168bf01b0e168536e8c8f6444ae03eee78f872c05904386acf88a4efd36b62db841f6be327d07da770a0f6660929deb1d152bb78c89d7abfef34e167'
    const url = `${base_url}/vapi/json/access/ticket`;
    const res = await axios.post(url, { username, password: encryptedPassword }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    info(`[update_tickets] res: ${JSON.stringify(res.data)}`)
    const { data } = res.data as ticket_response | ticket_response;
    if (!data || !data.ticket) throw new Error('Failed to get ticket');
    ticket = data.ticket;
    CSRFPreventionToken = data.CSRFPreventionToken;
    info(`[update_tickets] ticket: ${ticket}, CSRFPreventionToken: ${CSRFPreventionToken}`)
    // auto renew the tickets in 1 minute
    setTimeout(update_tickets, 60 * 1000);
    return { ticket, CSRFPreventionToken }
}

