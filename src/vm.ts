import { base_url, ticket, CSRFPreventionToken, info, requests } from './common'
import { create_vm_cluster_form, create_vm_form, delete_vm_form, encrypt_vm_form, query_vm_details_form } from './types';
import querystring from 'querystring'
const config = { headers: { 'Cookie': `LoginAuthCookie=${ticket}`, CSRFPreventionToken } };

/**
 * 创建非集群虚拟机
 * 创建非集群虚拟机需要指定虚拟机运行主机；
 * @param node 虚拟机运行主机
 * @param data 创建的虚拟机参数
 * @returns 
 */
export async function create_vm(node: string, data: create_vm_form) {
    const url = `${base_url}/vapi/json/nodes/${node}/qemu/create`;
    const res = await requests.put(url, data, config);
    info(`[create_vm] res: ${JSON.stringify(res.data)}`)
    return res.data;
}

/**
 * 创建集群虚拟机
 * 创建集群虚拟机的存储要求是共享存储，可以指定 ha_enable 和 always_try_host 分 别表示“是否启用故障迁移”和“优先运行位置”；
 * @param data 创建的虚拟机参数
 * @returns 
 */
export async function create_vm_cluster(data: create_vm_cluster_form) {
    const url = `${base_url}/vapi/json/cluster/qemu/create`;
    const res = await requests.put(url, data, config);
    info(`[create_vm_cluster] res: ${JSON.stringify(res.data)}`)
    return res.data;
}

/**
 * 查询虚拟机详情信息
 * @param vmid 虚拟机 id 
 * @param data 查询虚拟机详情参数 
 * @returns 
 */
export async function query_vm_details(vmid: string, data: query_vm_details_form) {
    const url = `${base_url}/vapi/json/cluster/vm/${vmid}/info?${querystring.stringify(data)}`;
    const res = await requests.get(url, config);
    info(`[query_vm_details] res: ${JSON.stringify(res.data)}`)
    return res.data;

}

/**
 * 删除虚拟机
 * @param vmid 虚拟机 id 
 * @param data 删除虚拟机参数 
 * @returns 
 */
export async function delete_vm(vmid: string, data: delete_vm_form) {
    const url = `${base_url}/vapi/json/cluster/vm/${vmid}/delete`;
    const res = await requests.post(url, data, config);
    info(`[delete_vm] res: ${JSON.stringify(res.data)}`)
    return res.data;

}

/**
 * 转换为加密虚拟机
 * @param vmid 虚拟机 id 
 * @param data 转换为加密虚拟机参数 
 * @returns 
 */
export async function encrypt_vm(vmid: string, data: encrypt_vm_form) {
    const url = `${base_url}/vapi/json/cluster/vm/${vmid}/encrypt`;
    const res = await requests.post(url, data, config);
    info(`[encrypt_vm] res: ${JSON.stringify(res.data)}`)
    return res.data;

}