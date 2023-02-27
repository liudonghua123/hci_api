import { base_url, ticket, CSRFPreventionToken, info, requests } from './common'
import { roles_add_form, roles_delete_form, roles_update_form } from './types';

const config = { headers: { 'Cookie': `LoginAuthCookie=${ticket}`, CSRFPreventionToken } };

export async function add_roles(data: roles_add_form) {
    const url = `${base_url}/vapi/json/access/roles`;
    const res = await requests.put(url, data, config);
    info(`[add_roles] res: ${JSON.stringify(res.data)}`)
    return res.data;
}

export async function delete_roles(data: roles_delete_form) {
    const url = `${base_url}/vapi/json/access/roles/delete`;
    const res = await requests.post(url, data, config);
    info(`[delete_roles] res: ${JSON.stringify(res.data)}`)
    return res.data;
}

export async function update_roles(data: roles_update_form) {
    const url = `${base_url}/vapi/json/access/roles`;
    const res = await requests.put(url, data, config);
    info(`[update_roles] res: ${JSON.stringify(res.data)}`)
    return res.data;
}

export async function get_roles() {
    const url = `${base_url}/vapi/json/access/roles`;
    const res = await requests.get(url, config);
    info(`[get_roles] res: ${JSON.stringify(res.data)}`)
    return res.data;
}